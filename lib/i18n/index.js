// lib/i18n/index.js - i18n configuration for App Router
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Landing Section
      landing: {
        revolutionizing: 'Révolutionnant',
        diningExperience: 'L\'Expérience Culinaire',
        description1: 'Fini le temps des systèmes de commande complexes et des',
        description2: 'menus papier dépassés. C\'est l\'heure de la nouvelle normalité, OrderWorder',
        learnMore: 'En savoir plus',
        orderNow: 'Commander maintenant'
      },
      
      // About Section
      about: {
        title: 'À Propos de Nous',
        description1: 'Nous sommes une équipe de révolutionnaires très motivés, dédiés à révolutionner l\'industrie de la restauration en transformant la façon dont vos clients commandent dans votre restaurant - en devenant sans contact et sans papier.',
        description2: 'Il est temps de combler le fossé entre vos clients et votre cuisine, de manière efficace, compétente et abordable, avec nous.',
        learnMore: 'En savoir plus',
        whyUs: 'Pourquoi nous ?'
      },
      
      // Features Section
      features: {
        title: 'Fonctionnalités',
        item1: 'Réduisez vos coûts d\'exploitation et de logistique',
        item2: 'Éliminez tout tiers entre votre client et votre cuisine',
        item3: 'Suivez l\'historique de toutes les commandes de vos clients',
        item4: 'Il est temps d\'avoir un avantage professionnel',
        item5: 'Améliorez l\'expérience culinaire de vos propres clients',
        item6: 'Supprimez toute possibilité d\'erreur humaine dans votre gestion de restaurant'
      },
      
      // Login Section
      login: {
        title: 'Connexion',
        subtitle: 'Veuillez entrer vos identifiants',
        email: 'Entrez votre email',
        password: 'Entrez le mot de passe',
        next: 'Suivant',
        signIn: 'Se connecter',
        kitchenMode: 'se connecter à la cuisine',
        openDashboard: 'ouvrir le tableau de bord',
        openKitchen: 'ouvrir la cuisine',
        openMenu: 'ouvrir le menu du restaurant'
      },
      
      // Common
      footer: {
        copyright: '© {{year}} OrderWorder, Inc. Tous droits réservés.'
      }
    }
  },
  
  ar: {
    translation: {
      // Landing Section
      landing: {
        revolutionizing: 'ثورة في',
        diningExperience: 'تجربة تناول الطعام',
        description1: 'ولت أيام أنظمة الطلب المعقدة والقوائم',
        description2: 'الورقية القديمة. حان وقت الوضع الطبيعي الجديد، OrderWorder',
        learnMore: 'تعرف أكثر',
        orderNow: 'اطلب الآن'
      },
      
      // About Section
      about: {
        title: 'معلومات عنا',
        description1: 'نحن فريق من الثوريين المتحمسين جداً، مكرسون لثورة في صناعة المطاعم من خلال تحويل طريقة طلب عملائكم في مطعمكم - من خلال التحول إلى اللاتلامس واللاورقي.',
        description2: 'حان الوقت لسد الفجوة بين عملائكم ومطبخكم، بطريقة فعالة ومؤهلة وبأسعار معقولة، معنا.',
        learnMore: 'تعرف أكثر',
        whyUs: 'لماذا نحن؟'
      },
      
      // Features Section
      features: {
        title: 'المميزات',
        item1: 'قلل من تكاليف التشغيل واللوجستيات',
        item2: 'أزل أي طرف ثالث بين العميل والمطبخ',
        item3: 'تتبع تاريخ جميع طلبات العملاء',
        item4: 'حان الوقت للحصول على ميزة مهنية',
        item5: 'حسن تجربة تناول الطعام لعملائك',
        item6: 'أزل أي احتمال للخطأ البشري في إدارة المطعم'
      },
      
      // Login Section
      login: {
        title: 'تسجيل الدخول',
        subtitle: 'يرجى إدخال بيانات الاعتماد',
        email: 'أدخل بريدك الإلكتروني',
        password: 'أدخل كلمة المرور',
        next: 'التالي',
        signIn: 'تسجيل الدخول',
        kitchenMode: 'تسجيل الدخول للمطبخ',
        openDashboard: 'فتح لوحة التحكم',
        openKitchen: 'فتح المطبخ',
        openMenu: 'فتح قائمة المطعم'
      },
      
      // Common
      footer: {
        copyright: '© {{year}} OrderWorder, Inc. جميع الحقوق محفوظة.'
      }
    }
  },
  
  en: {
    translation: {
      // Landing Section
      landing: {
        revolutionizing: 'Revolutionizing',
        diningExperience: 'Dining Experience',
        description1: 'Gone are the days of complex ordering systems and outdated',
        description2: 'paper menus. It\'s time for the new normal, OrderWorder',
        learnMore: 'Learn more',
        orderNow: 'Order now'
      },
      
      // About Section
      about: {
        title: 'About Us',
        description1: 'We are a team of highly motivated revolutionaries, dedicated towards revolutionizing the restaurant industry by transforming the way your customers order at your restaurant - by going contactless and paperless.',
        description2: 'It\'s time to bridge the gap between your customers and your kitchen, in an efficient, proficient and affordable way, with us.',
        learnMore: 'Learn more',
        whyUs: 'Why us?'
      },
      
      // Features Section
      features: {
        title: 'Features',
        item1: 'Bring down your operating and logistics cost',
        item2: 'Eliminate any third parties between your customer and kitchen',
        item3: 'Track history of all your customer orders',
        item4: 'Time to get a professional edge',
        item5: 'Enhance the dining experience for your own customers',
        item6: 'Remove any scope of human error in your restaurant management'
      },
      
      // Login Section
      login: {
        title: 'Login',
        subtitle: 'Please enter credentials',
        email: 'Enter your email',
        password: 'Enter password',
        next: 'Next',
        signIn: 'Sign In',
        kitchenMode: 'login to kitchen',
        openDashboard: 'open dashboard',
        openKitchen: 'open kitchen',
        openMenu: 'open restaurant menu'
      },
      
      // Common
      footer: {
        copyright: '© {{year}} OrderWorder, Inc. All rights reserved.'
      }
    }
  }
};

// Only initialize on client side
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'fr',
      debug: process.env.NODE_ENV === 'development',
      
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage']
      }
    });
}

export default i18n;