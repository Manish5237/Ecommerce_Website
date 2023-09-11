import React, { useState } from 'react';
import {generatePictureurl} from '../../../urlConfig'
import './style.css'

/**
* @author
* @function CartItem
**/

export const CartItem = (props) => {
    const [qty,setQty]=useState(props.cartItem.qty);
    const {
        _id, name, price, img
    } = props.cartItem;

    const onQuantityIncrement=()=>{
        setQty(qty+1)
        props.onQuantityInc(_id,qty+1)
    }

    const onQuantityDecrement=()=>{
        if (qty<=1) return;
        setQty(qty-1);
        props.onQuantityDec(_id,qty-1);
    }

    return (
        <div className='cartItemContainer'>
            <div className='flexRow'>
                <div className='cartProImgContainer'>
                    <img src={generatePictureurl(img)} alt={''} />
                </div>
                <div className='cartItemDetails'>
                    <div>
                        <p>{name}</p>
                        <p style={{ fontWeight: 'bold' }}>Rs. {price}</p>
                    </div>
                    <div>Delivery in 3-5 days</div>
                </div>
            </div>
            <div style={{
                display:'flex',
                margin:'5px 0'
            }}>
                <div className='quantityControl'>
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly/>
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button className='cartActionBtn'>Save for Later</button>
                <button className='cartActionBtn'>Remove</button>
            </div>
        </div>
    )

} 