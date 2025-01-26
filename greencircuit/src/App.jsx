import React, { useState } from 'react';
import './App.css'
import { 
  Camera, Award, ShoppingCart, BookOpen, TrendingUp, Shield, 
  Zap, Truck, Database, Globe 
} from 'lucide-react';

const EWasteManagementWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    address: '',
    deviceType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return (
          <div className="p-6 bg-green-50">
            <div className="grid md:grid-cols-3 gap-6">
              {/* AI Waste Identification */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <Camera className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">AI-Powered Waste Identification</h3>
                <p>Scan electronic items to identify e-waste</p>
                <p>AI suggests recycling, repair, or donation options</p>
              </div>

              {/* Pickup Scheduling */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <Truck className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">E-Waste Pickup</h3>
                <form>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Enter Address" 
                    className="w-full p-2 border rounded mb-2"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <select 
                    name="deviceType"
                    className="w-full p-2 border rounded"
                    value={formData.deviceType}
                    onChange={handleInputChange}
                  >
                    <option>Select Device Type</option>
                    <option>Smartphone</option>
                    <option>Laptop</option>
                    <option>Other Electronics</option>
                  </select>
                  <button className="w-full bg-green-600 text-white p-2 rounded mt-2">
                    Schedule Pickup
                  </button>
                </form>
              </div>

              {/* Rewards Program */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <Award className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Rewards & Incentives</h3>
                <p>Earn points for recycling</p>
                <p>Redeem for discounts, vouchers, eco-friendly products</p>
              </div>
            </div>

            {/* Additional Features Section */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Donation Feature */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <ShoppingCart className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Donation & Eco-Marketplace</h3>
                <p>Donate functional electronics to charities</p>
                <p>Buy and sell refurbished electronics</p>
              </div>

              {/* Education Module */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <BookOpen className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Education & Awareness</h3>
                <p>Gamified learning modules</p>
                <p>Interactive quizzes on e-waste management</p>
              </div>
            </div>
          </div>
        );
      case 'impact':
        return (
          <div className="p-6 bg-green-50">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Environmental Impact */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <TrendingUp className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Environmental Benefits</h3>
                <ul className="list-disc pl-5">
                  <li>Reduces e-waste in landfills</li>
                  <li>Prevents hazardous chemical pollution</li>
                  <li>Conserves raw material resources</li>
                </ul>
              </div>

              {/* Social Impact */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <Shield className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Social Responsibility</h3>
                <ul className="list-disc pl-5">
                  <li>Supports underserved communities</li>
                  <li>Creates jobs in recycling sector</li>
                  <li>Promotes circular economy</li>
                </ul>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Blockchain Tracking */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <Database className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Blockchain E-Waste Tracking</h3>
                <p>Transparent tracking from generation to disposal</p>
                <p>Ensures accountability in supply chain</p>
              </div>

              {/* Compliance Management */}
              <div className="bg-white p-5 rounded-xl shadow-md">
                <Globe className="text-green-600 mb-3" size={48} />
                <h3 className="font-bold text-green-900 mb-2">Regulatory Compliance</h3>
                <p>Track e-waste regulations</p>
                <p>Manage Extended Producer Responsibility</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="mr-2" size={24} />
            <span className="text-xl font-bold">GreenCycle</span>
          </div>
          <div className="space-x-4">
            {['home', 'impact'].map(section => (
              <button 
                key={section}
                onClick={() => setActiveSection(section)} 
                className={`px-4 py-2 rounded-full ${
                  activeSection === section 
                    ? 'bg-green-700' 
                    : 'hover:bg-green-700'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto">
        {renderContent()}
      </main>
      
      <footer className="bg-green-600 text-white p-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>How It Works</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul>
              <li>E-Waste Guide</li>
              <li>Community Forum</li>
              <li>Learning Center</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <ul>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Partnership</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          © 2025 GreenCycle | Sustainable Technology Solutions
        </div>
      </footer>
    </div>
  );
};

export default EWasteManagementWebsite;