import Link from "next/link";
import Image from "next/image";
import { socialImgs } from "../constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center items-center md:items-start">
          <Link href="/blog" className="hover:text-white transition-colors">
            Visit my blog
          </Link>
        </div>

        <div className="socials">
          {socialImgs.map((img) => (
            <a
              href={img.url}
              className="icon"
              target="_blank"
              rel="noopener noreferrer"
              key={img.name}
            >
              <Image
                src={img.imgPath}
                alt={img.name}
                width={24}
                height={24}
                className="max-w-6 h-auto"
              />
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} AbdelRahman Mohamad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}