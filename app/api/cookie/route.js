import { NextResponse } from 'next/server';
export async function POST(request) {
  const { username } = await request.json();
  console.log(username)
  const userID = Math.random().toString(16).slice(2);

  const response = NextResponse.json({ success: true });
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.cookies.set('signedIn', 'true', { path: '/' });
  response.cookies.set('username', username, { path: '/' });
  response.cookies.set('id', userID, { path: '/' });

  return response;
}
