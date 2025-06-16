
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import ProductListingPage from '@/components/ProductListingPage';
import ProductDetailPage from '@/components/ProductDetailPage';
import CartPage from '@/components/CartPage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  supplier: string;
  quantity: number;
  margin: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleViewChange = (view: string, productId?: string) => {
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const handleAddToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevItems, {
          ...product,
          quantity: product.quantity || 1,
          margin: 45 // Default margin
        }];
      }
    });
    
    // Show success notification (you could add a toast here)
    console.log('Product added to cart:', product.name);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleUpdateMargin = (id: string, margin: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, margin } : item
      )
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={handleViewChange} onAddToCart={handleAddToCart} />;
      case 'products':
        return <ProductListingPage onViewChange={handleViewChange} onAddToCart={handleAddToCart} />;
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetailPage 
            productId={selectedProductId} 
            onViewChange={handleViewChange} 
            onAddToCart={handleAddToCart}
          />
        ) : <HomePage onViewChange={handleViewChange} onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <CartPage 
            cartItems={cartItems}
            onViewChange={handleViewChange}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onUpdateMargin={handleUpdateMargin}
          />
        );
      default:
        return <HomePage onViewChange={handleViewChange} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Navigation 
          currentView={currentView} 
          onViewChange={handleViewChange}
          cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        />
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default Index;
