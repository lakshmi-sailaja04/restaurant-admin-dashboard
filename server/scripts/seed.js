require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

const MENU_ITEMS = [
  { name: 'Bruschetta', category: 'Appetizer', description: 'Toasted bread topped with tomatoes, basil & garlic.', price: 8.50, ingredients: ['bread', 'tomatoes', 'basil', 'garlic', 'olive oil'] },
  { name: 'Crispy Calamari', category: 'Appetizer', description: 'Lightly fried squid rings served with marinara sauce.', price: 11.00, ingredients: ['squid', 'flour', 'marinara', 'lemon'] },
  { name: 'Spinach Artichoke Dip', category: 'Appetizer', description: 'Creamy dip baked to golden perfection.', price: 9.75, ingredients: ['spinach', 'artichoke', 'cream cheese', 'parmesan'] },
  { name: 'Grilled Salmon', category: 'Main Course', description: 'Atlantic salmon with lemon-dill butter & seasonal veggies.', price: 24.00, ingredients: ['salmon', 'lemon', 'dill', 'butter', 'asparagus'] },
  { name: 'Mushroom Risotto', category: 'Main Course', description: 'Creamy arborio rice with wild mushrooms & truffle oil.', price: 18.50, ingredients: ['arborio rice', 'mushrooms', 'truffle oil', 'parmesan', 'white wine'] },
  { name: 'Chicken Parmesan', category: 'Main Course', description: 'Breaded chicken breast, marinara, mozzarella & spaghetti.', price: 19.00, ingredients: ['chicken breast', 'breadcrumbs', 'marinara', 'mozzarella', 'spaghetti'] },
  { name: 'Beef Wellington', category: 'Main Course', description: 'Beef tenderloin wrapped in puff pastry with mushroom duxelles.', price: 32.00, ingredients: ['beef tenderloin', 'puff pastry', 'mushrooms', 'foie gras'] },
  { name: 'Chocolate Lava Cake', category: 'Dessert', description: 'Warm dark chocolate cake with a molten center & vanilla ice cream.', price: 10.00, ingredients: ['dark chocolate', 'butter', 'eggs', 'flour', 'vanilla ice cream'] },
  { name: 'Tiramisu', category: 'Dessert', description: 'Classic Italian dessert with espresso-soaked ladyfingers.', price: 9.50, ingredients: ['mascarpone', 'ladyfingers', 'espresso', 'cocoa powder', 'eggs'] },
  { name: 'New York Cheesecake', category: 'Dessert', description: 'Creamy cheesecake on a graham-cracker crust with berry compote.', price: 8.75, ingredients: ['cream cheese', 'graham crackers', 'berries', 'sugar', 'eggs'] },
  { name: 'Freshly Squeezed Lemonade', category: 'Beverage', description: 'House-made lemonade with a hint of mint.', price: 5.00, ingredients: ['lemons', 'sugar', 'water', 'mint'] },
  { name: 'Iced Matcha Latte', category: 'Beverage', description: 'Japanese matcha blended with oat milk over ice.', price: 6.50, ingredients: ['matcha', 'oat milk', 'ice', 'honey'] },
  { name: 'Sparkling Water', category: 'Beverage', description: 'Imported Italian sparkling water with citrus.', price: 3.50, ingredients: ['sparkling water', 'lemon', 'lime'] }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await MenuItem.deleteMany();
    await Order.deleteMany();
    console.log('🗑️  Cleared existing data');

    const insertedItems = await MenuItem.insertMany(MENU_ITEMS);
    console.log(`🍽️  Inserted ${insertedItems.length} menu items`);

    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah'];
    const orders = [];

    for (let i = 0; i < 20; i++) {
      const itemCount = Math.floor(Math.random() * 4) + 1;
      const pickedItems = [];
      let total = 0;

      for (let j = 0; j < itemCount; j++) {
        const item = rand(insertedItems);
        const qty = Math.floor(Math.random() * 3) + 1;
        if (pickedItems.find((p) => p.menuItem.toString() === item._id.toString())) continue;
        pickedItems.push({
          menuItem: item._id,
          quantity: qty,
          priceAtOrder: item.price
        });
        total += item.price * qty;
      }

      if (pickedItems.length === 0) continue; 

      orders.push({
        customerName: `${rand(names)} #${i + 1}`,
        items: pickedItems,
        totalAmount: parseFloat(total.toFixed(2)),
        status: rand(statuses),
        tableNumber: Math.floor(Math.random() * 12) + 1
      });
    }

    await Order.insertMany(orders);
    console.log(`Inserted ${orders.length} sample orders`);
    console.log('Seed complete!');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
