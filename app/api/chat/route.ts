
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
    const answer = result.answer;

    // Simulate streaming for the frontend
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const words = answer.split(' ');
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
