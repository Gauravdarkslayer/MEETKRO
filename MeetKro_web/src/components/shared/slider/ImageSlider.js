import React, { Fragment } from 'react';
import styled from 'styled-components';


import i1 from '../../../images/meeting.jpg';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const ImageSlider = () => {
  return (
    <Fragment>
      <Carousel plugins={['arrows']}>
        <CarousalContainer>
          <ImageContainer src={i1} alt='' />
          <ImageContent>
            <h2>Get a link you can share</h2>
            <p>
              Click <strong>Schedule</strong> to book an appointment with admin.
              <br />
            </p>
           
          </ImageContent>
        </CarousalContainer>

        
      </Carousel>
    </Fragment>
  );
};

const ImageContainer = styled.img`
  width: 80%;
  height: auto;
  /* border: 1px solid black; */
`;

const ImageContent = styled.div`
  text-align: center;
  /* border: 1px solid black; */
  width: 100%;

  > h2 {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 2rem;
    margin-top: 12px;
  }

  > p {
    letter-spacing: 0.01428571em;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
  }

  > div > span {
    font-size: 3rem;
    margin: 0;
    padding: 0;
    line-height: 0;
  }
`;

const CarousalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
`;
export default ImageSlider;
