import React from "react";
import { Link } from "react-router-dom";

interface ColoredImageProps {
  to: string;
  src: string;
  alt: string;
  backgroundColor: string;
}

const ColoredImage: React.FC<ColoredImageProps> = ({
  to,
  src,
  alt,
  backgroundColor,
}) => (
  <Link to={to}>
    <img src={src} alt={alt} style={{ backgroundColor: backgroundColor }} />
  </Link>
);

export default ColoredImage;
