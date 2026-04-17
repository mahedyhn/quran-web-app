import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSurahs, Surah } from '../services/quranApi';
import { Search, Loader2 } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

const SurahList: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { settings } = useSettings();

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery) ||
      surah.name.includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-600">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-gray-500 font-medium italic">Loading Surahs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">The Noble Quran</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read, explore, and study the message of the Holy Quran. Choose a Surah to begin your journey.
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search Surah by name or number..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <Link
            key={surah.number}
            to={`/surah/${surah.number}`}
            className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-emerald-700 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                {surah.number}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {surah.englishName}
                </h3>
                <p className="text-sm text-gray-500 italic">{surah.englishNameTranslation}</p>
              </div>
            </div>
            <div className="text-right">
              <p 
                className="text-xl font-bold text-gray-800" 
                dir="rtl"
                style={{ fontFamily: settings.arabicFont }}
              >
                {surah.name}
              </p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                {surah.numberOfAyahs} Ayahs • {surah.revelationType}
              </p>
            </div>
            {/* Background Accent */}
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          </Link>
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-lg">No Surahs found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-emerald-600 font-bold mt-2 hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SurahList;
