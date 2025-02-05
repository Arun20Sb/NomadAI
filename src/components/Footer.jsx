import { Github, Linkedin, Twitter, Heart, Globe } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 text-white absolute z-20 bottom-0 w-full h-[80px]">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            <Linkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            className="hover:text-blue-400 transition-colors"
          >
            <Twitter />
          </a>
        </div>

        <div className="text-center flex items-center gap-2">
          <span>&copy; {currentYear} | Built with</span>
          <Heart className="text-red-500 animate-pulse" fill="currentColor" />
          <span>by Mr_Bob</span>
        </div>

        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Globe className="text-green-400" />
          <span className="text-sm text-gray-400">Global Innovators</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
