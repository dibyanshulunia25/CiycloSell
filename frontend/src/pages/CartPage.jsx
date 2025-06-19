// frontend/src/pages/CartPage.jsx

import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleCheckout = () => {
    // In a real app, this would go to a checkout page with shipping/payment forms.
    // For simplicity, we'll just log it and redirect.
    console.log("Proceeding to checkout with items:", cartItems);
    navigate('/login?redirect=/shipping'); // Placeholder for checkout flow
  };

  return (
    <div className="animate-slide-up">
      <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/bicycles" className="mt-4 inline-block btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.bicycle} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <Link to={`/bicycle/${item.bicycle}`} className="font-bold hover:underline">{item.name}</Link>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Quantity selector can be added here */}
                  <p>Qty: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.bicycle)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cartItems.length === 0} className="w-full btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;