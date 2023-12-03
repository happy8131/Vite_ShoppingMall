import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map((image: string) => (
        <div key={image}>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image}
            className="w-full max-h-[150px]"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
