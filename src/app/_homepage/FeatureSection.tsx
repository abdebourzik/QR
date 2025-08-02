'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Lottie } from 'xtreme-ui';

import { getAnimSrc } from '#utils/constants/common';

import './featureSection.scss';

const getHSL = (hue: number, light: number) => `hsl(${hue}, 70%, ${light}%)`;

const FeatureList = () => {
  const { t } = useTranslation();
  const [hues, setHues] = useState<number[]>([]);

  // Get translated feature items
  const items = [
    t('features.item1'),
    t('features.item2'),
    t('features.item3'),
    t('features.item4'),
    t('features.item5'),
    t('features.item6')
  ];

  useEffect(() => {
    const baseHues = Array(items.length)
      .fill(0)
      .map((_, i) => i * (360 / items.length));
    const shuffled = [...baseHues].sort(() => Math.random() - 0.5);
    setHues(shuffled);
  }, [items.length]);

  if (hues.length === 0) return null;

  return (
    <>
      {items.map((item, i) => (
        <div className='featureListItem' key={i}
          style={{
            ['--lightFeatureColor' as string]: getHSL(hues[i], 80),
            ['--darkFeatureColor' as string]: getHSL(hues[i], 40),
          }}
        >
          <h1>{item.charAt(0)}</h1>
          <p>{item}</p>
        </div>
      ))}
    </>
  );
};

const FeatureSection = () => {
  const { t } = useTranslation();

  return (
    <section className='featureSection' id='homepage-features'>
      <div className='featuresContent'>
        <h2>{t('features.title')}</h2>
        <FeatureList />
      </div>
      <div className='featuresAnim'>
        <Lottie className='whyUsAnim' src={getAnimSrc('FoodMeal')} speed={0.5} />
      </div>
    </section>
  );
};

export default FeatureSection;