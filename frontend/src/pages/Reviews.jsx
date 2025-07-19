import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, ThumbsUp, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (testimonials.length === 0) return 0;
    const total = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return (total / testimonials.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-8">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Unable to Load Reviews</h1>
            <p className="text-red-300 mb-6">{error}</p>
            <button 
              onClick={fetchTestimonials}
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">
            Hear From Our Satisfied Clients
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Your satisfaction is my priority. Read what happy customers have to say about their experience.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{calculateAverageRating()}</div>
              <div className="flex items-center justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(calculateAverageRating()) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                ))}
              </div>
              <div className="text-gray-400 text-sm mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{testimonials.length}</div>
              <div className="text-gray-400 text-sm mt-1">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-6">No reviews available yet.</p>
            <p className="text-white">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedReview(selectedReview === index ? null : index)}
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                  ))}
                  <span className="ml-2 text-gray-400 text-sm">{testimonial.rating}.0</span>
                </div>

                {/* Quote */}
                <blockquote className="text-white text-lg mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-500/30 flex items-center justify-center">
                        <span className="text-yellow-500 font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="ml-4">
                      <p className="text-yellow-500 font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">Verified Customer</p>
                    </div>
                  </div>
                  
                  {/* Interaction Icons */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">12</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedReview === index && (
                  <div className="mt-6 pt-6 border-t border-gray-800 animate-in slide-in-from-top duration-300">
                    <div className="text-gray-300 text-sm space-y-2">
                      {testimonial.car_purchased && (
                        <p><span className="text-yellow-500 font-semibold">Purchase:</span> {testimonial.car_purchased}</p>
                      )}
                      {testimonial.purchase_date && (
                        <p><span className="text-yellow-500 font-semibold">Date:</span> {new Date(testimonial.purchase_date).toLocaleDateString()}</p>
                      )}
                      <p><span className="text-yellow-500 font-semibold">Service Rating:</span> Exceptional</p>
                      <p><span className="text-yellow-500 font-semibold">Review Date:</span> {new Date(testimonial.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Share Your Experience
          </h3>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            Had a great experience? We'd love to hear from you! Your feedback helps us continue providing excellent service.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="inline-flex items-center px-8 py-4 bg-gray-400 text-black font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;