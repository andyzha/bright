import React, { PropTypes, Component } from "react";
import { Carousel, CarouselItem } from 'react-bootstrap';

var debug = require("debug")("brightCarousel");

class ProductCarousel extends Component {
  static propTypes = {
    imageList: PropTypes.object.isRequired
  }

  render() {
    return (
      <Carousel>
        {this.props.imageList.map(function(image, index){
          return (
            <CarouselItem key={index}>
              <img className='.img-responsive' width='100%' alt='900x500' src={image}/>
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
