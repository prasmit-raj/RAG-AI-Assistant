# RAG AI Assistant – Phase 1

## Overview

This project is my implementation of a **Retrieval-Augmented Generation (RAG)** system built from scratch. The goal of Phase 1 is to understand the complete RAG pipeline instead of relying on high-level frameworks.

The project is being developed incrementally so that every component and design decision is easy to understand.

---

## Phase 1 Goals

* Upload a PDF
* Extract text from the PDF
* Split the text into smaller chunks
* Generate vector embeddings
* Store embeddings in FAISS
* Retrieve the most relevant chunks for a user query
* Send the retrieved context to an LLM
* Return an AI-generated answer

---

## Tech Stack

### Backend

* Python
* FastAPI
* Sentence Transformers
* FAISS

### Frontend

* React
* Vite
* TypeScript

---

## Project Status

### Completed

* Project initialization
* Backend setup
* Frontend setup

### In Progress

* FastAPI application

### Upcoming

* PDF Upload
* Text Extraction
* Text Chunking
* Embedding Generation
* FAISS Integration
* Question Answering API

---

## Learning Objectives

This phase focuses on understanding:

* FastAPI fundamentals
* REST APIs
* PDF processing
* Text chunking
* Vector embeddings
* Semantic search
* Retrieval-Augmented Generation (RAG)

---

## Project Structure

```text
rag-ai-assistant/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│
├── README.md
└── .gitignore
```

> The backend structure will grow gradually as new features are implemented. Files and folders are added only when they become necessary.

---

## Development Approach

This project is intentionally built in small steps.

Instead of creating a large architecture on day one, each feature is implemented, tested, and committed before moving to the next one. This approach keeps the project easy to understand and reflects a realistic development workflow.

---

## Roadmap

* [x] Initialize project
* [x] Set up frontend
* [x] Set up backend
* [ ] Create FastAPI application
* [ ] Upload PDF
* [ ] Extract text
* [ ] Split text into chunks
* [ ] Generate embeddings
* [ ] Store embeddings in FAISS
* [ ] Retrieve relevant chunks
* [ ] Generate answers using an LLM

---

## Purpose

The primary goal of this project is to learn how modern RAG systems work by implementing each stage of the pipeline from the ground up. It is intended as both a learning project and an interview-ready demonstration of core RAG concepts.
