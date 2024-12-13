import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/index'; // Make sure Prisma client is set up properly

// POST handler to store messages
export async function POST(req: NextRequest) {
  try {
    // Extract messages and channel from the request body
    const { channel, messages, senderId } = await req.json();

    if (!channel || !messages || !senderId) {
      return NextResponse.json({ msg: 'Missing required fields' }, { status: 400 });
    }

    // Iterate over messages and store them in the database
    const messagePromises = messages.map(async (message : any \) => {
      return await prisma..create({
        data: {
          channel,
          content: message.trim(),
          senderId: senderId, // Assuming senderId is passed from the client
        },
      });
    });

    // Wait for all message insertions to complete
    await Promise.all(messagePromises);

    return NextResponse.json({ msg: 'Messages stored successfully' }, { status: 201 });
  } catch (e) {
    console.error('Error occurred:', e);
    return NextResponse.json({ msg: 'An error occurred while saving messages' }, { status: 500 });
  }
}

// GET handler to retrieve messages based on channel
export async function GET(req: NextRequest) {
  try {
    // Extract channel from query parameters
    const { channel } = req.nextUrl.searchParams;

    if (!channel) {
      return NextResponse.json({ msg: 'Channel name is required' }, { status: 400 });
    }

    // Retrieve messages for the given channel
    const messages = await prisma.message.findMany({
      where: { channel },
      orderBy: { timestamp: 'asc' }, // Sort messages by timestamp
    });

    // If no messages found, return a message
    if (messages.length === 0) {
      return NextResponse.json({ msg: `No messages found for channel: ${channel}` }, { status: 404 });
    }

    return NextResponse.json(messages, { status: 200 });
  } catch (e) {
    console.error('Error occurred:', e);
    return NextResponse.json({ msg: 'An error occurred while fetching messages' }, { status: 500 });
  }
}
