🧠 LLM-Based Video to Blog Generator

An LLM-powered web application that converts YouTube videos into structured, SEO-friendly blog posts using Large Language Models (LLMs).
The system extracts video transcripts and leverages Google Gemini (LLM) to generate high-quality, human-readable blog content automatically.

📌 Project Overview

Content creators often struggle to repurpose video content into written formats. This project addresses that problem by combining:

Transcript extraction

Prompt engineering

LLM-based text generation

The result is a fully automated blog generation pipeline driven by modern AI models.

🚀 Key Features

🎥 Accepts YouTube video URLs

🧾 Automatically extracts video transcripts

🧠 Uses LLM (Gemini Pro) for blog generation

📝 Produces structured blogs with:

Title

Headings

Short paragraphs

Conclusion

🌐 REST API–based backend

🎨 Clean, responsive frontend UI

🛠️ Technology Stack
Frontend

HTML5

CSS3

JavaScript

Backend

Node.js

Express.js

Axios

AI / LLM

Google Gemini Pro (LLM)

YouTube Transcript API

🧩 System Architecture
User
 ↓
Frontend (HTML/CSS/JS)
 ↓
Express API (/process-video)
 ↓
Transcript Extraction
 ↓
Prompt Engineering
 ↓
LLM (Gemini Pro)
 ↓
Generated Blog Post

📁 Project Structure
llm-based-blog-generator/
│
├── index.html        # Frontend UI
├── cal.css           # Styling
├── cal.js            # Client-side logic
├── server.js         # Express backend
├── .env              # API keys
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/llm-based-blog-generator.git
cd llm-based-blog-generator

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file:

GEMINI_API_KEY=your_gemini_api_key

▶️ Run the Application
node server.js


Access the app at:

http://localhost:3000

🔌 API Documentation
POST /process-video

Request

{
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}


Response

{
  "blogPost": "Generated blog content"
}

🎯 Use Cases

Content repurposing for bloggers & YouTubers

SEO blog generation

Educational content summarization

AI-assisted writing tools

Research on LLM-based text generation

⚠️ Limitations

Requires videos with available transcripts

Long videos may increase latency

Currently supports YouTube only

🔮 Future Enhancements

Multi-language blog generation

Tone & style customization

Markdown / PDF export

User authentication

Fine-tuned LLM models

Direct video upload support
