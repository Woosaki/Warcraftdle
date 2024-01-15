import React from "react";

interface ColoredImageProps {
  href: string;
  src: string;
  alt: string;
  backgroundColor: string;
}

const ColoredImage: React.FC<ColoredImageProps> = ({
  href,
  src,
  alt,
  backgroundColor,
}) => (
  <a href={href}>
    <img src={src} alt={alt} style={{ backgroundColor: backgroundColor }} />
  </a>
);

export default ColoredImage;
