// _homepage/PageContainer.tsx - Updated with i18n support
'use client';

import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import AboutSection from './AboutSection';
import FeatureSection from './FeatureSection';
import FooterSection from './FooterSection';
import LandingSection from './LandingSection';
import LoginSection from './LoginSection';
import Navbar from './Navbar';

// Import i18n configuration
import i18n from '../../../lib/i18n';

export default function PageContainer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    // Wait for i18n to be ready
    if (i18n.isInitialized) {
      setI18nReady(true);
    } else {
      i18n.on('initialized', () => {
        setI18nReady(true);
      });
    }

    // Cleanup
    return () => {
      i18n.off('initialized');
    };
  }, []);

  // Show loading state while i18n initializes
  if (!i18nReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <div className='homepage'>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div
          className={`homepageSections ${menuOpen ? 'menuOpen' : ''}`}
        >
          <LandingSection />
          <AboutSection />
          <FeatureSection />
          <LoginSection />
          <FooterSection />
        </div>
      </div>
    </I18nextProvider>
  );
}