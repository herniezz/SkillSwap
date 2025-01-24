import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/protected(.*)']); // Define your protected routes

export default clerkMiddleware(async (auth, req) => {
  // Protect routes matching the defined matcher
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip internal Next.js files, static assets, etc.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always apply middleware for API routes
    '/(api|trpc)(.*)',
  ],
};
