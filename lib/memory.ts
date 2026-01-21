
import { use } from '@memvid/sdk';

// Singleton-ish pattern to reuse connection if possible,
// though Memvid 'use' might handle pooling.
// For now, we'll open it per request or look into SDK docs for best practice.
// Docs say: const mem = await use('basic', 'knowledge.mv2');

const MEMORY_FILE = 'knowledge.mv2';

export async function getMemory() {
  const mem = await use('basic', MEMORY_FILE, { 
    readOnly: false, // validation: user wants to upload
    createIfNotExists: true 
  });
  return mem;
}
