import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultPage from './pages/default';
import HomePage from './pages/home';
import LegacyPage from './pages/legacy';
import LuckyDicePage from './pages/lucky-dice/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/legacy" element={<LegacyPage />} />
        <Route path='/lucky-dice' element={<LuckyDicePage />} />
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
