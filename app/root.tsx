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
        <style dangerouslySetInnerHTML={{
          __html: `
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
            
            :root {
              --background: 0 0% 100%;
              --foreground: 222.2 84% 4.9%;
              --card: 0 0% 100%;
              --card-foreground: 222.2 84% 4.9%;
              --popover: 0 0% 100%;
              --popover-foreground: 222.2 84% 4.9%;
              --primary: 222.2 47.4% 11.2%;
              --primary-foreground: 210 40% 98%;
              --secondary: 210 40% 96%;
              --secondary-foreground: 222.2 84% 4.9%;
              --muted: 210 40% 96%;
              --muted-foreground: 215.4 16.3% 46.9%;
              --accent: 210 40% 96%;
              --accent-foreground: 222.2 84% 4.9%;
              --destructive: 0 84.2% 60.2%;
              --destructive-foreground: 210 40% 98%;
              --border: 214.3 31.8% 91.4%;
              --input: 214.3 31.8% 91.4%;
              --ring: 222.2 84% 4.9%;
              --radius: 0.5rem;
              --blueinc: 59 130 246;
              --blueinc-dark: 30 41 59;
              --magenta: 147 51 234;
            }

            .dark {
              --background: 222.2 84% 4.9%;
              --foreground: 210 40% 98%;
              --card: 222.2 84% 4.9%;
              --card-foreground: 210 40% 98%;
              --popover: 222.2 84% 4.9%;
              --popover-foreground: 210 40% 98%;
              --primary: 210 40% 98%;
              --primary-foreground: 222.2 47.4% 11.2%;
              --secondary: 217.2 32.6% 17.5%;
              --secondary-foreground: 210 40% 98%;
              --muted: 217.2 32.6% 17.5%;
              --muted-foreground: 215 20.2% 65.1%;
              --accent: 217.2 32.6% 17.5%;
              --accent-foreground: 210 40% 98%;
              --destructive: 0 62.8% 30.6%;
              --destructive-foreground: 210 40% 98%;
              --border: 217.2 32.6% 17.5%;
              --input: 217.2 32.6% 17.5%;
              --ring: 212.7 26.8% 83.9%;
              --blueinc: 59 130 246;
              --blueinc-dark: 15 23 42;
              --magenta: 147 51 234;
            }

            html, body {
              background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
              font-family: "Plus Jakarta Sans", sans-serif;
            }

            .dark html, .dark body {
              background: linear-gradient(to bottom right, #111827, #1f2937);
            }
          `
        }} />
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
