require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const PORT = 3000;

/* ---------- Middleware ---------- */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

/* ---------- Serve Frontend ---------- */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* ---------- Extract YouTube Video ID ---------- */
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

/* ---------- Fetch Transcript ---------- */
async function fetchTranscript(videoId) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        return transcript.map(item => item.text).join(' ');
    } catch (error) {
        console.error("Transcript error:", error.message);
        return null;
    }
}

/* ---------- Create Prompt ---------- */
function createPrompt(transcript) {
    return `
Convert the following YouTube transcript into a well-structured,
SEO-friendly blog post with:
- Title
- Headings
- Short paragraphs
- Conclusion

Transcript:
${transcript}
`;
}

/* ---------- Generate Blog using Gemini ---------- */
async function generateBlogPost(prompt) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        const response = await axios.post(
            `https://generativeai.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API error:", error.response?.data || error.message);
        return null;
    }
}

/* ---------- API Route ---------- */
app.post('/process-video', async (req, res) => {
    const { videoUrl } = req.body;

    if (!videoUrl) {
        return res.status(400).json({ error: "Video URL is required" });
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const transcript = await fetchTranscript(videoId);
    if (!transcript) {
        return res.status(500).json({ error: "Transcript not available" });
    }

    const prompt = createPrompt(transcript);
    const blogPost = await generateBlogPost(prompt);

    if (!blogPost) {
        return res.status(500).json({ error: "Blog generation failed" });
    }

    res.json({ blogPost });
});

/* ---------- Start Server ---------- */
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
