import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    country: '',
  });
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [ls, cartProducts]);

  useEffect(() => {
    if (cartProducts?.length === 0 && ls) {
      ls.removeItem('cart');
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    if (ls && ls.getItem('customerInfo')) {
      setCustomerInfo(JSON.parse(ls.getItem('customerInfo')));
    }
  }, [ls]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, [ls]);

  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    if (ls) {
      ls.removeItem('cart');
    }
  };

  const saveCustomerInfo = () => {
    if (ls) {
      ls.setItem('customerInfo', JSON.stringify(customerInfo));
    }
  };

  const deleteCustomerInfo = () => {
    setCustomerInfo({
      name: '',
      email: '',
      city: '',
      postalCode: '',
      streetAddress: '',
      country: '',
    });
    if (ls) {
      ls.removeItem('customerInfo');
    }
  };

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart, customerInfo, setCustomerInfo, saveCustomerInfo, deleteCustomerInfo }}
    >
      {children}
    </CartContext.Provider>
  );
}
