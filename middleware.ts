import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
  });
  
const isProtectedRoute = createCustomRouteMatcher([
    '/dashboard(.*)', 
    "/",
    ])

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

function createCustomRouteMatcher(patterns: string[]): (req: Request) => boolean {
    return (req: Request) => {
        const pathname = new URL(req.url).pathname;
        return patterns.some(pattern => 
            new RegExp(`^${pattern}$`).test(pathname)
        );
    };
}
