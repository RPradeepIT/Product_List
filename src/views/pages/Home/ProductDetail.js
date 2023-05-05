import React from 'react'
import { useConfirm } from 'material-ui-confirm'

const ProductDetail = ({ item, key, id, _editProduct, _deleteProduct }) => {
  const confirmalert = useConfirm()

  const deleteProduct = () => {
    confirmalert({
      description: 'Are you sure to remove product?',
    }).then(() => _deleteProduct && _deleteProduct(id))
  }

  const editProduct = () => {
    _editProduct && _editProduct(id)
  }

  return (
    <div className="panel panel-default" key={`${id}`}>
      <div className="panel-heading">
        <h4 className="panel-product">
          <a data-toggle="collapse" data-parent="#accordion" href={`#${id}`}>
            {item && item.Name}
          </a>
        </h4>
      </div>

      <div id={`${id}`} className="panel-collapse collapse">
        <div className="panel-body">
          <ul className="list-group">
            <li key={`item-${id}-${1}`} className="list-group-item">
              <b>Price : {item.Price}</b>
            </li>

            <li key={`item-${id}-${2}`} className="list-group-item">
              <b>Unit : {item.Unit}</b>
            </li>

            <li key={`item-${id}-${3}`} className="list-group-item">
              <b>Total : {item.Total}</b>
            </li>
          </ul>
          <div className="form-group">
            <div className="col-sm-12 pad-0">
              <button
                type="submit"
                onClick={(e) => deleteProduct()}
                className="btn btn-sub btn-edit-form"
              >
                DELETE
              </button>
              <button
                type="submit"
                onClick={(e) => editProduct()}
                className="btn btn-add btn-edit-form"
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
