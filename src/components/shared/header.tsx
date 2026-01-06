import { Heart } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-purple-900">MindBloom</h1>
          </div>
          <p className="text-sm text-purple-700 hidden md:block">
            Your gentle companion for wellness
          </p>
        </div>
      </div>
    </header>
  );
}
