import { Cart, CartItem } from './types/CartItems'
import React from 'react'

type StoreState = {
    cart: Cart
}

const initialState: StoreState = {
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')!)
        : [],
      totalPrice: 0,
    },
  }
  type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: CartItem }
  | { type: 'CLEAR' }
  
  const defaultDispatch: React.Dispatch<Action> = () => initialState

  const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
  })
  
  function StoreProvider(props: React.PropsWithChildren<object>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StoreState, Action>>(
      reducer,
      initialState
      )

    function reducer(state: StoreState, action: Action): StoreState {
        switch (action.type) {
          case 'ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item: CartItem) => item.id === newItem.id);
      
            const cartItems = existItem
              ? state.cart.cartItems.map((item: CartItem) => (item.id === existItem.id ? newItem : item))
              : [...state.cart.cartItems, newItem];
      
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
          }
          default:
            return state;
        }
      }

    return <Store.Provider value={{ state, dispatch }} {...props} />
  }

  export { Store, StoreProvider } 


