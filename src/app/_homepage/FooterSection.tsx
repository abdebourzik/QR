import { useTranslation } from 'react-i18next';
import Lightings from './Lightings';
import './footerSection.scss';

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <section className='footerSection' id='homepage-footer'>
      <p>
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </p>
      <Lightings />
    </section>
  );
};

export default FooterSection;