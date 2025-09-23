import { useState, useEffect } from "react";

export default function useImageDimensionsParser(url) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
    };
    image.src = url;
  }, [url]);

  return { width, height };
}

export { useImageDimensionsParser };
