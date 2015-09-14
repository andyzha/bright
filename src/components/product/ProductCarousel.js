import React, { PropTypes, Component } from "react";
import { Carousel, CarouselItem } from 'react-bootstrap';

class ProductCarousel extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  render() {
    const { images } = this.props.product;
    return (
      <Carousel>
        {images.map(function(image, index){
          return (
            <CarouselItem>
              <img className='.img-responsive' width={900} height={500} alt='900x500' src={image}/>
              <div className='carousel-caption'>
                <h3>Image {index} label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </CarouselItem>
          )
        })}
      </Carousel>
    );
  }
}

export default ProductCarousel;
