import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchSurahDetail, fetchTranslation, SurahDetail } from '../services/quranApi';
import { useSettings } from '../hooks/useSettings';
import { ChevronLeft, ChevronRight, Loader2, BookOpen } from 'lucide-react';

const AyatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [translation, setTranslation] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const surahNumber = parseInt(id);
        const [surahData, translationData] = await Promise.all([
          fetchSurahDetail(surahNumber),
          fetchTranslation(surahNumber),
        ]);
        setSurah(surahData);
        setTranslation(translationData);
      } catch (error) {
        console.error('Error fetching surah data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [loading, location.hash]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-600">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-gray-500 font-medium italic">Preparing the Holy Word...</p>
      </div>
    );
  }

  if (!surah || !translation) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <p className="text-xl text-red-500 mb-4">Failed to load Surah data.</p>
        <Link to="/" className="text-emerald-600 font-bold hover:underline">
          Return to Surah List
        </Link>
      </div>
    );
  }

  const surahNumber = parseInt(id!);
  const isFirstSurah = surahNumber === 1;
  const isLastSurah = surahNumber === 114;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="relative bg-emerald-700 text-white p-8 sm:p-12 rounded-3xl overflow-hidden shadow-xl text-center flex flex-col items-center">
        <div className="relative z-10 space-y-4">
          <p className="text-emerald-200 uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">
            Surah {surah.number} • {surah.revelationType} • {surah.numberOfAyahs} Verses
          </p>
          <h1 className="text-3xl sm:text-5xl font-black">{surah.englishName}</h1>
          <p className="text-lg sm:text-xl text-emerald-100 font-medium italic">
            "{surah.englishNameTranslation}"
          </p>
          <div className="pt-6">
            <span 
              className="text-4xl sm:text-6xl block" 
              dir="rtl"
              style={{ fontFamily: settings.arabicFont }}
            >
              {surah.name}
            </span>
          </div>
        </div>

        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <BookOpen size={400} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
        <button
          onClick={() => navigate(`/surah/${surahNumber - 1}`)}
          disabled={isFirstSurah}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <ChevronLeft size={20} /> <span className="hidden sm:inline">Previous</span>
        </button>
        <Link to="/" className="text-gray-400 hover:text-emerald-600 transition-colors">
          <BookOpen size={24} />
        </Link>
        <button
          onClick={() => navigate(`/surah/${surahNumber + 1}`)}
          disabled={isLastSurah}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <span className="hidden sm:inline">Next</span> <ChevronRight size={20} />
        </button>
      </div>

      {/* Bismillah */}
      {surah.number !== 1 && surah.number !== 9 && (
        <div className="text-center py-12">
          <span 
            className="text-4xl sm:text-5xl text-gray-800" 
            dir="rtl"
            style={{ fontFamily: settings.arabicFont }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </div>
      )}

      {/* Ayahs List */}
      <div className="space-y-6">
        {surah.ayahs.map((ayah, index) => {
          // Remove Bismillah from text if it's there (except Fatiha and only if it's at start)
          let ayahText = ayah.text;
          if (surah.number !== 1 && index === 0 && ayahText.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
            ayahText = ayahText.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
          }

          return (
            <div
              id={`ayah-${ayah.numberInSurah}`}
              key={ayah.number}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-emerald-100 transition-all group scroll-mt-20"
            >
              <div className="flex items-center justify-between bg-gray-50/50 px-6 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {ayah.numberInSurah}
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Verse {ayah.numberInSurah}</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" 
                    title="Copy Ayah"
                    onClick={() => {
                      navigator.clipboard.writeText(`${ayah.text}\n\n${translation.ayahs[index].text}`);
                    }}
                  >
                    <BookOpen size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-10 space-y-10">
                <p
                  className="text-right leading-loose text-gray-900"
                  dir="rtl"
                  style={{
                    fontFamily: settings.arabicFont,
                    fontSize: `${settings.arabicFontSize}px`,
                    lineHeight: 2.4,
                  }}
                >
                  {ayahText}
                </p>
                <p
                  className="text-left text-gray-600 leading-relaxed font-normal"
                  style={{
                    fontSize: `${settings.translationFontSize}px`,
                  }}
                >
                  {translation.ayahs[index].text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-md">
        <button
          onClick={() => navigate(`/surah/${surahNumber - 1}`)}
          disabled={isFirstSurah}
          className="flex flex-col items-start gap-1 p-2 disabled:opacity-30 group"
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold group-hover:text-emerald-600 transition-colors">Previous</span>
          <div className="flex items-center gap-2 text-gray-800 font-bold group-hover:text-emerald-700 transition-colors">
            <ChevronLeft size={20} /> {isFirstSurah ? 'Beginning' : 'Previous Surah'}
          </div>
        </button>

        <button
          onClick={() => navigate(`/surah/${surahNumber + 1}`)}
          disabled={isLastSurah}
          className="flex flex-col items-end gap-1 p-2 disabled:opacity-30 group"
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold group-hover:text-emerald-600 transition-colors">Next</span>
          <div className="flex items-center gap-2 text-gray-800 font-bold group-hover:text-emerald-700 transition-colors">
            {isLastSurah ? 'Completion' : 'Next Surah'} <ChevronRight size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AyatPage;
