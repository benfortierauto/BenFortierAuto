import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, CheckCircle } from 'lucide-react';
import { testimonials, heroImages } from '../data/mock';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${heroImages.main})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-yellow-500 leading-tight">
            Drive Your Dreams: <br />
            <span className="text-white">Personalized Automotive Solutions</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed">
            Your dedicated car sales expert, committed to finding your perfect vehicle with transparency and unparalleled service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/new-cars"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 group"
            >
              Browse New Cars
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/used-cars"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold rounded-lg hover:bg-gray-400 hover:text-black transition-all duration-300 group"
            >
              Browse Used Cars
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/reviews"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold rounded-lg hover:bg-gray-400 hover:text-black transition-all duration-300 group"
            >
              Read Reviews
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-6">
              Your Journey, My Commitment
            </h2>
            <p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
              Navigating the automotive market can be complex. I offer a simplified, transparent, and enjoyable car-buying experience, tailored to your unique needs. Discover why clients trust me to deliver excellence.
            </p>
          </div>

          {/* Stats/Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-2">500+ Happy Clients</h3>
              <p className="text-gray-300">Building lasting relationships through exceptional service</p>
            </div>

            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-2">12+ Years Experience</h3>
              <p className="text-gray-300">Deep expertise in luxury and performance vehicles</p>
            </div>

            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-2">100% Satisfaction</h3>
              <p className="text-gray-300">No-pressure approach with transparent pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-white">
              Real experiences from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-white text-lg mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors group"
            >
              Read All Reviews
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-white mb-10 leading-relaxed">
            Let's start your journey to finding the ideal vehicle that matches your lifestyle and budget.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-10 py-5 bg-yellow-500 text-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl group"
          >
            Get Started Today
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;