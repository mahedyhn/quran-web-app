import React from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { ArabicFont, Settings } from '../hooks/useSettings';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsSidebar: React.FC<Props> = ({ isOpen, onClose, settings, updateSetting }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <SettingsIcon size={24} /> Settings
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-8">
          {/* Arabic Font Selection */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-3">Arabic Font</label>
            <select
              value={settings.arabicFont}
              onChange={(e) => updateSetting('arabicFont', e.target.value as ArabicFont)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Amiri">Amiri</option>
              <option value="Scheherazade New">Scheherazade New</option>
              <option value="Lateef">Lateef</option>
            </select>
          </section>

          {/* Arabic Font Size */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">Arabic Font Size</label>
              <span className="text-sm font-bold text-emerald-600">{settings.arabicFontSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="64"
              value={settings.arabicFontSize}
              onChange={(e) => updateSetting('arabicFontSize', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </section>

          {/* Translation Font Size */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">Translation Font Size</label>
              <span className="text-sm font-bold text-emerald-600">{settings.translationFontSize}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="32"
              value={settings.translationFontSize}
              onChange={(e) => updateSetting('translationFontSize', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </section>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">Settings are saved automatically to your device.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;
