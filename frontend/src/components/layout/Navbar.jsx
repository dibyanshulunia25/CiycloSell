// frontend/src/components/layout/Navbar.jsx

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Bike, LogOut, User, Wrench, ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 hover:text-primary-600 transition-colors ${isActive ? 'text-primary-600 font-bold' : 'text-gray-600'}`;

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient">
                    <Bike className="text-primary-500" />
                    CycleShowcase
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/bicycles" className={navLinkClass}>Bicycles</NavLink>
                    {user?.role === 'admin' && (
                        <NavLink to="/admin/dashboard" className={navLinkClass}>
                            <Wrench size={18} /> Admin
                        </NavLink>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <NavLink to="/cart" className={navLinkClass}>
                        <div className="relative">
                            <ShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </NavLink>
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile" className={navLinkClass}>
                                <User size={20} />
                                {user?.name}
                            </NavLink>
                            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="font-medium text-gray-600 hover:text-primary-600">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;