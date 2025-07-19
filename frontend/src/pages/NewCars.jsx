import React, { useState } from 'react';
import { Star, Eye, Heart, Filter, Search } from 'lucide-react';
import { newCars } from '../data/mock';

const NewCars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const filteredCars = newCars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'name') return a.brand.localeCompare(b.brand);
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'price') return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
    return 0;
  });

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">
            Discover Brand New Excellence
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Explore the latest models and cutting-edge automotive technology. Each new vehicle offers unparalleled performance and luxury.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by brand, model, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="name">Sort by Brand</option>
              <option value="year">Sort by Year</option>
              <option value="price">Sort by Price</option>
            </select>
            
            <button className="flex items-center px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white hover:border-yellow-500 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-400">
            Showing {sortedCars.length} of {newCars.length} vehicles
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sortedCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedCar(selectedCar === car.id ? null : car.id)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.year} ${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(car.id);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                      favorites.includes(car.id)
                        ? 'bg-yellow-500 text-black'
                        : 'bg-black/50 text-white hover:bg-yellow-500 hover:text-black'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  
                  <button className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm hover:bg-yellow-500 hover:text-black transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>

                {/* New Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    NEW {car.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-yellow-500 mb-1">
                    {car.year} {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-400 text-sm">{car.type}</p>
                </div>

                <p className="text-white mb-4 text-sm leading-relaxed">
                  {car.features}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-bold text-lg">
                    {car.price}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                    Inquire Now
                  </button>
                  <button className="px-4 py-2 bg-transparent border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                    View Details
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedCar === car.id && (
                  <div className="mt-6 pt-6 border-t border-gray-800 animate-in slide-in-from-top duration-300">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-yellow-500 font-semibold mb-2">Description</h4>
                        <p className="text-gray-300 text-sm">{car.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-yellow-500 font-semibold">Year:</span>
                          <span className="text-white ml-2">{car.year}</span>
                        </div>
                        <div>
                          <span className="text-yellow-500 font-semibold">Type:</span>
                          <span className="text-white ml-2">{car.type}</span>
                        </div>
                        <div>
                          <span className="text-yellow-500 font-semibold">Warranty:</span>
                          <span className="text-white ml-2">5 Years</span>
                        </div>
                        <div>
                          <span className="text-yellow-500 font-semibold">Financing:</span>
                          <span className="text-white ml-2">Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Ready to Drive Your Dream Car?
          </h3>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? I have access to a wide network of dealers and can help you find the perfect new vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
              Schedule Test Drive
            </button>
            <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold rounded-lg hover:bg-gray-400 hover:text-black transition-colors">
              Request Custom Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCars;