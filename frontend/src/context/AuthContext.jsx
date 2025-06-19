import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Load user profile
  const loadUser = async () => {
    try {
      const response = await authAPI.getProfile();
      dispatch({ type: 'SET_USER', payload: response.data.user });
    } catch (error) {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.register(userData);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      dispatch({ type: 'SET_TOKEN', payload: token });
      dispatch({ type: 'SET_USER', payload: user });
      
      toast.success('Registration successful! Welcome aboard! 🎉');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.login(credentials);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      dispatch({ type: 'SET_TOKEN', payload: token });
      dispatch({ type: 'SET_USER', payload: user });
      
      toast.success(`Welcome back, ${user.name}! 🚴‍♂️`);
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully! 👋');
  };

  // Update profile
  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      dispatch({ type: 'UPDATE_USER', payload: response.data.user });
      toast.success('Profile updated successfully! ✨');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  // Add to wishlist
  const addToWishlist = async (bicycleId) => {
    try {
      await authAPI.addToWishlist(bicycleId);
      dispatch({ 
        type: 'UPDATE_USER', 
        payload: { wishlist: [...state.user.wishlist, bicycleId] } 
      });
      toast.success('Added to wishlist! ❤️');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (bicycleId) => {
    try {
      await authAPI.removeFromWishlist(bicycleId);
      dispatch({ 
        type: 'UPDATE_USER', 
        payload: { 
          wishlist: state.user.wishlist.filter(id => id !== bicycleId) 
        } 
      });
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const value = {
    ...state,
    register,
    login,
    logout,
    updateProfile,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};