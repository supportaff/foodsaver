import { NextResponse } from 'next/server';
export async function POST() {
  return NextResponse.json({ message: 'Static demo - no backend' }, { status: 200 });
}
