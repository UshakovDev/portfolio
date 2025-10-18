import Image from "next/image";
import { useRouter } from "next/router";

const Circles = () => {
  const router = useRouter();
  const needsFixed = router?.pathname?.startsWith("/about") || router?.pathname?.startsWith("/privacy");
  const posClass = needsFixed ? "fixed" : "absolute";
  
  return (
    <div className={`w-[200px] xl:w-[300px] ${posClass} -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/circles.png`}
        alt="circles"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </div>
  );
};

export default Circles;
