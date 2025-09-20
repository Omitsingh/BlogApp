const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing admin password
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const User = require('./models/User'); // Import User model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Function to create admin if none exists
async function createAdmin() {
  try {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin123', 10);
      const admin = new User({
        username: 'AdminUser',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });
      await admin.save();
      console.log('✅ Admin user created: admin@example.com / Admin123');
    } else if (!existingAdmin.isAdmin) {
      // Update existing user to admin
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('Existing user updated to admin:', adminEmail);
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error creating admin:', err.message);
  }
}

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected successfully');
  await createAdmin(); // Call function after DB connected
})
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
