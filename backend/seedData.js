const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bicycle = require('./models/Bicycle');
const User = require('./models/User');

dotenv.config();

const sampleBicycles = [
  {
    name: "Thunder Mountain Pro",
    brand: "RideTech",
    category: "Mountain",
    price: 1299,
    originalPrice: 1499,
    description: "Professional mountain bike designed for extreme terrains. Features advanced suspension system and lightweight carbon frame for maximum performance.",
    specifications: {
      frameSize: "L",
      wheelSize: "29\"",
      gears: 21,
      weight: "13.5 kg",
      material: "Carbon Fiber",
      color: "Matte Black"
    },
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
    ],
    inStock: true,
    quantity: 15,
    featured: true,
    rating: 4.8
  },
  {
    name: "Speed Demon Road",
    brand: "VelocityMax",
    category: "Road",
    price: 899,
    originalPrice: 1099,
    description: "Aerodynamic road bike perfect for racing and long-distance rides. Lightweight aluminum frame with precision engineering.",
    specifications: {
      frameSize: "M",
      wheelSize: "700c",
      gears: 18,
      weight: "9.2 kg",
      material: "Aluminum",
      color: "Racing Red"
    },
    images: [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800",
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800"
    ],
    inStock: true,
    quantity: 20,
    featured: true,
    rating: 4.6
  },
  {
    name: "Urban Explorer Hybrid",
    brand: "CityRide",
    category: "Hybrid",
    price: 649,
    originalPrice: 749,
    description: "Perfect blend of comfort and performance for city commuting. Versatile design suitable for both roads and light trails.",
    specifications: {
      frameSize: "M",
      wheelSize: "28\"",
      gears: 16,
      weight: "12.8 kg",
      material: "Steel",
      color: "Ocean Blue"
    },
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800"
    ],
    inStock: true,
    quantity: 25,
    featured: false,
    rating: 4.4
  },
  {
    name: "Lightning E-Bike",
    brand: "ElectroRide",
    category: "Electric",
    price: 2199,
    originalPrice: 2499,
    description: "High-performance electric bike with 80km range. Smart battery management system and integrated GPS tracking.",
    specifications: {
      frameSize: "L",
      wheelSize: "26\"",
      gears: 7,
      weight: "22.5 kg",
      material: "Aluminum",
      color: "Electric Silver"
    },
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800"
    ],
    inStock: true,
    quantity: 10,
    featured: true,
    rating: 4.9
  },
  {
    name: "Stunt Master BMX",
    brand: "ExtremeSports",
    category: "BMX",
    price: 449,
    originalPrice: 549,
    description: "Professional BMX bike built for tricks and stunts. Reinforced frame and responsive handling for maximum control.",
    specifications: {
      frameSize: "S",
      wheelSize: "20\"",
      gears: 1,
      weight: "11.2 kg",
      material: "Chromoly Steel",
      color: "Neon Green"
    },
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
    ],
    inStock: true,
    quantity: 12,
    featured: false,
    rating: 4.3
  },
  {
    name: "Beach Cruiser Classic",
    brand: "CoastalRide",
    category: "Cruiser",
    price: 299,
    originalPrice: 399,
    description: "Relaxed riding experience perfect for beach paths and casual rides. Comfortable seat and upright riding position.",
    specifications: {
      frameSize: "M",
      wheelSize: "26\"",
      gears: 3,
      weight: "16.8 kg",
      material: "Steel",
      color: "Sunset Orange"
    },
    images: [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800",
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800"
    ],
    inStock: true,
    quantity: 18,
    featured: false,
    rating: 4.1
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🚀 Connected to MongoDB Atlas');

    // Clear existing data
    await Bicycle.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Insert sample bicycles
    await Bicycle.insertMany(sampleBicycles);
    console.log('🚴‍♀️ Sample bicycles added');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@bicycleshowcase.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('👤 Admin user created');

    // Create regular user
    const regularUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'user'
    });
    await regularUser.save();
    console.log('👤 Regular user created');

    console.log('✅ Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();