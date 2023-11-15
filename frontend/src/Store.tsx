import { Cart, CartItem } from './types/CartItems';
import React, { useEffect } from 'react';

type StoreState = {
  cart: Cart;
};

const initialState: StoreState = {
  cart: {
    cartItems: [],
  },
};

type Action = { type: 'ADD_ITEM'; payload: CartItem } | { type: 'REMOVE_ITEM'; payload: CartItem } | { type: 'CLEAR' };

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<object>) {
  const [state, dispatch] = React.useReducer<React.Reducer<StoreState, Action>>(
    reducer,
    initialState
  );

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products'); 
        const data = await response.json();

        dispatch({
          type: 'ADD_ITEM',
          payload: data,
        });
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchData();
  }, []);

  function reducer(state: StoreState, action: Action): StoreState {
    switch (action.type) {
      case 'ADD_ITEM': {
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find((item: CartItem) => item.id === newItem.id);

        const cartItems = existItem
          ? state.cart.cartItems.map((item: CartItem) => (item.id === existItem.id ? newItem : item))
          : [...state.cart.cartItems, newItem];

        saveToMongoDBAtlas(cartItems);

        return { ...state, cart: { ...state.cart, cartItems } };
      }

      case 'REMOVE_ITEM': {
        const cartItems = state.cart.cartItems.filter((item: CartItem) => item.id !== action.payload.id);

        saveToMongoDBAtlas(cartItems);

        return { ...state, cart: { ...state.cart, cartItems } };
      }
      default:
        return state;
    }
  }
  const saveToMongoDBAtlas = async (cartItems: CartItem[]) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      if (response.ok) {
        console.log('Cart items saved to MongoDB Atlas');
      } else {
        console.error('Failed to save cart items to MongoDB Atlas');
      }
    } catch (error) {
      console.error('Error saving cart items to MongoDB Atlas:', error);
    }
  };

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };

