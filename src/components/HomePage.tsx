
import React from 'react';
import { Share, Cart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  supplier: string;
  rating: number;
}

interface HomePageProps {
  onViewChange: (view: string, productId?: string) => void;
  onAddToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewChange, onAddToCart }) => {
  const categories = [
    { name: 'Cyber Fashion', icon: '👕', gradient: 'bg-blue-gradient' },
    { name: 'Neural Tech', icon: '🧠', gradient: 'bg-purple-gradient' },
    { name: 'Holo Gadgets', icon: '📱', gradient: 'bg-pink-gradient' },
    { name: 'Quantum Home', icon: '🏠', gradient: 'bg-neon-gradient' },
    { name: 'Bio Enhancement', icon: '💊', gradient: 'bg-blue-gradient' },
    { name: 'Space Gear', icon: '🚀', gradient: 'bg-purple-gradient' }
  ];

  const trendingProducts: Product[] = [
    {
      id: '1',
      name: 'Neural Interface Headset',
      price: 299,
      originalPrice: 399,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      supplier: 'CyberTech Corp',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Holographic Display Module',
      price: 599,
      originalPrice: 799,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
      supplier: 'HoloVision Ltd',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Quantum Processing Unit',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      supplier: 'QuantumCore Inc',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Bio-Enhancement Capsules',
      price: 149,
      originalPrice: 199,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
      supplier: 'BioFuture Labs',
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl mb-8 h-96 cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20" />
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto p-8">
            <h1 className="holographic-text text-6xl font-cyber mb-4 animate-float">
              Welcome to the Future
            </h1>
            <p className="text-xl text-gray-300 font-neon mb-8">
              Experience next-generation shopping with AI-powered recommendations
            </p>
            <Button 
              className="neon-button text-lg px-8 py-4"
              onClick={() => onViewChange('products')}
            >
              Explore Products
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-cyber text-neon-blue mb-6 neon-glow">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className={`product-card cursor-pointer ${category.gradient} p-6 text-center`}
              onClick={() => onViewChange('products')}
            >
              <CardContent className="p-0">
                <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {category.icon}
                </div>
                <h3 className="font-neon font-semibold text-white">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-cyber text-neon-purple neon-glow">Trending Now</h2>
          <Button 
            variant="outline" 
            className="neon-button"
            onClick={() => onViewChange('products')}
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <Card key={product.id} className="product-card overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-neon-pink text-white px-2 py-1 rounded-full text-xs font-bold animate-neon-pulse">
                  -{product.discount}%
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 
                  className="font-neon font-semibold text-white mb-2 cursor-pointer hover:text-neon-blue transition-colors"
                  onClick={() => onViewChange('product-detail', product.id)}
                >
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{product.supplier}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-neon-green font-bold text-lg">₹{product.price}</span>
                    <span className="text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-300 text-sm">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 neon-button bg-neon-blue/20 hover:bg-neon-blue/30"
                    onClick={() => onAddToCart(product)}
                  >
                    <Cart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="neon-button px-3"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Flash Sale Banner */}
      <div className="glass-card p-8 text-center bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 animate-glow">
        <h2 className="text-4xl font-cyber text-neon-pink mb-4">⚡ Flash Sale Alert ⚡</h2>
        <p className="text-xl text-gray-300 font-neon mb-6">
          Up to 80% off on selected quantum gadgets - Limited time only!
        </p>
        <Button 
          className="neon-button bg-neon-pink/30 hover:bg-neon-pink/50 text-lg px-8 py-4"
          onClick={() => onViewChange('products')}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
