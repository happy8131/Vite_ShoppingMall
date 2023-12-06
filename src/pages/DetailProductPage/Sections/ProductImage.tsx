import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      const img = [];

      product.images.map((imageName) => {
        return img.push({
          original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
        });
      });
      setImages(img);
    }
  }, [product]);
  return <ImageGallery items={images} />;
};

export default ProductImage;
