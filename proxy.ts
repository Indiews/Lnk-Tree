import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "your-development-secret-key-123456789";
const key = new TextEncoder().encode(secretKey);

const publicPaths = ["/login", "/invite", "/api"];

function isPublicPath(pathname: string): boolean {
    if (pathname === "/") return true;
    for (const p of publicPaths) {
        if (pathname.startsWith(p)) return true;
    }
    // Static files and Next.js internals
    if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.includes(".")) return true;
    // Dynamic slug pages (public profiles) — anything that is NOT /dashboard
    if (!pathname.startsWith("/dashboard")) return true;
    return false;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    // Protected route — verify session
    const sessionToken = request.cookies.get("session")?.value;

    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        await jwtVerify(sessionToken, key, { algorithms: ["HS256"] });
        return NextResponse.next();
    } catch {
        // Invalid or expired token
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("session");
        return response;
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
