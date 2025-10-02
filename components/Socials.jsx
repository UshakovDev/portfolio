import Link from "next/link";

import {
  RiInstagramLine,
  RiGithubLine,
  RiTelegramLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/ushakovdima96?igsh=MTk5bzU2bnN4ZXFhMQ%3D%3D&utm_source=qr",
    Icon: RiInstagramLine,
  },
  {
    name: "Telegram",
    link: "https://t.me/user_four",
    Icon: RiTelegramLine,
  },
  {
    name: "Github",
    link: "https://github.com/UshakovDev",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[5px] hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon 
            aria-hidden 
            className={social.name === "Github" ? "hover:text-black transition-all duration-300" : ""}
          />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
