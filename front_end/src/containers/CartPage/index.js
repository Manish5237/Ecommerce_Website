import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems } from '../../actions';
import Layout from '../../components/Layout'
import { Card } from '../../components/UI/Card'
import { CartItem } from './CartItem';
import './style.css';
import { MaterialButton } from "../../components/MaterialUI";
import { useNavigate } from 'react-router-dom';
import { PriceDetails } from '../../components/PriceDetails';
/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate])

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
    }

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1))
    }

    const history = useNavigate();

    if (props.onlyCartItems) {
        return (
            <>
            {
                Object.keys(cartItems).map((key, index) =>
                    <CartItem
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                    />
                )
            }
            </>
        );
    }

    return (
        <div>
            <Layout />
            <div className='cartContainer' style={{ alignItems: 'flex-start' }}>
                <Card
                    headerleft={`My Cart`}
                    headerright={<div>Deliver To</div>}
                    style={{ width: 'calc(100%-40px)', overflow: 'hidden' }}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            />
                        )
                    }

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MaterialButton
                                title="PLACE ORDER"
                                onClick={() => history(`/checkout`)}
                            />
                        </div>
                    </div>
                </Card>

                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />


            </div>
        </div>
    )

}