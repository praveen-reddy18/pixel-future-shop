
import React, { useState } from 'react';
import { Share, Cart, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductDetailPageProps {
  productId: string;
  onViewChange: (view: string) => void;
  onAddToCart: (product: any) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onViewChange, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app this would come from API
  const product = {
    id: productId,
    name: 'Neural Interface Headset Pro Max',
    price: 299,
    originalPrice: 399,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    ],
    supplier: 'CyberTech Corporation',
    rating: 4.8,
    reviewCount: 2847,
    description: 'Experience the future of human-computer interaction with our advanced Neural Interface Headset. This cutting-edge device uses quantum-enhanced neural pathways to provide seamless brain-to-device communication.',
    features: [
      'Quantum Neural Processing',
      'Bio-Compatible Materials',
      'Real-time Thought Translation',
      'AR/VR Integration',
      'Long-lasting Battery (48hrs)',
      'Wireless Charging'
    ],
    specifications: {
      'Processing Power': 'Quantum Core 3.0',
      'Neural Bandwidth': '10 THz',
      'Battery Life': '48 hours',
      'Charging': 'Wireless Quantum Charging',
      'Compatibility': 'Universal Neural Interface',
      'Weight': '285g'
    },
    deliveryTime: '2-3 days',
    margin: 45
  };

  const reviews = [
    {
      id: 1,
      user: 'Alex Cyber',
      rating: 5,
      comment: 'Absolutely mind-blowing! The neural connection is seamless.',
      date: '2024-01-15',
      helpful: 234
    },
    {
      id: 2,
      user: 'Neural Sarah',
      rating: 4,
      comment: 'Great product but takes some time to get used to.',
      date: '2024-01-10',
      helpful: 189
    },
    {
      id: 3,
      user: 'TechGuru99',
      rating: 5,
      comment: 'Best neural interface I\'ve ever used. Worth every penny!',
      date: '2024-01-08',
      helpful: 156
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="neon-button mb-6"
        onClick={() => onViewChange('products')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="glass-card overflow-hidden">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </Card>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index 
                    ? 'border-neon-blue shadow-lg shadow-neon-blue/30' 
                    : 'border-gray-600 hover:border-neon-blue/50'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-cyber text-white mb-2">{product.name}</h1>
            <p className="text-neon-blue font-neon">by {product.supplier}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white font-semibold">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-neon-green">₹{product.price}</span>
            <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
            <span className="bg-neon-pink text-white px-3 py-1 rounded-full font-bold animate-neon-pulse">
              -{product.discount}% OFF
            </span>
          </div>

          <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-neon-green">
              <Truck className="w-5 h-5" />
              <span className="font-neon">Fast Delivery: {product.deliveryTime}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-white font-neon">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="neon-button w-10 h-10"
                >
                  -
                </Button>
                <span className="w-12 text-center text-white font-bold">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="neon-button w-10 h-10"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                className="flex-1 neon-button bg-neon-blue/20 hover:bg-neon-blue/30 text-lg py-3"
                onClick={() => onAddToCart({ ...product, quantity })}
              >
                <Cart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="neon-button px-6"
              >
                <Share className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="glass-card p-4">
            <h3 className="text-neon-purple font-cyber mb-2">Reseller Margin</h3>
            <div className="text-2xl font-bold text-neon-green">
              ₹{Math.round(product.price * (product.margin / 100))} 
              <span className="text-sm text-gray-400 ml-2">({product.margin}% margin)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-cyber-gray/50">
              <TabsTrigger value="description" className="text-white data-[state=active]:bg-neon-blue/20">Description</TabsTrigger>
              <TabsTrigger value="features" className="text-white data-[state=active]:bg-neon-blue/20">Features</TabsTrigger>
              <TabsTrigger value="specs" className="text-white data-[state=active]:bg-neon-blue/20">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-neon-blue/20">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-neon-pulse" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-cyber-gray/30 rounded-lg">
                    <span className="text-neon-blue font-neon">{key}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-cyber-gray/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-neon-blue font-neon">{review.user}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <p className="text-gray-300 mb-2">{review.comment}</p>
                    <div className="text-sm text-gray-500">
                      {review.helpful} people found this helpful
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
