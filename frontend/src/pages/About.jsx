import React from 'react';
import { Award, Users, CheckCircle, Heart, Shield, Trophy } from 'lucide-react';
import { aboutInfo } from '../data/mock';

const About = () => {
  const achievements = [
    { icon: Users, title: "500+ Happy Clients", description: "Building lasting relationships" },
    { icon: Award, title: "Top Sales Professional", description: "Excellence in automotive sales" },
    { icon: Shield, title: "Certified Expert", description: "Continuous professional development" },
    { icon: Trophy, title: "Industry Recognition", description: "Awards for outstanding service" }
  ];

  const values = [
    {
      title: "Integrity",
      description: "Honest, transparent dealings in every transaction",
      icon: CheckCircle
    },
    {
      title: "Transparency", 
      description: "No hidden fees, clear communication throughout",
      icon: Shield
    },
    {
      title: "Excellence",
      description: "Exceeding expectations with personalized service",
      icon: Trophy
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">
            Your Journey, My Expertise
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src={aboutInfo.image}
                alt={aboutInfo.name}
                className="w-80 h-80 rounded-2xl object-cover border-4 border-yellow-500/20 shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
                {aboutInfo.yearsExperience} Years Experience
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-yellow-500 mb-4">
                Meet {aboutInfo.name}
              </h2>
              <p className="text-white text-lg leading-relaxed">
                {aboutInfo.bio}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-yellow-500">500+</div>
                <div className="text-gray-300 text-sm">Cars Sold</div>
              </div>
              <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-yellow-500">98%</div>
                <div className="text-gray-300 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-yellow-500">12+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-yellow-500">24/7</div>
                <div className="text-gray-300 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">My Philosophy</h2>
            <p className="text-xl text-white">{aboutInfo.philosophy}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">Achievements & Recognition</h2>
            <p className="text-white">Awards and milestones that reflect my commitment to excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h4 className="font-semibold text-yellow-500 mb-2">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            Let's find your perfect vehicle. I'm here to guide you through every step of the process with expertise and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <Heart className="mr-2 h-5 w-5" />
              Get in Touch
            </a>
            <a 
              href="/new-cars"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold rounded-lg hover:bg-gray-400 hover:text-black transition-colors"
            >
              View Inventory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;