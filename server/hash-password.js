require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./Models/admin/AdminModel'); // ✅ adjust path if needed

// MongoDB connection URI — use your .env or hardcode
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-db-name';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function createAdmins() {
  const admins = [
    { email: 'admin1@gmail.com', password: 'admin1' },
    { email: 'admin2@gmail.com', password: 'admin2' },
  ];

  for (const adminData of admins) {
    // Check if admin already exists
    const exists = await Admin.findOne({ email: adminData.email });
    if (exists) {
      console.log(`⚠️ Admin with email ${adminData.email} already exists. Skipping.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    const newAdmin = new Admin({
      email: adminData.email,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log(`✅ Created admin: ${adminData.email}`);
  }

  mongoose.disconnect();
}

createAdmins().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
