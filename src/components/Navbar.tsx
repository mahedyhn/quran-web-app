import { Settings as SettingsIcon, Search, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
              <Book className="w-8 h-8" />
              <span className="hidden sm:inline text-gray-900">The Noble Quran</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/search" 
              className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
              title="Search"
            >
              <Search className="w-6 h-6" />
            </Link>
            <button
              onClick={onOpenSettings}
              className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
              title="Settings"
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
