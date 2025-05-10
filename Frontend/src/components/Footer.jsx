const Footer = () => {
  return (
    <footer className=" py-8 px-4 border-t border-black">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col  items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center ">
            <span>
              <img className="h-20 w-20 object-cover" src="Chattrix Logo.png" alt="" />
            </span>
            <span className="text-xl font-semibold">Chattrix</span>
          </div>
          <p className="max-w-xs text-sm text-gray-300">
            Empowering the web with clean code, creative designs, and modern tech.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Shaqib.dev. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
