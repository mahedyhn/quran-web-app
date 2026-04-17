const BASE_URL = 'https://api.alquran.cloud/v1';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | any;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
  };
}

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

export const fetchSurahDetail = async (surahNumber: number, edition: string = 'quran-simple'): Promise<SurahDetail> => {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${edition}`);
  const data = await response.json();
  return data.data;
};

export const fetchTranslation = async (surahNumber: number, edition: string = 'en.asad'): Promise<SurahDetail> => {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${edition}`);
  const data = await response.json();
  return data.data;
};

export const searchAyahs = async (query: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/search/${query}/all/en.asad`);
  const data = await response.json();
  return data.data;
};
