import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../../actions';
import { useParams } from 'react-router-dom';
import { generatePictureurl } from '../../../urlConfig';
import './style.css';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/UI/Card'

/**
* @author
* @function ProductStore
**/

export const ProductStore = (props) => {

    const dispatch = useDispatch();
    const { slug } = useParams();
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5k: "Under 5000",
        under10k: "Under 10000",
        under20k: "Under 20000",
        under30k: "Under 30000",
        under50k: "Under 50000"
    })

    useEffect(() => {
        dispatch(getProductBySlug(slug));
    }, []);
    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerleft={`${slug} Mobile ${priceRange[key]}`}
                            headerright={<button>View</button>}
                            style={{
                                innerWidth:'calc(100%-40px)',
                                margin: '20px'
                            }}
                        >

                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>

                                        <Link to={`/${product.slug}/${product._id}/p`} style={{ display: 'block' }} className='productContainer ' >
                                            <div className='productImgContainer'>
                                                <img src={generatePictureurl(product.productPictures[0].img)} alt="" />
                                            </div>

                                            <div className='productInfo'>
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>4345</span>
                                                </div>

                                                <div className='productPrice'>{product.price}</div>
                                            </div>
                                        </Link>
                                    )
                                }

                            </div>
                        </Card>
                    );
                })
            }
        </>
    )

}