import "./App.css";
import Carousel, { CarouselItem } from "./components/Carousel";
import slide1 from "../src/img/img1.jpg";
import slide2 from "../src/img/img2.jpg";
import slide3 from "../src/img/img3.webp";

function App() {
  return (
    <div className="App">
      <Carousel>
        <CarouselItem>
          <img src={slide1} alt="" width={"100%"} />
        </CarouselItem>
        <CarouselItem>
          <img src={slide2} alt="" width={"100%"} />
        </CarouselItem>
        <CarouselItem>
          <img src={slide3} alt="" width={"100%"} />
        </CarouselItem>
        <CarouselItem>
          <img src={slide3} alt="" width={"100%"} />
        </CarouselItem>
        <CarouselItem>
          <img src={slide3} alt="" width={"100%"} />
        </CarouselItem>
        <CarouselItem>
          <img src={slide3} alt="" width={"100%"} />
        </CarouselItem>
      </Carousel>
    </div>
  );
}

export default App;
