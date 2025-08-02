import { Button, Lottie } from 'xtreme-ui';
import { useTranslation } from 'react-i18next';

import { getAnimSrc } from '#utils/constants/common';
import { scrollToSection } from '#utils/helper/common';

import './aboutSection.scss';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className='aboutSection' id='homepage-aboutus'>
      <div className='aboutContent'>
        <h2>{t('about.title')}</h2>
        <p>{t('about.description1')}</p>
        <p>{t('about.description2')}</p>
        <div className='aboutAction'>
          <Button label={t('about.learnMore')} onClick={() => scrollToSection('homepage-features')} />
          <Button label={t('about.whyUs')} type='secondary' onClick={() => scrollToSection('homepage-features')} />
        </div>
      </div>
      <div className='aboutAnim'>
        <Lottie className='scanMenuAnim' src={getAnimSrc('FoodScanMenu')} speed={0.8} />
      </div>
    </section>
  );
};

export default AboutSection;
