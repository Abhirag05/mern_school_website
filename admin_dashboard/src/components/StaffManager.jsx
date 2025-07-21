import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Card  from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal'; 

const StaffManager = ({ url, token }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // --- State for the Add Form ---
    const typeOptions = ["teaching", "non teaching"];
    const [name, setName] = useState('');
    const [type, setType] = useState(typeOptions[0]); 
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');

    // --- State for the Edit Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // --- Data Fetching ---
    const fetchStaff = async () => {
        try {
            const response = await axios.get(`${url}/api/staff/all`, { headers: { token } });
            if (response.data.success) setItems(response.data.staff);
        } catch (err) {
            console.error("Error fetching staff:", err);
            setError("Failed to fetch staff members.");
        }
    };

    useEffect(() => { fetchStaff(); }, []);

    // --- Add Staff Logic ---
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        // Updated check: image is now optional
        if (!name || !type) {
            setError("Name and designation are required.");
            return;
        }
        setLoading(true);
        setError('');

        const formData = new FormData();
        // Only append the photo if a file has been selected
        if (imageFile) {
            formData.append('photo', imageFile);
        }
        formData.append('name', name);
        formData.append('type', type);

        try {
            const response = await axios.post(`${url}/api/staff/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', token }
            });
            if (response.data.success) {
                await fetchStaff();
                setName('');
                setType(typeOptions[0]);
                setImageFile(null);
                setPreview('');
                e.target.reset();
            } else {
                setError(response.data.message || "Failed to add staff member.");
            }
        } catch (err) {
            setError("An error occurred while adding staff member.");
        } finally {
            setLoading(false);
        }
    };

    // --- Edit Staff Logic ---
    const handleEditClick = (item) => {
        setEditingItem({ _id: item._id, name: item.name, type: item.type });
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { _id, name, type } = editingItem;
            const response = await axios.put(`${url}/api/staff/edit/${_id}`, { name, type }, { headers: { token } });
            if (response.data.success) {
                setIsModalOpen(false);
                await fetchStaff();
            } else {
                alert("Update failed: " + response.data.message);
            }
        } catch (err) {
            alert("An error occurred during update.");
        } finally {
            setLoading(false);
        }
    };

    // --- Delete Staff Logic ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this staff member?")) {
            try {
                const response = await axios.delete(`${url}/api/staff/delete/${id}`, { headers: { token } });
                if (response.data.success) await fetchStaff();
                else alert("Failed to remove staff member.");
            } catch (err) {
                alert("An error occurred while removing.");
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Staff</h2>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
            
            {/* Add Staff Form */}
            <Card className="mb-8">
                <form onSubmit={handleAddSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="staffName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                           <Input id="staffName" type="text" placeholder="e.g., John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                           <label htmlFor="staffType" className="block text-sm font-medium text-gray-700 mb-1">Designation / Type</label>
                           <select id="staffType" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" required>
                                {typeOptions.map(option => (
                                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                ))}
                           </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="staffImage" className="block text-sm font-medium text-gray-700 mb-1">Staff Photo (Optional)</label>
                        <Input id="staffImage" name="photo" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    {preview && <img src={preview} alt="Preview" className="mt-2 rounded-full w-24 h-24 object-cover" />}
                    <div className="text-right">
                        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Staff"}</Button>
                    </div>
                </form>
            </Card>

            {/* Existing Staff Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {items.map(item => (
                    <Card key={item._id} className="text-center flex flex-col items-center">
                        {item.photoUrl ? (
                           <img src={item.photoUrl} alt={item.name} className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg" />
                        ) : (
                           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 shadow-lg">
                               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                           </div>
                        )}
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.type}</p>
                        <div className="flex gap-2 mt-4">
                            <Button onClick={() => handleEditClick(item)} className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1">Edit</Button>
                            <Button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1">Remove</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Edit Staff Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Staff Details">
                {editingItem && (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="editName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <Input id="editName" type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="editType" className="block text-sm font-medium text-gray-700 mb-1">Designation / Type</label>
                            <select id="editType" value={editingItem.type} onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" required>
                                {typeOptions.map(option => (
                                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="text-right pt-2">
                            <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Staff"}</Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default StaffManager;
