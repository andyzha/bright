import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

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
      <div>
        Hello Product page!
        <NavLink
            key="product"
            routeName="product"
            navParams={{id: product.id}}>
            {product.name}
        </NavLink>
        <a href={`/product/${product.id}`}>
          {product.name}
        </a>
      </div>
    );
  }
}

export default ProductDetail;
