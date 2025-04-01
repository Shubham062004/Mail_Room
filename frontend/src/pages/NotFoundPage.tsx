
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-indigo-700 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md text-center mb-8">
        Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
      </p>
      <Button asChild className="bg-indigo-700 hover:bg-indigo-800">
        <Link to="/" className="flex items-center gap-2">
          <Home size={16} /> Return to Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
