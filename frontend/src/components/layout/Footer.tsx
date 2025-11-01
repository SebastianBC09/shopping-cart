import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t-2 border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            © 2025 Shopping Cart. Built with
            <Heart className="h-4 w-4 text-error-500 fill-error-500" strokeWidth={2} />
            using Next.js & NestJS
          </p>
        </div>
      </div>
    </footer>
  );
}
