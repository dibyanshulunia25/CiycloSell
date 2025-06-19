# 🚲 CycleShowcase - Full-Stack MERN Bicycle E-Commerce Platform

Welcome to CycleShowcase! This is a complete, full-stack e-commerce web application built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js). It features a beautiful, animated frontend for customers and a secure, functional admin dashboard for managing inventory and orders.

**Live Demo:** [Link to your deployed Vercel frontend]

![CycleShowcase Homepage](<link_to_your_homepage_screenshot.png>)
_Note: Replace the image link above with a screenshot of your deployed application._

## ✨ Features

### Customer-Facing Features
- **Stunning UI/UX**: Modern design with smooth animations, gradient effects, and a fully responsive layout.
- **Product Showcase**: Browse a collection of bicycles with high-quality images.
- **Advanced Filtering & Search**: Easily find products by category, brand, price range, or name.
- **Detailed Product Pages**: View comprehensive details, specifications, and images for each bicycle.
- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Wishlist**: Authenticated users can add or remove bicycles from their personal wishlist.
- **Shopping Cart**: A fully persistent shopping cart to add/remove items.
- **Secure Payments**: Integrated with **Razorpay** to accept card and UPI payments securely.
- **User Profile**: Users can view their order history and update their personal information.

### Admin Features
- **Secure Admin Panel**: A protected route `/admin/dashboard` accessible only to users with an 'admin' role.
- **Inventory Management (CRUD)**: Admins can Create, Read, Update, and Delete bicycles from the inventory.
- **Order Management**: (Future feature) Admins can view all user orders and update their delivery status.

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing product, user, and order data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT (jsonwebtoken)**: For secure user authentication.
- **bcryptjs**: For hashing user passwords.
- **Razorpay**: For payment processing.
- **CORS**, **dotenv**

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for a blazing fast development experience.
- **React Router**: For client-side routing.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: For beautiful and performant animations.
- **Axios**: For making HTTP requests to the backend API.
- **React Context API**: For global state management (Auth, Cart).
- **Lucide React**: Beautiful and consistent icons.
- **react-hot-toast**: For user-friendly notifications.

### Deployment
- **Backend**: Deployed on **Render**.
- **Frontend**: Deployed on **Vercel**.
- **Database**: Hosted on **MongoDB Atlas**.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local installation or a free MongoDB Atlas account)
- Git

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bicycle-showcase.git
    cd bicycle-showcase
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following environment variables. Generate your own strong keys.

    ```env
    MONGODB_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=generate_a_strong_random_string_here
    NODE_ENV=development
    PORT=5000

    # Razorpay Keys (get from Razorpay Dashboard)
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env.local` file in the `frontend` directory and add the following:

    ```env
    # This points to your local backend server
    VITE_API_URL=http://localhost:5000

    # Your public Razorpay Key ID
    VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
    ```

4.  **Seed the Database (Optional but Recommended):**
    The backend includes a script to populate your database with sample bicycle and user data.
    ```bash
    cd ../backend
    node seedData.js
    ```
    This will create several sample bicycles and two users:
    - **Admin:** `admin@bicycleshowcase.com` / `admin123`
    - **User:** `john@example.com` / `user123`

### Running the Application

You will need to run the backend and frontend servers in two separate terminals.

- **Run the Backend Server:**
  ```bash
  # From the /backend directory
  npm run dev
