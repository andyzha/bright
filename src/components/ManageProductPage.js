import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { Grid, Row, Col, Button, Input } from 'react-bootstrap';

import ManageProductAction from '../actions/ManageProductAction';

var debug = require("debug")("brightCart");

@connectToStores(["ManageProductStore"], (context, props) =>
  ({productList: context.getStore("ManageProductStore").get() })
)

class ManageProductPage extends Component {
  static PropTypes = {
    productList: PropTypes.object.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  addPrimaryImagesToHomePage = () => {
    let images = this.state.selectedImages;
    if (typeof images == 'undefined') {
      alert("Not init.")
    }
    if (images.length > 0) {
      alert("good");
    } else {
      alert("Nothing in list");
    }
  }

  addImageToStore = (id, image) => {
    alert('Add sth');
    this.executeAction(ManageProductAction.addProductToDisplay,
      { productId:id, image:image, isPrimary:true});
  }

  addRotateImagesToHomePage = () => {

  }

  constructor(props) {
    super(props);
    this.state = {selectedImages: {} };
  }

  render() {
    debug('all products  ' + JSON.stringify(this.props.productList));

    return (      
      <Grid>
        <Row>
          <Col style={{ display: 'inline-block'}}>
            { this.props.productList.map((product) => {
              return (
                <Row key={product._id} style={{ marginBottom: '30px'}}>
                  <Col>
                    ProductName: { product.name }
                  </Col>
                  { product.images.map((image, index) => {
                    return (
                      <Col xs={6} md={3} style={{ width: '200px', height:'100px', display: 'inline-block'}} >
                       <img 
                         className='.img-responsive' 
                         width='100%' 
                         height='100%' 
                         src={image} />
                      </Col>
                    )
                  })}
                </Row>
              )
            })}
          </Col>
          <Col style={{ display: 'inline-block', float:'right' }}>
            <Row>
              <Col style={{ margin: '20px' }}>
                <Button bsStyle="info" block
                  onClick={this.addPrimaryImagesToHomePage} disabled={false}>
                  Add To HomePage Primary Images
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: '20px' }}>
                <Button bsStyle="info" block
                  onClick={this.addRotateImagesToHomePage} disabled={false}>
                  Add To HomePage Rotate Images
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ManageProductPage;
