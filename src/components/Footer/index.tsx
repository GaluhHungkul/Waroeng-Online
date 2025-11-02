"use client";

import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import Link from "next/link";
import WaroengLogo from "../common/WaroengLogo";
import { usePathname } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  const pathname = usePathname()

  const disabledFooter = ["/login", "/register"]

  if(disabledFooter.includes(pathname)) return null

  return (
    <footer className="text-gray-500 font-semibold mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <WaroengLogo />
          <p className="text-sm leading-relaxed mt-4">
            Temukan produk terbaik dengan harga terjangkau. Kami berkomitmen
            memberikan pengalaman belanja yang nyaman dan aman untuk Anda.
          </p>
        </div>

        <div className="md:ml-16">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Belanja</h3>
          <ul className="space-y-2 text-sm grid grid-cols-2 md:grid-cols-1 ">
            <li><Link href="#" className="hover:text-primary-orange">Semua Produk</Link></li>
            <li><Link href="#" className="hover:text-primary-orange">Promo</Link></li>
            <li><Link href="#" className="hover:text-primary-orange">Kategori</Link></li>
            <li><Link href="#" className="hover:text-primary-orange">Produk Baru</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Perusahaan</h3>
          <ul className="space-y-2 text-sm grid grid-cols-2 md:grid-cols-1">
            <li><Link href="#" className="hover:text-primary-orange">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-primary-orange">Kontak</Link></li>
            <li><Link href="#" className="hover:text-primary-orange">Kebijakan Privasi</Link></li>
            <li><Link href="#" className="hover:text-primary-orange">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Ikuti Kami</h3>
          <div className="flex space-x-4 text-xl">
            <Link href="#" className="hover:text-primary-orange" aria-label="Facebook">
              <Facebook size={22} />
            </Link>
            <Link href="#" className="hover:text-primary-orange" aria-label="Instagram">
              <Instagram size={22} />
            </Link>
            <Link href="#" className="hover:text-primary-orange" aria-label="Twitter">
              <Twitter size={22} />
            </Link>
            <Link href="#" className="hover:text-primary-orange" aria-label="Github">
              <Github size={22} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-800">
        <p>© {year} WaroengOnline. Semua hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
