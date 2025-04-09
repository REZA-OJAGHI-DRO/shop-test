import React, { useEffect, useState } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageIsLoading, setImageIsLoading] = useState(true);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${
        imageIsLoading
          ? "relative animate-shimmer bg-gradient-to-r from-[#efefef]/50 from-40% via-[#d3d3d3]/50 via-55% to-[#efefef]/50 to-90% bg-[length:400%_100%]"
          : ""
      }`}
      onLoad={() => setImageIsLoading(false)}
      onError={() => setImageSrc("/assets/icons/image.svg")}
    />
  );
};

export default CustomImage;
