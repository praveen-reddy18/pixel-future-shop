
import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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

interface CartPageProps {
  cartItems: CartItem[];
  onViewChange: (view: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateMargin: (id: string, margin: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ 
  cartItems, 
  onViewChange, 
  onUpdateQuantity, 
  onRemoveItem,
  onUpdateMargin 
}) => {
  const [margins, setMargins] = useState<{ [key: string]: number }>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.margin || 45 }), {})
  );

  const updateMargin = (id: string, margin: number) => {
    setMargins(prev => ({ ...prev, [id]: margin }));
    onUpdateMargin(id, margin);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalMargin = () => {
    return cartItems.reduce((total, item) => {
      const margin = margins[item.id] || 45;
      return total + (item.price * item.quantity * margin / 100);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalMargin();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-float">🛒</div>
          <h2 className="text-3xl font-cyber text-neon-blue mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8 font-neon">Start adding some futuristic products!</p>
          <Button 
            className="neon-button text-lg px-8 py-4"
            onClick={() => onViewChange('products')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="neon-button"
            onClick={() => onViewChange('products')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <h1 className="text-4xl font-cyber text-neon-blue neon-glow">Shopping Cart</h1>
        </div>
        <div className="text-lg font-neon text-gray-300">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="glass-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-neon text-white mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.supplier}</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-neon-green font-bold text-lg">₹{item.price}</span>
                      <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                    </div>
                  </div>

                  {/* Margin Control */}
                  <div className="text-center">
                    <label className="text-neon-purple text-sm font-neon mb-2 block">
                      Margin (%)
                    </label>
                    <Input
                      type="number"
                      value={margins[item.id] || 45}
                      onChange={(e) => updateMargin(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center bg-cyber-gray/50 border-neon-purple/30 text-white"
                      min="0"
                      max="100"
                    />
                    <div className="text-xs text-neon-green mt-1">
                      +₹{Math.round(item.price * item.quantity * (margins[item.id] || 45) / 100)}
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <label className="text-gray-400 text-sm mb-2 block">Quantity</label>
                      <div className="flex items-center space-x-2 bg-cyber-gray/30 rounded-lg p-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 p-0 hover:bg-neon-blue/20"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 hover:bg-neon-blue/20"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Total & Remove */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-white mb-2">
                      ₹{(item.price * item.quantity) + Math.round(item.price * item.quantity * (margins[item.id] || 45) / 100)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="glass-card sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-cyber text-neon-purple mb-6 neon-glow">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                
                <div className="flex justify-between text-neon-green">
                  <span className="font-neon">Your Margin</span>
                  <span className="font-bold">₹{Math.round(calculateTotalMargin())}</span>
                </div>
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>₹{Math.round(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full neon-button bg-neon-blue/20 hover:bg-neon-blue/30 text-lg py-3"
                  onClick={() => onViewChange('checkout')}
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full neon-button"
                  onClick={() => onViewChange('products')}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Profit Breakdown */}
              <div className="mt-6 bg-neon-green/10 border border-neon-green/30 rounded-lg p-4">
                <h3 className="font-neon text-neon-green mb-2">💰 Profit Breakdown</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Product Cost:</span>
                    <span className="text-white">₹{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Earnings:</span>
                    <span className="text-neon-green font-bold">₹{Math.round(calculateTotalMargin())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
