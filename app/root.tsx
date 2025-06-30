import { Outlet, Scripts } from "react-router";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import type { Route } from "./+types/root";
import "./app.css";

// Get Clerk publishable key from environment variable
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Development fallback - remove this in production
const isDevelopment = import.meta.env.DEV;

// Check if the Clerk key is valid (not a placeholder)
const isValidClerkKey = CLERK_PUBLISHABLE_KEY && 
  CLERK_PUBLISHABLE_KEY !== 'pk_test_YOUR_PUBLISHABLE_KEY' &&
  CLERK_PUBLISHABLE_KEY !== 'pk_test_Y291cmFnZW91cy1jb3lvdGUtODQuY2xlcmsuYWNjb3VudHMuZGV2JA' &&
  CLERK_PUBLISHABLE_KEY !== 'pk_test_ZXhhbXBsZS5jbGVyay5hY2NvdW50cy5kZXYk';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  console.log("App component rendering, isDevelopment:", isDevelopment, "isValidClerkKey:", isValidClerkKey);
  
  // If no valid Clerk key is provided, render without authentication (demo mode)
  if (!isValidClerkKey) {
    console.log("Rendering demo mode without authentication");
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-blue-800 font-medium">Demo Mode</h3>
            <p className="text-blue-700 text-sm">
              Running in demo mode without authentication. Set a valid VITE_CLERK_PUBLISHABLE_KEY in your environment variables to enable full authentication.
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }

  // Production with valid Clerk key
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
