import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname;

    const isPublicPath = path === '/auth/login' || path === '/auth/register' || path==='/auth/verify';

    if (isPublicPath && token) {
        // Construct absolute URL for redirection
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    }

    if (!isPublicPath && !token) {
        // Construct absolute URL for redirection
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }
}

export const config = {
    matcher: [
        '/dashboard',  // Specify routes to match middleware
    ], 
};
