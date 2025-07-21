import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card  from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal'; 

const GalleryManager = ({ url, token }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // --- State for the Add Form ---
    const tagOptions = ["school", "events", "facilities"];
    const [tag, setTag] = useState(tagOptions[0]);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');

    // --- State for the Edit Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // --- Data Fetching ---
    const fetchGallery = async () => {
        try {
            const response = await axios.get(`${url}/api/gallery/all`, { headers: { token } });
            if (response.data.success) setItems(response.data.gallery);
        } catch (err) {
            console.error("Error fetching gallery:", err);
            setError("Failed to fetch gallery items.");
        }
    };

    useEffect(() => { fetchGallery(); }, []);

    // --- Add Image Logic ---
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!tag || !imageFile) {
            setError("Image and tag are required.");
            return;
        }
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('tag', tag);

        try {
            const response = await axios.post(`${url}/api/gallery/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', token }
            });
            if (response.data.success) {
                await fetchGallery();
                setTag(tagOptions[0]);
                setImageFile(null);
                setPreview('');
                e.target.reset();
            } else {
                setError(response.data.message || "Failed to add image.");
            }
        } catch (err) {
            setError("An error occurred while adding the image.");
        } finally {
            setLoading(false);
        }
    };

    // --- Edit Image Logic ---
    const handleEditClick = (item) => {
        setEditingItem({ _id: item._id, tag: item.tag });
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { _id, tag } = editingItem;
            const response = await axios.put(`${url}/api/gallery/edit/${_id}`, { tag }, { headers: { token } });
            if (response.data.success) {
                setIsModalOpen(false);
                await fetchGallery();
            } else {
                alert("Update failed: " + response.data.message);
            }
        } catch (err) {
            alert("An error occurred during update.");
        } finally {
            setLoading(false);
        }
    };

    // --- Delete Image Logic ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                const response = await axios.delete(`${url}/api/gallery/delete/${id}`, { headers: { token } });
                if (response.data.success) await fetchGallery();
                else alert("Failed to delete image.");
            } catch (err) {
                alert("An error occurred while deleting.");
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Gallery</h2>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
            
            {/* Add Image Form */}
            <Card className="mb-8">
                <form onSubmit={handleAddSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <Input id="imageFile" name="image" type="file" accept="image/*" onChange={handleFileChange} required />
                    </div>
                    {preview && <img src={preview} alt="Preview" className="mt-2 rounded-lg w-32 h-32 object-cover" />}
                    <div>
                        <label htmlFor="imageTag" className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                        <select id="imageTag" value={tag} onChange={(e) => setTag(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" required>
                            {tagOptions.map((option) => (
                                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="text-right">
                        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Image"}</Button>
                    </div>
                </form>
            </Card>

            {/* Existing Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(item => (
                    <Card key={item._id} className="relative group p-0 overflow-hidden">
                        <img src={item.imageUrl} alt={item.tag} className="w-full h-48 object-cover" />
                        {/* --- HOVER EFFECT UPDATED HERE --- */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button onClick={() => handleEditClick(item)} className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1">Edit</Button>
                            <Button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1">Delete</Button>
                        </div>
                        <div className="absolute bottom-0 left-0 bg-gray-800 text-white px-2 py-1 text-xs rounded-tr-lg">{item.tag}</div>
                    </Card>
                ))}
            </div>

            {/* Edit Tag Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Image Tag">
                {editingItem && (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="editTag" className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                            <select id="editTag" value={editingItem.tag} onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" required>
                                {tagOptions.map((option) => (
                                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="text-right pt-2">
                            <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Tag"}</Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default GalleryManager;
