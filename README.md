# ENGG-101-Engineering-Study-Workspace
An AI-powered engineering study workspace designed to help students learn

## Overview

ENGG-101 is a full-stack AI application built to provide engineering students with a personalized study environment. Unlike general-purpose AI assistants, ENGG-101 focuses on helping users understand engineering concepts through guided explanations, document-based learning, and intelligent study tools.

The goal is to create an AI tutor that prioritizes learning over simply generating answers.

## Vision

The assistant should:

* Explain concepts in a clear and structured way.
* Ask for clarification instead of making assumptions.
* Adapt explanations to the user's level of understanding.
* Encourage active learning rather than memorization.

## Planned Features

### Core Features

* Engineering-focused AI chat
* PDF and lecture slide uploads
* Document summarization
* AI-generated quizzes
* Persistent chat history
* Automatic organization of study topics

### Future Ideas

* Flashcard generation
* Formula extraction
* Interactive problem solving
* Progress tracking
* Multi-model support

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS

### Backend

* Python
* FastAPI

### AI

* Ollama (local language models)

### Database

* SQLite (planned)

### DevOps

* Docker (planned)


## Project Goals

This project is being developed as a software engineering portfolio project with the goal of learning:

* Full-stack web development
* AI integration
* Backend API development
* Modern frontend development
* Docker and containerization
* Software architecture and system design


## Project Status

**Frontend UI is substantially built. Backend chat integration is functional.**

The AI Chat tool is now connected to a local FastAPI backend, which forwards messages to a locally-running Ollama model and returns real responses. Documents, quizzes, and notes tools are currently UI-complete but still running on placeholder data, pending backend integration.

Development is documented from initial design through to a complete working application (see `DEVLOG.md`).

## Running Locally

This project isn't deployed publicly since the AI chat depends on a local Ollama model rather than a hosted API.

### Backend setup

```bash
uvicorn main:app --reload --port 8000
```

### Frontend setup

```bash
npm run dev
```

Open the app in your browser, select **AI Chat** from the sidebar, and send a message — it will be forwarded to your locally-running model and the response will appear in the chat.
