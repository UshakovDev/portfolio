import Image from "next/image";
import { useRouter } from "next/router";

const Circles = () => {
  const router = useRouter();
  const needsFixed = router?.pathname?.startsWith("/about") || router?.pathname?.startsWith("/privacy");
  const posClass = needsFixed ? "fixed" : "absolute";
  
  return (
    <div className={`w-[200px] xl:w-[300px] ${posClass} -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10 translate-z-0 will-change-transform pointer-events-none select-none ios-blend-fix`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/circles.png`}
        alt="circles"
        width={260}
        height={200}
        className="w-full h-full"
        style={{ WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      />
    </div>
  );
};

export default Circles;
