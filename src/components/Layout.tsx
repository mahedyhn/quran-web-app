import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Settings as SettingsIcon, BookOpen } from 'lucide-react';
import SettingsSidebar from './SettingsSidebar';
import { useSettings } from '../hooks/useSettings';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { settings, updateSetting } = useSettings();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline-block">The Noble Quran</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              to="/"
              className={`p-2 rounded-full hover:bg-gray-100 ${
                location.pathname === '/' ? 'text-emerald-600' : 'text-gray-500'
              }`}
              title="Home"
            >
              <Home size={22} />
            </Link>
            <Link
              to="/search"
              className={`p-2 rounded-full hover:bg-gray-100 ${
                location.pathname === '/search' ? 'text-emerald-600' : 'text-gray-500'
              }`}
              title="Search"
            >
              <Search size={22} />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              title="Settings"
            >
              <SettingsIcon size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} The Noble Quran Web Application. Built with React and Tailwind CSS.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Data provided by Al-Quran Cloud API. English translation by Muhammad Asad.
          </p>
        </div>
      </footer>

      {/* Settings Sidebar */}
      <SettingsSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        settings={settings}
        updateSetting={updateSetting}
      />
    </div>
  );
};

export default Layout;
