const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(error => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit the app if DB connection fails
});

// Device Schema
const deviceSchema = new mongoose.Schema({
  address: { type: String, required: true },
  deviceType: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Scheduled', 'Picked Up', 'Processed'], 
    default: 'Scheduled' 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rewardPoints: { type: Number, default: 0 }, // Added field for rewardPoints
  createdAt: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rewardPoints: { type: Number, default: 0 },
  pickups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }]
});

const Device = mongoose.model('Device', deviceSchema);
const User = mongoose.model('User', userSchema);

// Routes
// Schedule E-Waste Pickup
app.post('/api/schedule-pickup', async (req, res) => {
  try {
    const { address, deviceType, userId } = req.body;

    // Validate input
    if (!address || !deviceType || !userId) {
      return res.status(400).json({ message: 'Address, device type, and user ID are required' });
    }

    // Create new device pickup
    const newDevice = new Device({
      address,
      deviceType,
      user: userId
    });

    await newDevice.save();

    // Update user's pickups
    await User.findByIdAndUpdate(
      userId, 
      { $push: { pickups: newDevice._id } },
      { new: true }
    );

    // Award reward points
    const pointsAwarded = deviceType === 'Smartphone' ? 50 
                        : deviceType === 'Laptop' ? 100 
                        : 25;

    newDevice.rewardPoints = pointsAwarded; // Assign points to device
    await newDevice.save(); // Save device with reward points

    // Update user's reward points
    await User.findByIdAndUpdate(
      userId,
      { $inc: { rewardPoints: pointsAwarded } },
      { new: true }
    );

    res.status(201).json({ 
      message: 'Pickup scheduled successfully', 
      device: newDevice,
      pointsAwarded 
    });
  } catch (error) {
    console.error('Error scheduling pickup:', error);
    res.status(500).json({ message: 'Error scheduling pickup', error: error.message });
  }
});

// Get User Profile and Pickups
app.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('pickups');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

// Create User
app.post('/api/users', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, name });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Impact Tracking Endpoint
app.get('/api/impact', async (req, res) => {
  try {
    const totalPickups = await Device.countDocuments();
    const processingStats = await Device.aggregate([
      { $group: {
        _id: '$deviceType',
        count: { $sum: 1 },
        totalRewardPoints: { $sum: '$rewardPoints' }
      }}
    ]);

    const environmentalImpact = {
      totalDevicesRecycled: totalPickups,
      deviceTypeBreakdown: processingStats,
      estimatedCO2Saved: totalPickups * 5.5 // Hypothetical CO2 saving per device
    };

    res.status(200).json(environmentalImpact);
  } catch (error) {
    console.error('Error calculating impact:', error);
    res.status(500).json({ message: 'Error calculating impact', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
