import { useEffect, useState, MouseEvent, Dispatch, SetStateAction, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, useXTheme } from 'xtreme-ui';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '#utils/helper/common';

import './landingSection.scss';

// Simple className utility
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Language selector component
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦', nativeName: 'العربية' },
    { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Update document direction for Arabic
    document.documentElement.dir = languageCode === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
    
    // Save to localStorage
    localStorage.setItem('preferredLanguage', languageCode);
  };

  // Initialize language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== i18n.language) {
      changeLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <span className="flag">{currentLanguage.flag}</span>
        <span className="name">{currentLanguage.nativeName}</span>
        <span className={cn("arrow", isOpen && "rotated")}>▼</span>
      </button>
      
      {isOpen && (
        <>
          <div className="language-backdrop" onClick={() => setIsOpen(false)} />
          <div className="language-dropdown">
            {languages.map((language) => (
              <button
                key={language.code}
                className={cn(
                  "language-option",
                  language.code === i18n.language && "active"
                )}
                onClick={() => changeLanguage(language.code)}
              >
                <span className="flag">{language.flag}</span>
                <span className="name">{language.nativeName}</span>
                {language.code === i18n.language && <span className="check">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
      
      <style jsx>{`
        .language-selector {
          position: relative;
          margin-left: 16px;
        }
        
        .language-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          font-size: 14px;
        }
        
        .language-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }
        
        .language-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }
        
        .language-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          z-index: 1000;
          backdrop-filter: blur(20px);
          min-width: 140px;
          overflow: hidden;
          animation: fadeInScale 0.2s ease-out;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .language-option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #333;
          font-size: 14px;
          position: relative;
        }
        
        .language-option:hover {
          background-color: rgba(46, 139, 87, 0.1);
        }
        
        .language-option.active {
          background-color: #2E8B57;
          color: white;
        }
        
        .flag {
          font-size: 16px;
        }
        
        .name {
          flex: 1;
          text-align: left;
          font-weight: 500;
        }
        
        .check {
          font-size: 12px;
          font-weight: bold;
        }
        
        .arrow {
          font-size: 10px;
          transition: transform 0.2s ease;
        }
        
        .arrow.rotated {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

const bgImg = '/backgrounds/landingCover.png';
const overlayImg = '/backgrounds/landingCoverOverlay.png';
const maxBlurPerImage = 30;
const maxOverlayTranslate = 0.3;

const LandingSection = () => {
  const router = useRouter();
  const { isDarkTheme } = useXTheme();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [blurBackground, setBlurBackground] = useState<number>(maxBlurPerImage);
  const [blurOverlay, setBlurOverlay] = useState<number>(maxBlurPerImage);

  const onMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const width = target.clientWidth / 2;
    const height = target.clientHeight / 2;

    const overlayX = maxOverlayTranslate * ((event.pageX - width) / width);
    const overlayY = maxOverlayTranslate * ((event.pageY - height) / height);
    if (ref?.current) ref.current.style.transform = `translate(${overlayX}%, ${overlayY}%)`;
  };

  useEffect(() => {
    const fetchImages = (src: string, setBlur: Dispatch<SetStateAction<number>>) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = (event) => setBlur((blur) => maxBlurPerImage - ((blur - 4) * (event.loaded / event.total)));
      xhr.onload = () => setBlur(0);
      xhr.send();
    };

    fetchImages(bgImg, setBlurBackground);
    fetchImages(overlayImg, setBlurOverlay);
  }, []);

  return (
    <section 
      className={cn('landingSection', isDarkTheme && 'dark')} 
      id='homepage'
      style={{ filter: `blur(${blurBackground + blurOverlay}px)` }}
    >
      <div className='coverBackground' style={{ backgroundImage: `url(${bgImg})` }} />
      <div 
        ref={ref} 
        className='coverOverlay' 
        onMouseMove={onMouseMove} 
        style={{ backgroundImage: `url(${overlayImg})` }} 
      />
      <div className='overlay' />
      
      {/* Language Selector positioned in top right */}
      <div className="language-selector-container">
        <LanguageSelector />
      </div>
      
      <div className='landingGreeting'>
        <p className='head'>{t('landing.revolutionizing')}</p>
        <p className='subHead'>{t('landing.diningExperience')}</p>
        <p className='desc'>{t('landing.description1')}</p>
        <p className='desc'>{t('landing.description2')}</p>
        <div className='greetingAction'>
          <Button 
            label={t('landing.learnMore')} 
            type='secondary' 
            onClick={() => scrollToSection('homepage-aboutus')} 
          />
          <Button 
            label={t('landing.orderNow')} 
            onClick={() => router.push('/starbucks?table=1')} 
          />
        </div>
      </div>
      
      <style jsx>{`
        .language-selector-container {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
        }
        
        @media (width <= 530px) {
          .language-selector-container {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default LandingSection;