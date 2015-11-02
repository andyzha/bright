import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { Grid, Row, Col, Button, Input } from 'react-bootstrap';

import ProductCarousel from './ProductCarousel';
import Cart from '../Cart';
import CartAction from '../../actions/CartActionCreator';
import ProductStore from '../../stores/ProductStore';

var debug = require("debug")("brightProductDetail");

@connectToStores([ProductStore], (context, props) =>
  ({ product: context.getStore(ProductStore).get(props.id) })
)
class ProductDetail extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    cart: PropTypes.object
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { editQuantityText: '' };
  }

  componentDidMount() {
  }

  addItemToCart = () => {
    // debug('addItemToCart result ' + JSON.stringify(this.props));
    let quantity = parseInt(this.state.editQuantityText, 10);
    if (!quantity) quantity = 1;
    let item = { productId: this.props.product._id, quantity: quantity };
    this.context.executeAction(
      CartAction.addItemToCart,
      { cartId:'123456789012345678901234' , item:item });
  }

  validationState = () => {
    debug('validationState ' + this.state.editQuantityText);
    let value = this.state.editQuantityText;
    if(value == '') return 'success';

    let quantity = parseInt(value, 10);
    debug('q ' + quantity);
    if (!quantity) return 'error';
    else if (quantity > 999 || quantity < 1) return 'warning';
    else return 'success';
  }

  handleChange = event => {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html    debug('handleChange ' + event.target.value);
    this.setState({ editQuantityText: event.target.value });
  }

  render() {
    debug('product result ' + JSON.stringify(this.props));
    const { product } = this.props;

    return (
      <Grid>
        <Row>
          <Col lg={12} md={12}>
            <ProductCarousel product={product}/>
          </Col>
        </Row>
        <Row style={{ marginTop: '25px'}}>
          <Col lg={8} md={8}>
            <h1 className="name">{this.props.product.name}</h1>
            <p className="description">{this.props.product.description}</p>
          </Col>
          <Col lg={3} md={8}>
            <Row>
              <Col >
                <Button bsSize="large" block
                  onClick={this.addItemToCart} disabled={false}>
                  Add To Cart
                </Button>
              </Col>
            </Row>
            <Row>
              <Col >
                <Input
                  type="text"
                  value={this.state.editQuantityText}
                  ref="input"
                  bsStyle={this.validationState()}
                  placeholder="Enter quantity"
                  hasFeedback
                  onChange={this.handleChange} />
              </Col>
            </Row>
            <Row>
              <Cart />
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProductDetail;
