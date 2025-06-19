// frontend/src/components/layout/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>© {new Date().getFullYear()} CycleShowcase. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Built with the MERN Stack & ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
