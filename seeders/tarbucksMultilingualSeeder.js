// seeders/starbucksMultilingualSeeder.js
const mongoose = require('mongoose');

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orderworder';

// Enhanced Menu Item Schema (matches your new structure)
const MenuItemSchema = new mongoose.Schema({
  name: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    fr: { type: String },
    en: { type: String },
    ar: { type: String }
  },
  category: { type: String, required: true },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'MAD' }
  },
  spiceLevel: {
    type: String,
    enum: ['doux', 'epice', 'tres_epice'],
    default: 'doux'
  },
  dietaryInfo: {
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    isHalal: { type: Boolean, default: true },
    isGlutenFree: { type: Boolean, default: false },
    isDairyFree: { type: Boolean, default: false }
  },
  allergens: [{ type: String }],
  images: [{
    url: { type: String },
    alt: {
      fr: { type: String },
      en: { type: String },
      ar: { type: String }
    },
    isPrimary: { type: Boolean, default: false }
  }],
  restaurantId: { type: String, required: true },
  isSpecialty: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Restaurant Schema
const RestaurantSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    fr: { type: String },
    en: { type: String },
    ar: { type: String }
  },
  address: {
    fr: { type: String },
    en: { type: String },
    ar: { type: String }
  },
  themeColor: {
    h: { type: Number },
    s: { type: Number },
    l: { type: Number }
  },
  categories: [{ type: String }],
  avatar: { type: String },
  cover: { type: String },
  isActive: { type: Boolean, default: true }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

