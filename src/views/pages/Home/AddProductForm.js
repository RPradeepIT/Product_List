import { parse } from 'date-fns/esm'
import React from 'react'

function homeReducer(state, action) {
  switch (action.type) {
    case 'SET_Product':
      return { ...state, products: action.payload }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const AddProductForm = ({ products, onClose, _handleAddProduct }) => {
  const initialState = { count: 1, inputs: [0], answers: {} }

  const [state, dispatch] = React.useReducer(homeReducer, initialState)
  const nameRef = React.useRef()

  const handleAddProduct = (e) => {
    e.preventDefault()
    let productObject = {
      Name: nameRef.current.value,
      ...state.products,
    }
    productObject = {
      id: products.length + 1,
      ...productObject,
    }

    _handleAddProduct(productObject)
    dispatch({
      type: 'SET_Product',
      payload: '',
    })
  }

  const onchangehandler = (e) => {
    const { id, value } = e.target
    const newdataval = {
      ...state.products,
      ...{ [id]: id === 'Name' ? value : parseInt(value) },
    }
    dispatch({
      type: 'SET_Product',
      payload: newdataval,
    })
  }

  return (
    <div>
      <h1 className="addq-head">Add a Product</h1>
      <form
        className="form-horizontal list-right-form"
        role="form"
        onSubmit={(e) => handleAddProduct(e, this)}
      >
        <div className="list-right-qa-cntnr">
          <div className="form-group list-right-product col-sm-12">
            <label
              className="col-sm-2 col-xs-2 list-right-label"
              htmlFor="Name"
            >
              Name
            </label>
            <div className="col-sm-10 col-xs-10 controlspace">
              <input
                ref={nameRef}
                type="text"
                className="form-control addqstn"
                id="Name"
                placeholder="Enter Name here"
                onChange={(e) => onchangehandler(e)}
                value={state?.products?.Name || ''}
              />
            </div>
          </div>

          <div className="form-group list-right-product col-sm-12">
            <label
              className="col-sm-2 col-xs-2 list-right-label"
              htmlFor="Price"
            >
              Price
            </label>
            <div className="col-sm-10 col-xs-10 controlspace">
              <input
                type="text"
                className="form-control addqstn"
                id="Price"
                placeholder="Enter Price here"
                onChange={(e) => onchangehandler(e)}
                value={state?.products?.Price || ''}
              />
            </div>
          </div>
          <div className="form-group list-right-product col-sm-12">
            <label
              className="col-sm-2 col-xs-2 list-right-label"
              htmlFor="Unit"
            >
              Unit
            </label>
            <div className="col-sm-10 col-xs-10 controlspace">
              <input
                type="text"
                className="form-control addqstn"
                id="Unit"
                placeholder="Enter Unit here"
                onChange={(e) => onchangehandler(e)}
                value={state?.products?.Unit || ''}
              />
            </div>
          </div>
          <div className="form-group list-right-product col-sm-12">
            <label
              className="col-sm-2 col-xs-2 list-right-label"
              htmlFor="Total"
            >
              Total
            </label>
            <div className="col-sm-10 col-xs-10 controlspace">
              <input
                type="text"
                className="form-control addqstn"
                id="Total"
                placeholder="Enter Total here"
                onChange={(e) => onchangehandler(e)}
                value={state?.products?.Total || ''}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-1 col-sm-10 col-xs-12 mob-btn-container">
            <button
              onClick={onClose}
              type="submit"
              className="btn btn-add btn-add-form"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm
