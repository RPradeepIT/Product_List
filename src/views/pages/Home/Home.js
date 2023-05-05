import React from 'react'

import ProductList from './ProductList'

import AddProductForm from './AddProductForm'

import EditProduct from './EditProduct'
import useAppContext from '../../components/hooks/useToast'
import './Home.css'

function homeReducer(state, action) {
  switch (action.type) {
    case 'SET_Product':
      return { ...state, products: action.payload }
    case 'SET_editingIndex':
      return { ...state, editingIndex: action.payload }
    case 'SET_editingData':
      return { ...state, editingData: action.payload }
    case 'SET_editModalOpen':
      return { ...state, editModalOpen: action.payload }
    case 'SET_active':
      return { ...state, active: action.payload }
    case 'SET_buttonText':
      return { ...state, buttonText: action.payload }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const Home = ({ history, props }) => {
  const { showToastMessage, showLoading } = useAppContext()

  const initialState = {
    active: 'col-md-4 list-left closePanel',
    modalOpen: props ? props.opened : false,
    editModalOpen: props ? props.editOpened : false,
    buttonText: 'Add Product',
    products: [],
    editingData: '',
    editingIndex: '',
  }

  const [state, dispatch] = React.useReducer(homeReducer, initialState)

  React.useEffect(() => {
    async function fetchData() {
      debugger
      try {
        if (localStorage.getItem('ProductData') === null) {
          localStorage.setItem('ProductData', JSON.stringify(state.products))
        } else {
          dispatch({
            type: 'SET_Product',
            payload: JSON.parse(localStorage.getItem('ProductData')),
          })
        }
      } catch (err) {
        showToastMessage(err, 'error')
      }
    }

    fetchData()
  }, [])

  async function addProduct(product) {
    const allProduct = state.products.concat([product])
    dispatch({
      type: 'SET_Product',
      payload: allProduct,
    })
    localStorage.setItem('ProductData', JSON.stringify(allProduct))
    showToastMessage('Inserted Successfully', 'success')
  }

  async function deleteProduct(index) {
    const finalproduct = state.products.filter((d, i) => i !== index)

    dispatch({
      type: 'SET_Product',
      payload: finalproduct,
    })
    localStorage.setItem('ProductData', JSON.stringify(finalproduct))
    showToastMessage('Deleted Successfully', 'success')
  }

  const editProduct = (index) => {
    const editingData = state.products[index]

    dispatch({
      type: 'SET_editingIndex',
      payload: index,
    })
    dispatch({
      type: 'SET_editingData',
      payload: editingData,
    })

    dispatch({
      type: 'SET_editModalOpen',
      payload: !state.editModalOpen,
    })
  }

  const closeEditModal = () => {
    dispatch({
      type: 'SET_editModalOpen',
      payload: !state.editModalOpen,
    })

    dispatch({
      type: 'SET_editingIndex',
      payload: '',
    })
    dispatch({
      type: 'SET_editingData',
      payload: '',
    })
  }

  async function editproductComplete(index, product) {
    const { products } = state
    products[index] = product

    dispatch({
      type: 'SET_Product',
      payload: products,
    })

    dispatch({
      type: 'SET_editingIndex',
      payload: '',
    })
    dispatch({
      type: 'SET_editingData',
      payload: '',
    })

    showToastMessage('Updated Successfully', 'success')
  }

  const onclick = (type) => {
    dispatch({
      type: 'SET_active',
      payload: type.includes('closePanel')
        ? 'col-md-4 list-left openPanel'
        : 'col-md-4 list-left closePanel',
    })
    dispatch({
      type: 'SET_buttonText',
      payload: type.includes('closePanel') ? 'CLOSE PANEL' : 'Add a Product',
    })
  }

  let editForm = ''
  let sumTotal = 0
  state.products.length &&
    state.products.forEach((element) => {
      sumTotal += element.Total
    })

  if (state.editingData !== '') {
    editForm = (
      <EditProduct
        show={state.editModalOpen}
        onClose={() => closeEditModal()}
        data={state.editingData}
        index={state.editingIndex}
        _handleEditProduct={(index, product) =>
          editproductComplete(index, product)
        }
      />
    )
  }

  return (
    <div className="sub-container">
      {editForm}

      <div className={state.active}>
        <h1>Product Dashboard</h1>
        <h4 className="sumTotal"> Sum Total - {sumTotal}</h4>
        <div className="well list-left-accordion">
          <ProductList
            products={state.products}
            _removeProduct={(index) => deleteProduct(index)}
            _modifyProduct={(index) => editProduct(index)}
          />

          <div className="addq-container">
            <button
              type="button"
              className="btn btn-add addq"
              onClick={() => onclick(state.active)}
            >
              {state.buttonText}
            </button>
          </div>
        </div>

        <div className="addq-mob">
          <button
            type="button"
            className="btn btn-add addq"
            onClick={() => onclick(state.active)}
          >
            {state.buttonText}
          </button>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 list-right">
        <AddProductForm
          _handleAddProduct={(product) => addProduct(product)}
          products={state.products}
        />
      </div>
    </div>
  )
}

export default Home
