import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          cartQuantity: 1
        }
      ];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            cartQuantity: Math.max(
              1,
              item.cartQuantity + change
            )
          };
        })
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.cartQuantity || 0),
    0
  );

  const itemCount = cart.reduce(
    (count, item) =>
      count + Number(item.cartQuantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}