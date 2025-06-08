import React, { use } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthContext';
import { format } from 'date-fns';
import Alert from './../../components/Alert/Alert';

const AddArticle = () => {
    const { user } = use(AuthContext);

    const handleAddArticle = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
        data.tags = tags;

        const now = new Date();
        const postDate = format(now, "PPP p"); 
        data.postDate = postDate;

        data.author = {
            email: user?.email,
            username: user?.displayName,
        };

        axios.post('http://localhost:3000/addarticles', data)
            .then(res => {
                if (res.data.insertedId) {
                    Alert('success', 'Article added successfully!');
                    form.reset();
                }
            })
            .catch(err => {
                Alert('error', err.message || 'Failed to add article');
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-2 lg:px-6 py-10">
            <h2 className="text-xl  lg:text-3xl font-bold text-center text-gray-800 mb-8">📝 Create a New Article</h2>

            <form onSubmit={handleAddArticle} className=" shadow-xl rounded-2xl p-3 lg:p-8 space-y-8 border border-gray-100">
                
                <fieldset className="space-y-6">
                    <legend className="text-xl font-semibold text-gray-700 mb-4">📰 Article Details</legend>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter article title" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                        <textarea 
                            name="content" 
                            rows="6" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Write your article here..." 
                            required 
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                        <select 
                            name="category" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            defaultValue="" 
                            required
                        >
                            <option value="" disabled>Select category</option>
                            <option>Technology</option>
                            <option>Education</option>
                            <option>Health</option>
                            <option>Lifestyle</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Tags (comma-separated)</label>
                        <input 
                            type="text" 
                            name="tags" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="e.g. JavaScript, WebDev" 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Thumbnail Image URL</label>
                        <input 
                            type="text" 
                            name="thumbnail" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Paste image URL" 
                        />
                    </div>
                </fieldset>

                <fieldset className=" border border-dashed border-gray-300 p-4 rounded-xl">
                    <legend className="text-lg font-semibold  mb-2">👤 Author Info</legend>
                    <div className="text-sm  space-y-1">
                        <p><strong>Username:</strong> {user?.displayName || 'N/A'}</p>
                        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                    </div>
                </fieldset>

                <button 
                    type="submit" 
                    className="w-full bg-slate-700 text-white font-semibold py-3 rounded-xl hover:bg-slate-900 transition duration-200"
                >
                    🚀 Submit Article
                </button>
            </form>
        </div>
    );
};

export default AddArticle;
