import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { Carousel, CarouselItem, Grid, Row, Col } from 'react-bootstrap';

var debug = require("debug")("brightHomePage");

@connectToStores(["HometStore"], (context, props) =>
  ({displayProductMap: context.getStore("HometStore").get() })
)
class Home extends Component {
  static PropTypes = {
    displayProductMap: PropTypes.object
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const primaryDisplayProductMap = this.props.displayProductMap[true];
    const unPrimaryDisplayProductMap = this.props.displayProductMap[false];
  	debug('display products with true' + JSON.stringify(primaryDisplayProductMap));

    return (
      <Grid>
      	<Row>
       	  <Col>
      	    <h1> Bright Project </h1>
       	  </Col>
      	</Row>
      	<Row style={{ marginTop: '20px', marginBottom: '20px', height: '700px'}} >
      	  <Col style={{ display: 'table', width: 'auto', marginRight: 'auto', marginLeft: 'auto'}} >
      	    <Carousel>
      	      { primaryDisplayProductMap.map((displayProduct, index) => {
      	      	return (
      	      	  <CarouselItem key={index}>
      	      	  	<img className='.img-responsive' width='900px' height='700px' src={displayProduct.image}/>
      	      	  	<div className='carousel-caption'>
	                  <p>Click to see detail.</p>
	                </div>
      	      	  </CarouselItem>
      	      	)
      	      })}
      	    </Carousel>
      	  </Col>
      	</Row>
      	<Row style={{ marginTop: '20px', marginBottom: '40px', width: '900px' }} >
      	{ unPrimaryDisplayProductMap.map((displayProduct, index) => {
      		return (
	  			<Col xs={6} md={3} style={{ width: '200px', height:'100px'}} >
	  		      <div display='float'>
	                <img classNae='.img-responsive' width='100%'  height='100%' src={displayProduct.image} />
	              </div>
	            </Col>
      		)
      	})}
      	</Row>
      </Grid>
    );
  }
}

export default Home;
