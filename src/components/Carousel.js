import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useDrag } from "react-use-gesture";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item active" style={{ width: width }}>
      {children}
    </div>
  );
};

// main controller

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [totalDrag, setTotalDrag] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    setTotalDrag(0);
    setDragX(0);
  };

  // add zoom effect
  // const carouselRef = useRef(null);
  // useEffect(() => {
  //   const activeSlide = carouselRef.current.querySelector(
  //     `.carousel-item:nth-child(${activeIndex + 1})`
  //   );
  //   const slides = carouselRef.current.querySelectorAll(".carousel-item");
  //   // Removing class from all slides
  //   slides.forEach((slide) => slide.classList.remove("zoomed"));
  //   // Adding class to active slide
  //   activeSlide.classList.add("zoomed");
  // }, [activeIndex]);
  // set interval with useEffect

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  // use dragable
  const bind = useDrag(
    ({ offset: [x] }) => {
      if (x !== 0) {
        setDragX((prevX) => prevX + x);
        setTotalDrag((prevTotal) => prevTotal + x);
      }
    },
    {
      drag: ({ offset: [x] }) => setDragX(x),
      end: ({ offset: [x], velocity }) => {
        const width = document.querySelector(".carousel-item").offsetWidth;
        if (totalDrag > width / 2 || velocity > 0.25) {
          updateIndex(activeIndex + 1);
        } else if (totalDrag < -width / 2 || velocity < -0.25) {
          updateIndex(activeIndex - 1);
        } else {
          updateIndex(activeIndex);
        }
      },
    }
  );

  //   use swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...bind()}
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // for Zoom effect add carousel
      // ref={carouselRef}
    >
      <div
        className="inner carousel-content"
        // activeIndex=widht is adjustable we can change it
        style={{
          transform: `translateX(${dragX - activeIndex * 100}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => {
          // widht is adjustable we can change it
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
