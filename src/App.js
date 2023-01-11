import "./App.css";
import Carousel, { CarouselItem } from "./components/Carousel";
import slide1 from "../src/img/img1.jpg";
import slide2 from "../src/img/img2.jpg";
import slide3 from "../src/img/img3.webp";

function App() {
  const items = [slide1, slide2, slide3, slide1, slide3, slide3, slide3];

  return (
    <div className="App">
      <Carousel _data={items}>
        {items.map((i, _i) => (
          <CarouselItem>
            <img src={i} alt="" key={i} width={"100%"} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
