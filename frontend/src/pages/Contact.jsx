import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { contactInfo } from '../data/mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data) {
        console.log('Contact form submitted successfully:', response.data);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ full_name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">
            Let's Connect
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Ready to find your perfect vehicle? Get in touch and let's start your automotive journey together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">Send a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-400">Message sent successfully! I'll get back to you within 24 hours.</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <span className="text-red-400">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-white font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell me about your ideal car or any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">{contactInfo.phone}</p>
                    <p className="text-gray-400 text-sm">Call or text anytime</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">{contactInfo.email}</p>
                    <p className="text-gray-400 text-sm">I'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Location</h3>
                    <p className="text-gray-300">{contactInfo.address}</p>
                    <p className="text-gray-400 text-sm">Visit our showroom</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Business Hours</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Monday - Friday</span>
                  <span className="text-gray-300">9 AM - 6 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Saturday</span>
                  <span className="text-gray-300">10 AM - 4 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Sunday</span>
                  <span className="text-gray-300">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-yellow-500 font-semibold">Available by appointment outside regular hours</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Follow Me</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center hover:bg-yellow-500/20 transition-colors group">
                  <Facebook className="h-6 w-6 text-gray-400 group-hover:text-yellow-500" />
                </a>
                <a href="#" className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center hover:bg-yellow-500/20 transition-colors group">
                  <Instagram className="h-6 w-6 text-gray-400 group-hover:text-yellow-500" />
                </a>
                <a href="#" className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center hover:bg-yellow-500/20 transition-colors group">
                  <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-yellow-500" />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Find Us</h2>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">Interactive Map</p>
                  <p className="text-gray-500 text-sm">Google Maps integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;