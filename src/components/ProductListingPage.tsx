
import React, { useState } from 'react';
import { Share, Cart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  supplier: string;
  rating: number;
  category: string;
}

interface ProductListingPageProps {
  onViewChange: (view: string, productId?: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({ onViewChange, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterCategory, setFilterCategory] = useState('all');

  const products: Product[] = [
    {
      id: '1',
      name: 'Neural Interface Headset',
      price: 299,
      originalPrice: 399,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      supplier: 'CyberTech Corp',
      rating: 4.8,
      category: 'tech'
    },
    {
      id: '2',
      name: 'Holographic Display Module',
      price: 599,
      originalPrice: 799,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
      supplier: 'HoloVision Ltd',
      rating: 4.9,
      category: 'tech'
    },
    {
      id: '3',
      name: 'Quantum Processing Unit',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      supplier: 'QuantumCore Inc',
      rating: 4.7,
      category: 'tech'
    },
    {
      id: '4',
      name: 'Bio-Enhancement Capsules',
      price: 149,
      originalPrice: 199,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
      supplier: 'BioFuture Labs',
      rating: 4.6,
      category: 'health'
    },
    {
      id: '5',
      name: 'Cyber Fashion Jacket',
      price: 199,
      originalPrice: 299,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      supplier: 'NeoFashion',
      rating: 4.5,
      category: 'fashion'
    },
    {
      id: '6',
      name: 'Smart Home Controller',
      price: 399,
      originalPrice: 499,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
      supplier: 'SmartFuture Inc',
      rating: 4.4,
      category: 'home'
    },
    {
      id: '7',
      name: 'AR Contact Lenses',
      price: 799,
      originalPrice: 999,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      supplier: 'VisionTech',
      rating: 4.8,
      category: 'tech'
    },
    {
      id: '8',
      name: 'Nano Health Monitor',
      price: 249,
      originalPrice: 349,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
      supplier: 'HealthTech Pro',
      rating: 4.6,
      category: 'health'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass-card p-6 mb-6">
        <h1 className="text-4xl font-cyber text-neon-blue mb-6 neon-glow">Future Products</h1>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cyber-gray/50 border-neon-blue/30 text-white"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48 bg-cyber-gray/50 border-neon-blue/30 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-gray border-neon-blue/30">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tech">Neural Tech</SelectItem>
              <SelectItem value="fashion">Cyber Fashion</SelectItem>
              <SelectItem value="health">Bio Enhancement</SelectItem>
              <SelectItem value="home">Quantum Home</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-cyber-gray/50 border-neon-blue/30 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-gray border-neon-blue/30">
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="discount">Best Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="product-card overflow-hidden">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => onViewChange('product-detail', product.id)}
              />
              <div className="absolute top-2 right-2 bg-neon-pink text-white px-2 py-1 rounded-full text-xs font-bold animate-neon-pulse">
                -{product.discount}%
              </div>
              <div className="absolute top-2 left-2 bg-neon-green/80 text-black px-2 py-1 rounded-full text-xs font-bold">
                ★ {product.rating}
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 
                className="font-neon font-semibold text-white mb-2 cursor-pointer hover:text-neon-blue transition-colors line-clamp-2"
                onClick={() => onViewChange('product-detail', product.id)}
              >
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{product.supplier}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green font-bold text-lg">₹{product.price}</span>
                  <span className="text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
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

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-neon text-gray-400 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
