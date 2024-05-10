import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: []
})

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])


    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {

            setCart(cart.map(prod => {
                 return prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity}: prod
             }));
        
        } else {
            setCart([...cart, {...item,quantity}])   
        }
    }

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (id) => cart.find(prod => prod.id ===id) ? true : false;


    const removeItem = (itemId) =>{ 
        // setCart(cart.filter(prod => prod.id !==id) )
        const cartUpdated = cart.filter(prod => prod.id !== itemId)
        setCart(cartUpdated)
     }
        
    const totalPrecio = () => {
        return cart.reduce((prev,act) => prev + act.quantity * act.precio, 0)

    }

    const totalProductos = () => cart.reduce((acumulador,productoActual) => acumulador + productoActual.quantity, 0)
 
    return(
        <CartContext.Provider value={{cart,addItem,removeItem,clearCart,totalPrecio,totalProductos}}>
            {children}
        </CartContext.Provider>
    )
}

