
import { NextResponse } from 'next/server'

// This route is no longer needed with a mock frontend, but kept to avoid broken links if any.
export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/dashboard/customer`);
}
