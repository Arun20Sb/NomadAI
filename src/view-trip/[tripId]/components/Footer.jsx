function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-100">
          ✨ Explore. Plan. Enjoy. ✨
        </h2>
        <p className="text-sm text-gray-400">
          Your journey starts here. Let us make it unforgettable.
        </p>
        <div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Wanderlust | All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">Built with 💖 by mr_bob</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;