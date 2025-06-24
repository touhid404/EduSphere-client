import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import ArticleCard from './ArticleCard';

const AllArticles = () => {
    const allArticlesData = useLoaderData();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => {
        const allCategories = allArticlesData.map(article => article.category);
        return ['All', ...Array.from(new Set(allCategories))];
    }, [allArticlesData]);

    const filteredArticles = selectedCategory === 'All'
        ? allArticlesData
        : allArticlesData.filter(article => article.category === selectedCategory);

    return (
        <div className="flex max-w-5xl flex-col md:flex-row lg:flex-row mx-auto px-4 gap-6 mt-5">
            <aside className="w-60 p-4 ">
                 <title>All Articles | Edu Sphere</title>
                <h2 className="font-semibold text-xl mb-4">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition duration-200
                                ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                                        : 'bg-gray-100 hover:bg-pink-100 text-gray-800'
                                }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1">
                <h1 className="text-xl font-bold mb-6 text-center">All Articles</h1>
                {filteredArticles.length > 0 ? (
                    <div className="grid gap-4">
                        {filteredArticles.map(article => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No articles available in this category</p>
                )}
            </main>
        </div>
    );
};

export default AllArticles;
