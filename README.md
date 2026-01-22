# Chat-Yourself AI 🤖

A premium AI-powered chat interface with **long-term memory** capabilities. Built with Next.js 16 and Memvid, this application allows you to upload documents and have intelligent conversations based on their content.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

---

## ✨ Features

### 🧠 **Intelligent Memory System**

- **Memvid Integration**: Persistent knowledge base with semantic search
- **Vector Embeddings**: Automatic embedding generation for uploaded documents
- **RAG (Retrieval Augmented Generation)**: Answers questions based on your uploaded content

### 📄 **Document Processing**

- **PDF Support**: Upload and process PDF files with automatic text extraction
- **DOCX Support**: Extract content from Word documents
- **Auto-Indexing**: Automatic lexical and vector indexing for fast retrieval

### 💬 **Chat Interface**

- **Real-time Streaming**: Fast, responsive chat with streaming responses
- **Context-Aware**: Answers include source citations from your documents
- **User-Friendly Messages**: Helpful guidance when no information is found
- **File Upload**: Drag-and-drop or click to upload documents

### 🎨 **Modern UI/UX**

- **Dark Mode**: Beautiful dark theme optimized for readability
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Sidebar Navigation**: Easy access to chat history and new conversations
- **Premium Aesthetics**: Clean, modern interface with smooth animations

---

## 🛠️ Tech Stack

| Category                | Technology              |
| ----------------------- | ----------------------- |
| **Framework**           | Next.js 16 (App Router) |
| **Language**            | TypeScript 5.x          |
| **Styling**             | Tailwind CSS v4         |
| **Memory Engine**       | Memvid SDK v2.0.151     |
| **AI/LLM**              | Memvid Built-in LLM     |
| **Document Processing** | pdf-parse, mammoth      |
| **UI Components**       | React 19.2.3            |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **pnpm**
- **Memvid API Key** ([Get one here](https://memvid.com))
- **Gemini API Key** (Optional, for custom integrations)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/omartood/Chat-yourself.git
   cd Chat-yourself
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create `.env` file in the root directory:

   ```env
   OPENAI_API_KEY=
   MEMVID_API_KEY=your_memvid_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Initialize the memory file**:

   ```bash
   npx memvid create knowledge.mv2
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

### Uploading Documents

1. Click the **📎 attachment button** in the chat input
2. Select a PDF or DOCX file
3. Wait for the upload confirmation message
4. Start asking questions about your document!

### Asking Questions

Once you've uploaded documents, you can ask questions like:

- "What is this document about?"
- "Summarize the main points"
- "What does it say about [specific topic]?"

The AI will search your uploaded documents and provide answers with source citations.

### Managing Memory

Check memory statistics:

```bash
npx memvid stats knowledge.mv2
```

View uploaded documents:

```bash
npx memvid timeline knowledge.mv2
```

Search your memory:

```bash
npx memvid find knowledge.mv2 --query "your search term"
```

---

## 📂 Project Structure

```
Chat-yourself/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # Chat API with RAG
│   │   └── upload/
│   │       └── route.ts          # Document upload & embedding
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── components/
│   ├── ChatBox.tsx               # Message display component
│   ├── InputBar.tsx              # Chat input with file upload
│   ├── Message.tsx               # Individual message bubble
│   └── Sidebar.tsx               # Navigation sidebar
├── lib/
│   └── memory.ts                 # Memvid SDK initialization
├── public/                       # Static assets
├── .env                          # Environment variables
├── knowledge.mv2                 # Memory database file
└── package.json
```

---

## 🔧 Configuration

### Environment Variables

| Variable         | Description                          | Required |
| ---------------- | ------------------------------------ | -------- |
| `MEMVID_API_KEY` | Memvid API key for memory management | Yes      |
| `GEMINI_API_KEY` | Google Gemini API key (future use)   | Optional |
| `OPENAI_API_KEY` | OpenAI API key (legacy support)      | No       |

### Memory Configuration

The memory file (`knowledge.mv2`) stores:

- Uploaded document content
- Vector embeddings (384 dimensions)
- Lexical indexes for fast text search
- Metadata and timestamps

**Capacity**: 50 MB free tier (194 documents @ ~270KB each)

---

## 🎯 Key Features Explained

### Vector Embeddings

Documents are automatically converted to vector embeddings using the `bge-small` model (default). This enables semantic search - finding relevant information based on meaning, not just keywords.

### RAG (Retrieval Augmented Generation)

When you ask a question:

1. Your query is converted to a vector embedding
2. Similar document chunks are retrieved from memory
3. The LLM generates an answer based on the retrieved context
4. Sources are cited in the response

### Adaptive Retrieval

The system uses adaptive retrieval to automatically determine how many document chunks to use based on relevance scores, ensuring high-quality answers without unnecessary context.

---

## 🚧 Recent Updates

### Latest Changes (January 2026)

- ✅ Fixed document upload with embedding generation
- ✅ Improved "no information found" messages
- ✅ Added upload success confirmations
- ✅ Optimized chat error handling
- ✅ Enhanced user guidance and help messages

---

## 📝 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Guidelines**:

- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Omar Jibril Abdulkhadir (Omar Tood)**

- Portfolio: [omartood.com](https://omartood.com)
- GitHub: [@omartood](https://github.com/omartood)

---

## 🙏 Acknowledgments

- [Memvid](https://memvid.com) - For the amazing memory engine
- [Next.js](https://nextjs.org) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com) - For beautiful styling
- [Vercel](https://vercel.com) - For hosting and deployment

---

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check the [Memvid documentation](https://docs.memvid.com)
- Review the troubleshooting section below

### Troubleshooting

**Issue**: "Chat request failed"

- **Solution**: Check that your Memvid API key is correctly set in `.env`

**Issue**: "No relevant information found"

- **Solution**: Upload documents first using the 📎 button

**Issue**: Upload fails

- **Solution**: Ensure the file is a valid PDF or DOCX file

---

**Built with ❤️ by Omar Tood**
