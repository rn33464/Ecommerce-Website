import React, { createContext, useContext, useEffect, useState } from 'react';
const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};

export default function CartProvider({ children }) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(
            CART_KEY,
            JSON.stringify({
                items: cartItems,
                totalPrice,
                totalCount,
            })
        );
    }, [cartItems]);

    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    }

    const sum = items => {
        return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
    };

    const removeFromCart = prodId => {
        const filteredCartItems = cartItems.filter(item => item.prod.id !== prodId);
        setCartItems(filteredCartItems);
    }

    const changeQuantity = (cartItem, newQuantity) => {
        const { prod } = cartItem;

        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: prod.price * newQuantity,
        };

        setCartItems(
            cartItems.map(item => (item.prod.id === prod.id ? changedCartItem : item))
        );
    };

    const addToCart = prod => {
        const cartItem = cartItems.find(item => item.prod.id === prod.id);
        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { prod, quantity: 1, price: prod.price }]);
        }
    };

    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        const { items, totalPrice, totalCount } = EMPTY_CART;
        setCartItems(items);
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
    };


    return (
        <CartContext.Provider
            value={{ cart: { items: cartItems, totalPrice, totalCount }, removeFromCart, changeQuantity, addToCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
export const useCart = () => useContext(CartContext);