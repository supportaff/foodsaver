import { NextResponse } from 'next/server';
import { DONATIONS } from '@/lib/dummyData';
export async function GET() {
  return NextResponse.json(DONATIONS);
}
