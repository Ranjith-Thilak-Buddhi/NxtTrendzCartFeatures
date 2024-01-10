import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length
      let total = 0
      cartList.forEach(item => {
        total += item.price * item.quantity
      })

      return (
        <>
          <div className="order-total-container">
            <h1 className="total-heading">Order Total:</h1>
            <p className="total">RS {total}/- </p>
          </div>
          <p className="cart-items-count">{cartItemsCount} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
