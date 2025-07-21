import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Card  from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal'; // <-- Import the new Modal component

const NewsManager = ({ url, token }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // State for the "Add News" form
    const [newTitle, setNewTitle] = useState('');
    const [newExpiryDate, setNewExpiryDate] = useState('');

    // State for the Edit Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // --- Data Fetching ---
    const fetchNews = async () => {
        try {
            const response = await axios.get(`${url}/api/news/all`, { headers: { token } });
            if (response.data.success) setItems(response.data.news);
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Failed to fetch news.");
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // --- Add News Logic ---
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${url}/api/news/add`, { title: newTitle, expiryDate: newExpiryDate }, { headers: { token } });
            if (response.data.success) {
                await fetchNews();
                setNewTitle('');
                setNewExpiryDate('');
            } else {
                setError(response.data.message || "Failed to add news.");
            }
        } catch (err) {
            setError("An error occurred while adding news.");
        } finally {
            setLoading(false);
        }
    };

    // --- Edit News Logic ---
    const handleEditClick = (item) => {
        // Set the item to be edited and open the modal
        setEditingItem({
            _id: item._id,
            title: item.title,
            expiryDate: new Date(item.expiryDate).toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { _id, title, expiryDate } = editingItem;
            const response = await axios.put(`${url}/api/news/edit/${_id}`, { title, expiryDate }, { headers: { token } });
            if (response.data.success) {
                setIsModalOpen(false); // Close modal on success
                await fetchNews();    // Refresh the list
            } else {
                alert("Update failed: " + response.data.message);
            }
        } catch (err) {
            alert("An error occurred during update.");
        } finally {
            setLoading(false);
        }
    };
    
    // --- Delete News Logic ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news item?")) {
            try {
                const response = await axios.delete(`${url}/api/news/delete/${id}`, { headers: { token } });
                if (response.data.success) await fetchNews();
                else alert("Failed to delete news item.");
            } catch (err) {
                alert("An error occurred while deleting.");
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage News & Announcements</h2>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
            
            {/* Add News Form */}
            <Card className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New News</h3>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="newsTitle" className="block text-sm font-medium text-gray-700 mb-1">News Title</label>
                        <Input id="newsTitle" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <Input id="expiryDate" type="date" value={newExpiryDate} onChange={(e) => setNewExpiryDate(e.target.value)} required />
                    </div>
                    <div className="text-right">
                        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add News"}</Button>
                    </div>
                </form>
            </Card>

            {/* Existing News List */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing News</h3>
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-bold text-gray-900">{item.title}</p>
                                <p className="text-xs text-gray-500 mt-2">Expires on: {new Date(item.expiryDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <Button onClick={() => handleEditClick(item)} className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1">Edit</Button>
                                <Button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1 ml-2">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Edit News Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit News">
                {editingItem && (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700 mb-1">News Title</label>
                            <Input id="editTitle" type="text" value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} required />
                        </div>
                        <div>
                            <label htmlFor="editExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <Input id="editExpiryDate" type="date" value={editingItem.expiryDate} onChange={(e) => setEditingItem({...editingItem, expiryDate: e.target.value})} required />
                        </div>
                        <div className="text-right pt-2">
                            <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update News"}</Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default NewsManager;