// Starbucks menu data with multilingual support
const starbucksMenuData = [
  // Frappuccinos
  {
    name: {
      fr: "Frappuccino au Caramel",
      en: "Caramel Frappuccino",
      ar: "فرابتشينو بالكراميل"
    },
    description: {
      fr: "Un mélange de café, sirop de caramel sucré, lait et glace garni de crème fouettée et d'un tourbillon de caramel.",
      en: "A blend of coffee, sweet caramel syrup, milk and ice topped with whipped cream and a swirl of caramel drizzle.",
      ar: "مزيج من القهوة وشراب الكراميل الحلو والحليب والثلج مع الكريمة المخفوقة ورشة كراميل"
    },
    category: "frappuccino",
    price: { amount: 45, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isHalal: true,
      isGlutenFree: false,
      isDairyFree: false
    },
    allergens: ["lait"],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/d97/6b7398272b414b14f6d9781d3591bd97.jpg",
      alt: {
        fr: "Frappuccino au Caramel",
        en: "Caramel Frappuccino",
        ar: "فرابتشينو بالكراميل"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    isRecommended: true,
    displayOrder: 1
  },
  {
    name: {
      fr: "Frappuccino Moka",
      en: "Mocha Frappuccino",
      ar: "فرابتشينو موكا"
    },
    description: {
      fr: "Café avec une riche sauce moka mélangée avec du lait et de la glace. Garni de crème fouettée sucrée.",
      en: "Coffee with rich mocha sauce blended with milk and ice. Topped with sweetened whipped cream.",
      ar: "قهوة مع صلصة الموكا الغنية مخلوطة بالحليب والثلج ومغطاة بالكريمة المخفوقة المحلاة"
    },
    category: "frappuccino",
    price: { amount: 42, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isHalal: true,
      isGlutenFree: false,
      isDairyFree: false
    },
    allergens: ["lait"],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/ab6/8eb2e241b251c934aa5c4f9f9fb9eab6.jpg",
      alt: {
        fr: "Frappuccino Moka",
        en: "Mocha Frappuccino",
        ar: "فرابتشينو موكا"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    displayOrder: 2
  },
  {
    name: {
      fr: "Frappuccino Java Chip",
      en: "Java Chip Frappuccino",
      ar: "فرابتشينو جافا تشيب"
    },
    description: {
      fr: "Nous mélangeons la sauce moka et les chips Frappuccino avec le café Frappuccino roast, du lait et de la glace.",
      en: "We blend mocha sauce and Frappuccino chips with Frappuccino roast coffee and milk and ice.",
      ar: "نخلط صلصة الموكا ورقائق الفرابتشينو مع قهوة فرابتشينو المحمصة والحليب والثلج"
    },
    category: "frappuccino",
    price: { amount: 48, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isHalal: true,
      isGlutenFree: false,
      isDairyFree: false
    },
    allergens: ["lait", "gluten", "soja"],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/79d/28ce00688861423b99ac813b0cd6979d.jpg",
      alt: {
        fr: "Frappuccino Java Chip",
        en: "Java Chip Frappuccino",
        ar: "فرابتشينو جافا تشيب"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    isSpecialty: true,
    displayOrder: 3
  },

  // Boissons Chaudes / Hot Beverages
  {
    name: {
      fr: "Latte",
      en: "Caffè Latte",
      ar: "لاتيه"
    },
    description: {
      fr: "Notre espresso riche en saveur, équilibré avec du lait cuit à la vapeur et une légère couche de mousse.",
      en: "Our dark, rich espresso balanced with steamed milk and a light layer of foam.",
      ar: "إسبريسو غني ومتوازن مع الحليب المبخر وطبقة خفيفة من الرغوة"
    },
    category: "boissons_chaudes",
    price: { amount: 32, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isHalal: true,
      isGlutenFree: true,
      isDairyFree: false
    },
    allergens: ["lait"],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/46f/879e3f36c309519bd089ce9a8d13746f.jpg",
      alt: {
        fr: "Latte",
        en: "Caffè Latte", 
        ar: "لاتيه"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    isRecommended: true,
    displayOrder: 4
  },
  {
    name: {
      fr: "Cappuccino",
      en: "Cappuccino",
      ar: "كابتشينو"
    },
    description: {
      fr: "Espresso riche en saveur sous une couche lisse et étirée de mousse épaisse.",
      en: "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick foam.",
      ar: "إسبريسو غني وقوي تحت طبقة ناعمة ومشدودة من الرغوة الكثيفة"
    },
    category: "boissons_chaudes",
    price: { amount: 35, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isHalal: true,
      isGlutenFree: true,
      isDairyFree: false
    },
    allergens: ["lait"],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/468/beafebeb370a02fdc9fdd1dc4ac45468.jpg",
      alt: {
        fr: "Cappuccino",
        en: "Cappuccino",
        ar: "كابتشينو"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    displayOrder: 5
  },
  {
    name: {
      fr: "Thé à la Menthe Marocain",
      en: "Moroccan Mint Tea",
      ar: "أتاي بالنعناع المغربي"
    },
    description: {
      fr: "Thé vert traditionnel marocain infusé avec de la menthe fraîche et servi avec du sucre.",
      en: "Traditional Moroccan green tea infused with fresh mint and served with sugar.",
      ar: "شاي أخضر مغربي تقليدي منقوع بالنعناع الطازج ويقدم مع السكر"
    },
    category: "boissons_chaudes",
    price: { amount: 25, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isHalal: true,
      isGlutenFree: true,
      isDairyFree: true
    },
    allergens: [],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/5e4/24eba55ea8ac447037d90e3aee86a5e4.jpg",
      alt: {
        fr: "Thé à la Menthe Marocain",
        en: "Moroccan Mint Tea",
        ar: "أتاي بالنعناع المغربي"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    isSpecialty: true,
    displayOrder: 6
  },

  // Boissons Froides / Cold Beverages
  {
    name: {
      fr: "Café Glacé Américain",
      en: "Iced Caffè Americano",
      ar: "قهوة أمريكانو مثلجة"
    },
    description: {
      fr: "Des shots d'espresso surmontés d'eau pour produire une légère couche de crème, puis servis sur glace.",
      en: "Espresso shots are topped with water to produce a light layer of crema, then served over ice.",
      ar: "جرعات إسبريسو مع الماء لإنتاج طبقة خفيفة من الكريما، ثم تقدم على الثلج"
    },
    category: "boissons_froides",
    price: { amount: 28, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isHalal: true,
      isGlutenFree: true,
      isDairyFree: true
    },
    allergens: [],
    images: [{
      url: "https://b.zmtcdn.com/data/dish_photos/f4e/ef392346623dc465eb3107d7502bbf4e.jpg",
      alt: {
        fr: "Café Glacé Américain",
        en: "Iced Caffè Americano",
        ar: "قهوة أمريكانو مثلجة"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    displayOrder: 7
  },

  // Desserts Marocains / Moroccan Desserts
  {
    name: {
      fr: "Chebakia",
      en: "Chebakia",
      ar: "شباكية"
    },
    description: {
      fr: "Pâtisserie marocaine traditionnelle en forme de fleur, frite et trempée dans le miel, parsemée de graines de sésame.",
      en: "Traditional Moroccan flower-shaped pastry, fried and dipped in honey, sprinkled with sesame seeds.",
      ar: "حلوى مغربية تقليدية على شكل وردة، مقلية ومغموسة في العسل ومرشوشة ببذور السمسم"
    },
    category: "desserts_marocains",
    price: { amount: 15, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isHalal: true,
      isGlutenFree: false,
      isDairyFree: false
    },
    allergens: ["gluten", "sesame", "oeufs"],
    images: [{
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      alt: {
        fr: "Chebakia - Pâtisserie Marocaine",
        en: "Chebakia - Moroccan Pastry",
        ar: "شباكية - حلوى مغربية"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    isSpecialty: true,
    displayOrder: 8
  },
  {
    name: {
      fr: "Makroudh",
      en: "Makroudh",
      ar: "مقروض"
    },
    description: {
      fr: "Gâteau de semoule farci aux dattes, parfumé à l'eau de fleur d'oranger et au miel.",
      en: "Semolina cake filled with dates, flavored with orange blossom water and honey.",
      ar: "كعكة السميد محشوة بالتمر ومنكهة بماء زهر البرتقال والعسل"
    },
    category: "desserts_marocains",
    price: { amount: 12, currency: "MAD" },
    spiceLevel: "doux",
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isHalal: true,
      isGlutenFree: false,
      isDairyFree: true
    },
    allergens: ["gluten"],
    images: [{
      url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500",
      alt: {
        fr: "Makroudh aux Dattes",
        en: "Date Makroudh",
        ar: "مقروض بالتمر"
      },
      isPrimary: true
    }],
    restaurantId: "starbucks",
    isSpecialty: true,
    displayOrder: 9
  }
];

// Starbucks restaurant data
const starbucksRestaurantData = {
  username: "starbucks",
  name: {
    fr: "Starbucks Coffee Maroc",
    en: "Starbucks Coffee Morocco",
    ar: "ستاربكس كوفي المغرب"
  },
  description: {
    fr: "Chaîne de cafés offrant une vaste gamme de cafés fraîchement préparés, thés et boissons assorties ainsi qu'une sélection de collations et pâtisseries délectables dans de nombreux endroits au Maroc.",
    en: "Coffee chain offering an extensive range of freshly brewed coffees, teas, and assorted beverages along with a selection of delectable snacks and pastries across numerous locations in Morocco.",
    ar: "سلسلة مقاهي تقدم مجموعة واسعة من القهوة والشاي والمشروبات المتنوعة المحضرة طازجة بالإضافة إلى مجموعة مختارة من الوجبات الخفيفة والمعجنات اللذيذة في مواقع عديدة في المغرب"
  },
  address: {
    fr: "Indiranagar, Casablanca",
    en: "Indiranagar, Casablanca", 
    ar: "إندرناغار، الدار البيضاء"
  },
  themeColor: {
    h: 158,
    s: 100,
    l: 19
  },
  categories: [
    "frappuccino",
    "boissons_chaudes", 
    "boissons_froides",
    "desserts_marocains",
    "desserts_internationaux",
    "sandwiches"
  ],
  avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
  cover: "https://b.zmtcdn.com/data/reviews_photos/c9f/cad697975e8e2871657b7df8ceea2c9f_1410727142.jpg",
  isActive: true
};

// Seeder function
async function seedStarbucksMultilingual() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing Starbucks data
    console.log('🧹 Clearing existing Starbucks data...');
    await MenuItem.deleteMany({ restaurantId: 'starbucks' });
    await Restaurant.deleteOne({ username: 'starbucks' });

    // Insert restaurant data
    console.log('🏪 Creating Starbucks restaurant...');
    const restaurant = new Restaurant(starbucksRestaurantData);
    await restaurant.save();

    // Insert menu items
    console.log('📋 Adding multilingual menu items...');
    const menuItems = starbucksMenuData.map(item => new MenuItem(item));
    await MenuItem.insertMany(menuItems);

    console.log('🎉 Seeding completed successfully!');
    console.log(`📊 Added ${menuItems.length} menu items in 3 languages`);
    console.log('🌍 Languages: French (fr), English (en), Arabic (ar)');
    
    // Log categories summary
    const categories = [...new Set(starbucksMenuData.map(item => item.category))];
    console.log('📁 Categories:', categories.join(', '));

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Export for use in scripts
module.exports = { seedStarbucksMultilingual, starbucksMenuData, starbucksRestaurantData };

// Run if called directly
if (require.main === module) {
  seedStarbucksMultilingual().then(() => process.exit(0));
}
