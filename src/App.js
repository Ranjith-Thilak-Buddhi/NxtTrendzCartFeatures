import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productInCart = cartList.find(item => {
      if (product.id === item.id) {
        return true
      }
      return false
    })

    if (productInCart) {
      const updatedList = cartList.map(item => {
        if (product.id === item.id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      this.setState({cartList: updatedList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })

    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedList = []
    cartList.forEach(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          updatedList.push({...item, quantity: item.quantity - 1})
        }
      } else {
        updatedList.push(item)
      }
    })

    this.setState({cartList: updatedList})
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const updatedList = cartList.filter(item => item.id !== id)

    this.setState({cartList: updatedList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
