import React, { PropTypes, Component } from "react";
import { Carousel, CarouselItem } from 'react-bootstrap';

class ProductCarousel extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired
  }

  render() {
    const { images } = this.props.product;
    return (
      <Carousel>
        <CarouselItem>
          <img className='.img-responsive' width={900} height={500} alt='900x500' src={images[0]}/>
          <div className='carousel-caption'>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img className='.img-responsive' width={900} height={500} alt='900x500' src={images[1]}/>
          <div className='carousel-caption'>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img className='.img-responsive' width={900} height={500} alt='900x500' src={images[2]}/>
          <div className='carousel-caption'>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
        </CarouselItem>
      </Carousel>
    );
  }
}

export default ProductCarousel;
