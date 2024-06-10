import { NextResponse } from 'next/server';
export async function POST(request) {
  const { username } = await request.json();
  console.log(username)
  const userID = Math.random().toString(16).slice(2);

  const response = NextResponse.json({ success: true });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.cookies.set('signedIn', 'true', { path: '/' });
  response.cookies.set('username', username, { path: '/' });
  response.cookies.set('id', userID, { path: '/' });

  return response;
}
export async function OPTIONS(request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });
  
  return response;
}
