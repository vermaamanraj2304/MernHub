import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import TopicPage from './pages/TopicPage';
import ChecklistPage from './pages/ChecklistPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="checklist" element={<ChecklistPage />} />
                <Route
                  path="learn/:moduleSlug/:topicSlug/:subtopicSlug"
                  element={<TopicPage />}
                />
                {/* Fallback for partial learn path */}
                <Route
                  path="learn/:moduleSlug"
                  element={<Navigate to="/" replace />}
                />
                {/* 404 handler */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
