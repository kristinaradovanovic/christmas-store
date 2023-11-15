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
    },
  }
  type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }

  const defaultDispatch: React.Dispatch<Action> = () => initialState

  const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
  })
  
  function StoreProvider(props: React.PropsWithChildren<object>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StoreState, Action>>(
      reducer,
      initialState as StoreState
      )

    function reducer(state: StoreState, action: Action): StoreState {
      console.log('Reducer Action:', action);
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


