import { Link } from "react-router-dom"; // Import Link dari react-router-dom
import { BiGlobe, BiShareAlt } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-[#421C83] py-12 px-6 w-full relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-white text-center md:text-left">
          {/* Judul Zona Cerdas juga sekalian diarahkan ke Landing Page */}
          <Link to="/">
            <h2 className="font-['Quicksand'] font-bold text-2xl mb-1 hover:text-white/90 transition cursor-pointer">
              Zona Cerdas
            </h2>
          </Link>
          <p className="text-xs text-white/80">© 2024 Zona Cerdas. All rights reserved.</p>
        </div>
        
        {/* Mengubah tag <a> href="#" menjadi <Link> to="/" */}
        <div className="flex gap-8 text-white/80 text-base font-['Nunito_Sans']">
          <Link to="/" className="hover:text-white transition">Tentang Kami</Link>
          <Link to="/" className="hover:text-white transition">Bantuan</Link>
          <Link to="/" className="hover:text-white transition">Kebijakan Privasi</Link>
        </div>

        {/* Bagian Icon Button */}
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
            <BiGlobe className="text-white text-xl" />
          </button>
          <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
            <BiShareAlt className="text-white text-xl" />
          </button>
        </div>

      </div>
    </footer>
  );
}