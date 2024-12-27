function Footer() {
  const time = new Date().getFullYear();

  return (
    <div className="absolute bottom-0 py-7 max-md:pt-5 mx-11 text-center text-white">
      <h1 className="text-[15px] text-gray-400">
        &copy; {time} | Built with 💖 by mr_bob.
      </h1>
    </div>
  );
}

export default Footer;
