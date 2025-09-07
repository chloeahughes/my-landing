// app/api/email/connect/google/route.ts
import { NextResponse } from 'next/server';
import { authUrl } from '@/lib/gmail';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('u'); // e.g. /api/email/connect/google?u=USER_ID
  if (!userId) {
    return new NextResponse('Missing user id (?u=USER_ID)', { status: 400 });
  }
  const state = new URLSearchParams({ u: userId }).toString();
  return NextResponse.redirect(authUrl(state));
}
