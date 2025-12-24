import Image from "next/image";
import { logoIconsList, type LogoIcon as LogoIconType } from "@/constants";

const LogoIcon = ({ icon }: { icon: LogoIconType }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <Image
        src={icon.imgPath}
        alt="Company Logo"
        width={160}
        height={80}
        className="object-contain"
      />
    </div>
  );
}

export default function LogoSection() {
  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />
      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`logo-1-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`logo-2-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}