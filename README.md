# RAG AI Assistant

An AI-powered **Retrieval-Augmented Generation (RAG) application** that allows users to upload and interact with documents through natural-language questions. The system retrieves relevant information from processed documents and uses that context to generate more accurate, context-grounded answers.

Live Demo: https://rag-ai-assistant-ten.vercel.app

## 🚀 Features

* 📄 Document processing and ingestion
* 🧠 Text chunking and embedding generation
* 🔍 Semantic search for relevant document context
* 🤖 Context-grounded AI question answering
* ⚡ FastAPI backend
* ⚛️ React + TypeScript + Vite frontend
* 🗂️ FAISS vector database for efficient similarity search
* 🔤 Sentence Transformers for generating embeddings

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* Sentence Transformers
* FAISS

### Frontend

* React
* TypeScript
* Vite

## 🏗️ How It Works

```text
Document
   ↓
Text Processing & Chunking
   ↓
Generate Embeddings
   ↓
Store Embeddings in FAISS
   ↓
User Asks a Question
   ↓
Semantic Retrieval
   ↓
Relevant Context Retrieved
   ↓
AI Generates Context-Grounded Answer
```

## 📂 Project Structure

```text
RAG-AI/
├── backend/
│   ├── main.py
│   ├── services/
│   ├── routes/
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

**Windows**

```bash
venv\Scripts\activate
```

**macOS/Linux**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn main:app --reload
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

## 💡 Usage

1. Start the backend server.
2. Start the React frontend.
3. Upload or provide a document to the application.
4. The document is processed and converted into embeddings.
5. Embeddings are stored for semantic retrieval using FAISS.
6. Ask a question related to the uploaded document.
7. The system retrieves the most relevant context.
8. The AI generates an answer based on the retrieved information.

## 🧠 RAG Pipeline

The application follows a Retrieval-Augmented Generation workflow:

1. **Document Processing** — Extract and prepare text from documents.
2. **Chunking** — Split documents into smaller, meaningful sections.
3. **Embedding Generation** — Convert text chunks into vector representations using Sentence Transformers.
4. **Vector Storage** — Store embeddings in FAISS for efficient similarity search.
5. **Retrieval** — Find the document chunks most relevant to the user's question.
6. **Generation** — Use the retrieved context to produce a relevant, grounded response.

## 🔮 Future Improvements

* Support for multiple document formats
* Multiple document collections
* Chat history and conversation memory
* Streaming AI responses
* Source citations for generated answers
* User authentication
* Persistent vector storage
* Docker containerization
* Cloud deployment
* Improved document management

## 👨‍💻 Author

**Prasmit Raj**

Built as an AI project focused on exploring **Retrieval-Augmented Generation, semantic search, vector databases, and full-stack AI application development**.

---

⭐ If you found this project useful, consider giving the repository a star!

