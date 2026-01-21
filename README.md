# Clone-Yourself AI

A premium, interface built with **Next.js 16** and **Memvid**. Designed to provide a polished, "ChatGPT-like" experience with powerful long-term memory capabilities.

## ✨ Features

- **🧠 Memvid Memory**: Integrated with `@memvid/sdk` for long-term knowledge retention and retrieval.
- **📄 Document Ingestion**: Upload **PDF** and **DOCX** files directly via the chat interface to build your personal knowledge base.
- **💬 Streaming Chat**: Fast, responsive chat interface with real-time streaming responses.
- **🌙 Dark Mode**: Beautiful, fully supported dark mode with smooth theme transitions.
- **🎨 Premium UI**: Pixel-perfect design featuring a pill-shaped input bar, subtle shadows, and responsive layout.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Memory Engine**: [Memvid](https://memvid.com/) (`@memvid/sdk`)
- **AI Model**: OpenAI GPT-4o

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- OpenAI API Key
- Memvid API Key

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/omartood/Clone-yourself.git
   cd Clone-yourself
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MEMVID_API_KEY=your_memvid_api_key_here (if required)
   ```

4. **Initialize Memory Store** (Optional):
   The app will automatically create a local `knowledge.mv2` file upon first usage/upload.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

```text
├── app/
│   ├── api/             # Next.js Route Handlers
│   │   ├── chat/        # Streaming chat with memory injection
│   │   └── upload/      # File ingestion via Memvid CLI
│   ├── globals.css      # Tailwind & Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main chat interface logic
├── components/
│   ├── ChatBox.tsx      # Message list with auto-scroll
│   ├── InputBar.tsx     # Chat input with file upload
│   └── Message.tsx      # Individual message bubble component
├── lib/
│   └── memory.ts        # Memvid SDK initialization
├── public/              # Static assets
└── rules.md             # Project coding & design guidelines
```

## 🤝 Contributing

Contributions are welcome! Please stick to the "Frontend-First" philosophy and ensure any backend changes align with the Memvid architecture.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
