import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from '../sidebar/Sidebar';
import Footer from './Footer';
import SearchModal from '../search/SearchModal';

export default function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Automatically close mobile sidebar and reset content scroll whenever route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
    const scrollContainer = document.getElementById('main-content-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-hidden">
      {/* Top Navbar (Fixed 4rem header) */}
      <Navbar
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main App Body (Fixed height viewport, independent scrolling panes) */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto overflow-hidden min-h-0">
        {/* Left Fixed Sidebar with its own vertical scroll */}
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Content Area (Independent scrollable viewport) */}
        <main
          id="main-content-scroll"
          className="flex-1 min-w-0 h-full overflow-y-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 overflow-x-hidden scroll-smooth flex flex-col justify-between"
        >
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      {/* Global Cmd+K Search Palette */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
