import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchAyahs } from '../services/quranApi';
import { Search as SearchIcon, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { settings } = useSettings();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await searchAyahs(query);
      setResults(data.matches || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Search the Quran</h1>
        <p className="text-gray-500">Find verses by searching keywords in the English translation.</p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <SearchIcon size={22} />
        </div>
        <input
          type="text"
          placeholder="e.g., 'patience', 'mercy', 'knowledge'..."
          className="block w-full pl-12 pr-32 py-4 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 inset-y-2 px-6 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
          disabled={loading || !query.trim()}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
        </button>
      </form>

      {searched && !loading && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <p className="text-gray-600">
              Found <span className="font-bold text-emerald-600">{results.length}</span> results for "{query}"
            </p>
          </div>

          <div className="space-y-4">
            {results.map((match: any, index) => (
              <Link
                key={`${match.surah.number}-${match.numberInSurah}-${index}`}
                to={`/surah/${match.surah.number}#ayah-${match.numberInSurah}`}
                className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {match.surah.englishName} {match.surah.number}:{match.numberInSurah}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View Surah <ChevronRight size={16} />
                  </div>
                </div>
                <div className="space-y-4">
                  <p 
                    className="text-gray-800 leading-relaxed"
                    style={{ fontSize: `${settings.translationFontSize}px` }}
                  >
                    {match.text}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
                    <BookOpen size={14} />
                    <span>Juz {match.juz} • Page {match.page}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="flex justify-center mb-4 text-gray-300">
                <BookOpen size={48} />
              </div>
              <p className="text-lg text-gray-500 font-medium">No results found for your search.</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or check your spelling.</p>
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8">
          {['Patience', 'Gratitude', 'Prayer', 'Mercy'].map((word) => (
            <button
              key={word}
              onClick={() => {
                setQuery(word.toLowerCase());
              }}
              className="p-4 bg-white rounded-2xl border border-gray-100 text-gray-600 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-sm transition-all text-center font-medium"
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
