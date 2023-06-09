import React, { useState, useRef, useEffect } from 'react';

import { CarouselButton, CarouselButtonDot, CarouselButtons, CarouselContainer, CarouselItem, CarouselItemImg, CarouselItemText, CarouselItemTitle, CarouselMobileScrollNode } from './TimeLineStyles';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { TimeLineData } from '../../constants/constants';

const TOTAL_CAROUSEL_COUNT = TimeLineData.length;

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();

  const scroll = (node, left) => {
    return node.scrollTo({ left, behavior: 'smooth' });
  }

  const handleClick = (e, i) => {
    e.preventDefault();

    if (carouselRef.current) {
      const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length));
      
      scroll(carouselRef.current, scrollLeft);
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round((carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) * TimeLineData.length);

      setActiveItem(index);
    }
  }

  // snap back to beginning of scroll when window is resized
  // avoids a bug where content is covered up if coming from smaller screen
  useEffect(() => {
    const handleResize = () => {
      scroll(carouselRef.current, 0);
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Section id="about">
      <SectionDivider />
      <SectionTitle>About Me</SectionTitle>
      <SectionText>
        I am a software engineer. I have a passion for building things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences.
      </SectionText>
        { <CarouselContainer ref={carouselRef} onScroll={handleScroll}>
          <>
            {TimeLineData.map((item, index) => (
              <CarouselMobileScrollNode key={index} final={index === TOTAL_CAROUSEL_COUNT - 1}>
                <CarouselItem
                  index={index}
                  id={`carousel__item-${index}`}
                  active={activeItem}
                  onClick={(e) => handleClick(e, index)}
                >
                  <CarouselItemTitle>
                    {item.year}
                    <CarouselItemImg
                      width="208"
                      height="6"
                      viewBox="0 0 208 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.41061e-07 3C3.41061e-07 4.10457 0.895431 5 2 5H206C207.104 5 208 4.10457 208 3C208 1.89543 207.104 1 206 1H2C0.895431 1 3.41061e-07 1.89543 3.41061e-07 3Z"
                        fill="url(#paint0_linear)"
                        fill-opacity="0.33"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="104"
                          y1="0"
                          x2="104"
                          y2="6"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FEFEFE" />
                          <stop offset="1" stop-color="#FEFEFE" stop-opacity="0" />
                        </linearGradient>
                      </defs>
                    </CarouselItemImg>
                  </CarouselItemTitle>
                  <CarouselItemText>{item.text}</CarouselItemText>
                </CarouselItem>
              </CarouselMobileScrollNode>
            ))}
          </>
        </CarouselContainer> }
        <CarouselButtons>
          {TimeLineData.map((item, index) => (
            <CarouselButton
              key={index}
              index={index}
              active={activeItem}
              onClick={(e) => handleClick(e, index)}
              type="button"
            >
              <CarouselButtonDot active={activeItem} />
            </CarouselButton>
          ))}
        </CarouselButtons>
    </Section>

  );
};

export default Timeline;
