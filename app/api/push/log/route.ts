import { NextResponse } from 'next/server';
import { serverDb } from '@/lib/firebase-server';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const snap = await getDocs(collection(serverDb, 'push_subscribers'));
    const items: any[] = [];
    snap.forEach((d) => {
      items.push({ id: d.id, ...d.data() });
    });
    return NextResponse.json({ count: items.length, subscribers: items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('📱 MOBILE PUSH DEBUG LOG:', JSON.stringify(data, null, 2));
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
