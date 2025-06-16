
import React, { useState } from 'react';
import { User, Package, Cart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  cartCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="glass-card p-4 mb-6 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          className="holographic-text text-2xl cursor-pointer"
          onClick={() => onViewChange('home')}
        >
          PixelFuture
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue w-4 h-4" />
          <Input
            type="text"
            placeholder="Search futuristic products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-cyber-gray/50 border-neon-blue/30 text-white placeholder-gray-400 neon-glow"
          />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => onViewChange('products')}
            className={`neon-button ${currentView === 'products' ? 'bg-neon-blue/20' : ''}`}
          >
            <Package className="w-4 h-4 mr-2" />
            Products
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onViewChange('cart')}
            className={`neon-button relative ${currentView === 'cart' ? 'bg-neon-blue/20' : ''}`}
          >
            <Cart className="w-4 h-4 mr-2" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neon-pink text-xs rounded-full w-5 h-5 flex items-center justify-center animate-neon-pulse">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => onViewChange('profile')}
            className={`neon-button ${currentView === 'profile' ? 'bg-neon-blue/20' : ''}`}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
