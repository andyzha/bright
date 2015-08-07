import React, { PropTypes, Component } from "react";
import { loadProduct } from "../actions/ProductActionCreator";

class Product extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  }

  static defaultProps = {
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { product } = this.props;
  }

  render() {
    const { product } = this.props;
    return (
      <a href={`/${product}`}>
        product: ${this.props}
      </a>
    );
  }

}

export default Product;
