"use client";

import { useState } from "react";

export default function Home() {
    const [productTitle, setProductTitle] = useState("");
    const [productFeatures, setProductFeatures] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productTitle, productFeatures }),
            });
            const data = await res.json();
            if (data.error) {
                setDescription(data.error);
            } else {
                setDescription(data.description);
            }
        } catch (error) {
            console.error("Error generating description:", error);
            setDescription("An error occurred. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center">
                Generate Stunning Product Descriptions
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mt-4 text-center max-w-2xl">
                Create compelling, SEO-optimized descriptions in seconds. Transform features into powerful sales copy effortlessly.
            </p>

            {/* Form */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg mt-8">
                <input
                    type="text"
                    placeholder="Product Title"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full p-4 bg-gray-900 border-none rounded text-white mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                    placeholder="Product Features"
                    value={productFeatures}
                    onChange={(e) => setProductFeatures(e.target.value)}
                    className="w-full p-4 bg-gray-900 border-none rounded text-white mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={handleGenerate}
                    className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 py-2 rounded-xl hover:opacity-90 transition ${
                        loading && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Description"}
                </button>
            </div>

            {/* Output */}
            {description && (
                <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
                    <h2 className="text-lg font-bold text-purple-400">
                        Your Generated Description:
                    </h2>
                    <p className="text-gray-300 mt-2">{description}</p>
                </div>
            )}
        </div>
    );
}
