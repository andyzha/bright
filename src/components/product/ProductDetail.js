import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { Grid, Row, Col, Button } from 'react-bootstrap';

import ProductCarousel from "./ProductCarousel";

var debug = require("debug")("brightProductDetail");
// import { loadProduct } from "../actions/ProductActionCreator";

@connectToStores(["ProductStore"], (context, props) =>
  ({ product: context.getStore("ProductStore").get(props.id) })
)
class ProductDetail extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount() {
  }

  render() {
    debug('product result ' + JSON.stringify(this.props));
    const { product } = this.props;
    var ats = 5;

    return (
      <Grid>
        <Row className="" style={{ marginBottom: '25px'}} >
          <Col lg={12} md={4}>
            <h4>Hello Product page!</h4>
          </Col>
          <Col lg={6} md={4}>
            <NavLink
                key="product"
                routeName="product"
                navParams={{id: product.id}}>
                {product.name}
            </NavLink>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={8}>
            <ProductCarousel product={product}/>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px'}}>
          <Col lg={6} md={8}>
            <h1 className="name">{this.props.product.name}</h1>
            <p className="description">{this.props.product.description}</p>
          </Col>
          <Col lg={3} md={8}>
            <Row>
              <Col lg={12} md={8}>
                <select onChange={this.selectVariant}>
                  {this.props.product.variants.map(function(variant, index){
                    return (
                      <option key={index} value={index}>{variant.type}</option>
                    )
                  })}
                </select>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={8}>
                <Button onClick={this.addToCart} disabled={ats  > 0 ? '' : 'disabled'}>
                  {ats > 0 ? 'Add To Cart' : 'Sold Out'}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProductDetail;
