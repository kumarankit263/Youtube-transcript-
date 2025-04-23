# 📺 YouTube Chat RAG Bot (Gemini + Qdrant)

This project allows you to upload a YouTube video URL, extract its transcript, embed it using Google Gemini embeddings, store it in Qdrant (vector database), and then chat with the video content using an intelligent RAG (Retrieval-Augmented Generation) system.

---

## 🚀 Features

- 🎥 Extracts transcript from YouTube videos
- 🤖 Embeds transcript using Gemini's `text-embedding-004` model
- 🧠 Stores embeddings in Qdrant vector database
- 💬 Chats over the transcript using Gemini 2.0 flash model
- 🌐 Simple frontend to interact (input video URL + chat)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **AI Models**: Google Gemini API
- **Vector DB**: Qdrant
- **Transcript**: `youtube-transcript` npm package

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/youtube-chat-rag.git

