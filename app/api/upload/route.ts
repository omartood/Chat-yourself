
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create temp file path
    // Using a sanitized name
    const tempPath = join('/tmp', `memvid-upload-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`);
    
    // Write buffer to temp file
    await writeFile(tempPath, buffer);

    try {
      // Ingest via Memvid CLI
      // Assumes we are in project root
      // Ignoring vector-compression flag for speed/simplicity unless required
      console.log(`Ingesting ${tempPath} into knowledge.mv2...`);
      const { stdout, stderr } = await execAsync(`npx memvid put knowledge.mv2 --input "${tempPath}"`);
      console.log('Memvid output:', stdout);
      if (stderr) console.error('Memvid stderr:', stderr);

    } catch (cliError: any) {
      console.error('Memvid CLI Error:', cliError);
       // Check if it's just a warning or fatal
       // Often stderr has progress info
       // throw cliError; // Optionally throw
    } finally {
      // Cleanup
      await unlink(tempPath).catch(() => {});
    }

    return NextResponse.json({ 
      success: true, 
      message: 'File ingested into Memvid',
    });

  } catch (error: any) {
    console.error('Upload processing error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
