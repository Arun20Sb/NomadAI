const companies = [
  {
    name: "Google",
    logo: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
  },
  {
    name: "Microsoft",
    logo: "https://img.icons8.com/?size=100&id=22989&format=png&color=000000",
  },
  {
    name: "Coinbase",
    logo: "https://img.icons8.com/?size=100&id=5qUJBPRD9xiI&format=png&color=000000",
  },
  {
    name: "Tesla",
    logo: "https://img.icons8.com/?size=100&id=34784&format=png&color=000000",
  },
  {
    name: "Netflix",
    logo: "https://img.icons8.com/?size=100&id=20519&format=png&color=000000",
  },
];

function Marquee() {
  return (
    <div className="relative w-full h-[150px] overflow-hidden py-3 max-md:hidden">
      <div className="flex gap-12 items-center h-full justify-evenly">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-6 py-3"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-12 w-12 object-contain opacity-50"
            />
            <span className="text-gray-400 text-lg font-semibold opacity-80 transition-opacity hover:opacity-100">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
