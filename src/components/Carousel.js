import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

// main controller

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const setting = {
    dragSpeed: 1.25,
    itemWidth: 300,
    itemHeight: 180,
    itemSideOffsets: 15,
  };

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  // set interval with useEffect

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 5000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  //   use swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      {...setting}
      className="carousel"
      onMosueEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner carousel-content"
        // activeIndex=widht is adjustable we can change it
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
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
