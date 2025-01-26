import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const schedulePickup = async (pickupData) => {
  try {
    const response = await axios.post($,{BASE_URL}/schedule-pickup, pickupData);
    return response.data;
  } catch (error) {
    console.error('Pickup scheduling error:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post($,{BASE_URL}/users, userData);
    return response.data;
  } catch (error) {
    console.error('User creation error:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get($,{BASE_URL}/user/$,{userId});
    return response.data;
  } catch (error) {
    console.error('User profile fetch error:', error);
    throw error;
  }
};

export const getEnvironmentalImpact = async () => {
  try {
    const response = await axios.get($,{BASE_URL}/impact);
    return response.data;
  } catch (error) {
    console.error('Impact data fetch error:', error);
    throw error;
  }
};