const socialLinks = [
  {
    href: "https://github.com/yourusername",
    src: "https://img.icons8.com/?size=100&id=16318&format=png&color=000000",
    alt: "GitHub",
  },
  {
    href: "https://linkedin.com/in/yourusername",
    src: "https://img.icons8.com/?size=100&id=13930&format=png&color=000000",
    alt: "LinkedIn",
  },
  {
    href: "https://twitter.com/yourusername",
    src: "https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000",
    alt: "Twitter",
  },
  {
    href: "https://facebook.com/yourusername",
    src: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
    alt: "Facebook",
  },
  {
    href: "https://instagram.com/yourusername",
    src: "https://img.icons8.com/?size=100&id=32323&format=png&color=000000",
    alt: "Instagram",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-7 text-gray-50">
      <div className="container mx-auto px-10">
        {/* First Div - Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl font-extrabold text-gray-50 mb-4">
              Dream Big, Explore Bigger
            </h1>
            <p className="text-gray-50 text-lg">
              "Empowering travelers worldwide to create their perfect journeys"
            </p>
          </div>

          {/* Second Div - Subscribe Section */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end mb-4 bg-white rounded-lg p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border-gray-300 rounded-lg mr-4"
              />
              <button className="px-6 py-2 bg-gray-950 text-white rounded-lg">
                Subscribe
              </button>
            </div>
            {/* Social Media Links */}
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map(({ href, src, alt }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <img src={src} alt={alt} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm w-full flex items-center justify-between">
          <div>
            <span>&copy; {currentYear} | Built with 💖 by mr_bob </span>
          </div>
          <div className="text-start">
            <span className="text-gray-50 text-sm">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
