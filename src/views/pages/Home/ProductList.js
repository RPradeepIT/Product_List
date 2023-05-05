import React, { Component } from 'react'
import ProductDetail from './ProductDetail'

class ProductList extends Component {
  constructor() {
    super()
    this.state = { mounted: false }
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  deleteProduct(id) {
    this.props._removeProduct(id)
  }

  editProduct(id) {
    this.props._modifyProduct(id)
  }

  render() {
    let productNames = ''
    if (this.state.mounted) {
      if (this.props.products.length === 0) {
        productNames = <h4 className="emptyQB"> No product yet</h4>
      } else {
        productNames = this.props?.products?.map((data, idx) => {
          return (
            <ProductDetail
              item={data}
              key={idx}
              id={idx}
              _deleteProduct={(index) => this.deleteProduct(index)}
              _editProduct={(index) => this.editProduct(index)}
            />
          )
        })
      }
    }

    return (
      <div>
        <div className="panel-group" id="accordion">
          {productNames}
        </div>
      </div>
    )
  }
}

export default ProductList
