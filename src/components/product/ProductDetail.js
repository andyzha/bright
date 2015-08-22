import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { Grid, Row, Col } from 'react-bootstrap';

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
    debug('product result' + JSON.stringify(this.props));
    const { product } = this.props;
    return (
      <Row className="">
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
        <Col lg={6} md={4}>
          <button className="btn btn-xs" >Click</button>
        </Col>
      </Row>
    );
  }
}

export default ProductDetail;
