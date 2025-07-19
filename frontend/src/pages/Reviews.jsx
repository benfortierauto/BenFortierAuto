import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { testimonials } from '../data/mock';

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);

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
              <div className="text-3xl font-bold text-yellow-500">4.9</div>
              <div className="flex items-center justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
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
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
                <span className="ml-2 text-gray-400 text-sm">5.0</span>
              </div>

              {/* Quote */}
              <blockquote className="text-white text-lg mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                  />
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
                    <p><span className="text-yellow-500 font-semibold">Purchase:</span> 2024 BMW X5</p>
                    <p><span className="text-yellow-500 font-semibold">Date:</span> March 2024</p>
                    <p><span className="text-yellow-500 font-semibold">Service Rating:</span> Exceptional</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Share Your Experience
          </h3>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            Had a great experience? We'd love to hear from you! Your feedback helps us continue providing excellent service.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gray-400 text-black font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;