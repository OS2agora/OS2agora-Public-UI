import { useAppConfigContext } from "./useAppConfig";
import { ThemeImages, images } from "../assets/images/images";
import React from "react";

function useImages() {
  const appContext = useAppConfigContext();
  const [themeImages, setThemeImages] = React.useState<ThemeImages | null>(null);

  React.useEffect(() => {
    const imagePath = `/images/${appContext?.theme}`;

    function getImage(image): string {
      return !image.value ? image.default : image.value;
    }

    function getImages() {
      const outputImages = {};
      Object.entries(images).forEach(([key, value]) => {
        const image = getImage(value);
        outputImages[key] = image ? `${imagePath}/${image}` : null;
      });

      setThemeImages(outputImages as ThemeImages);
    }

    getImages();
  }, [appContext?.theme]);

  return themeImages;
}

export { useImages };
