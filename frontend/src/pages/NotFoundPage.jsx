// frontend/src/pages/NotFoundPage.jsx

import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20 animate-fade-in">
      <AlertTriangle className="mx-auto h-16 w-16 text-accent-500" />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page Not Found</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10">
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;