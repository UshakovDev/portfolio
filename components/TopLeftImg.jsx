import Image from "next/image";
import { useRouter } from "next/router";

const TopLeftImg = () => {
  const router = useRouter();
  const isAbout = router?.pathname?.startsWith("/about");
  const blendClass = isAbout ? "mix-blend-screen" : "mix-blend-color-dodge";
  return (
    <div className={`absolute left-0 top-0 ${blendClass} z-10 w-[200px] xl:w-[400px] opacity-50 pointer-events-none select-none`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/top-left-img.png`}
        alt="left cover bg"
        width={400}
        height={400}
      />
    </div>
  );
};

export default TopLeftImg;
