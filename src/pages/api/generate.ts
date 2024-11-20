import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { productTitle, productFeatures } = req.body;

    if (!productTitle || !productFeatures) {
        return res.status(400).json({ error: "Missing required fields: productTitle or productFeatures" });
    }

    const prompt =`Write a professional and SEO-optimized product description for a product based on the following details:
    - Product Title: ${productTitle}
    - Features: ${productFeatures}
    The description should not repeat the product title explicitly. Focus on highlighting the features in a user-friendly manner.`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt },
                ],
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        console.log("OpenAI Response:", data);

        if (!data.choices || data.choices.length === 0) {
            return res.status(500).json({ error: "No choices returned from OpenAI API" });
        }

        res.status(200).json({ description: data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error generating description:", error);
        res.status(500).json({ error: "Failed to generate description" });
    }
}
