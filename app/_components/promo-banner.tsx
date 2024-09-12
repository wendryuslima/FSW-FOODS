import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      height={0}
      width={0}
      className=" min-w-[75%] items-center justify-center p-3"
      sizes="100vw"
      quality={100}
      {...props}
      alt="banner"
    />
  );
};

export default PromoBanner;
