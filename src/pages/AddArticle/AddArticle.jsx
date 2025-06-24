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

        data.authorEmail = user?.email || 'Anonymous';
        data.authorName = user?.displayName || 'Anonymous';
        data.authorProfile = user?.photoURL || 'https://via.placeholder.com/150';

        data.likeCount = 0;
        data.commentCount = 0;

        axios.post('https://edusphere-server.vercel.app/addarticles', data)
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
            <h2 className="text-xl lg:text-3xl font-bold text-center mb-8">📝 Create a New Article</h2>
                  <title>Post Articles | Edu Sphere</title>
            <form onSubmit={handleAddArticle} className="shadow-xl rounded-2xl p-3 lg:p-8 space-y-8 border border-gray-100">

                <fieldset className="space-y-6">
                    <legend className="text-xl font-semibold  mb-4">📰 Article Details</legend>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
                            placeholder="Enter article title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                        <textarea
                            name="content"
                            rows="6"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
                            placeholder="Write your article here..."
                            required
                        ></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
                            placeholder="Enter article Category"
                            required
                        />
                    </div>

                  

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
                            placeholder="e.g. JavaScript, WebDev"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Thumbnail Image URL</label>
                        <input
                            type="text"
                            name="thumbnail"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
                            placeholder="Paste image URL"
                        />
                    </div>
                </fieldset>

                <fieldset className="border border-dashed border-gray-300 p-4 rounded-xl">
                    <legend className="text-lg font-semibold mb-2">👤 Author Info</legend>
                    <div className="text-sm space-y-1">
                        <p><strong>Username:</strong> {user?.displayName || 'N/A'}</p>
                        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 rounded-xl hover:from-pink-600 hover:to-red-600 transition duration-300"
                >
                    🚀 Submit Article
                </button>
            </form>
        </div>
    );
};

export default AddArticle;
