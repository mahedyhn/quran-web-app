import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SurahList from './pages/SurahList';
import AyatPage from './pages/AyatPage';
import SearchPage from './pages/SearchPage';
import { SettingsProvider } from './hooks/useSettings';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<SurahList />} />
            <Route path="/surah/:id" element={<AyatPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </Router>
    </SettingsProvider>
  );
};

export default App;
