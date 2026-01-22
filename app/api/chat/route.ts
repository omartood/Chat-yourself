
import { NextRequest, NextResponse } from 'next/server';
import { getMemory } from '@/lib/memory';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;

    const mem = await getMemory();
    
    // Perform RAG/Answer via Memvid
    // This handles context retrieval + LLM synthesis
    const result = await mem.ask(query);
    let answer = result.answer || "";
    
    // Improve the "no relevant information" message
    if (answer.toLowerCase().includes("no relevant information found")) {
      answer = "I couldn't find information about that in your uploaded documents. 📄\n\n" +
               "Here's what you can do:\n" +
               "• Upload documents using the 📎 attachment button below\n" +
               "• Ask questions related to the documents you've already uploaded\n" +
               "• Try rephrasing your question with different keywords\n\n" +
               "Tip: I can answer questions about content from PDFs, documents, and files you share with me!";
    }

    // Remove source citations like [Source #1], [Source #1, #2], etc.
    answer = answer.replace(/\[Source\s*#?\d+(?:,\s*#?\d+)*\]/g, '').trim();

    // Simulate streaming for the frontend
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const words = (answer || "").split(' ');
        for (const word of words) {
           controller.enqueue(encoder.encode(word + ' '));
           await new Promise(r => setTimeout(r, 20)); // tiny delay for visual effect
        }
        controller.close();
      }
    });

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
