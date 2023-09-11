import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getProductPage } from '../../../actions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Card } from '../../../components/UI/Card';
import '../../../components/UI/Card/style.css'

/**
* @author
* @function ProductPage
**/


const getParams = (query) => {
  if (query !== "") {
    const queryString = query.split("?")[1];
    if (queryString.length > 0) {
      const params = queryString.split("&");
      const paramsObj = {};
      params.forEach(param => {
        const keyValue = param.split("=");
        paramsObj[keyValue[0]] = keyValue[1];
      });
      return paramsObj
    }
  }
  return {};
}


export const ProductPage = (props) => {

  const { search } = useLocation();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product)
  const { page } = product;

  useEffect(() => {
    const params = getParams(search);
    // console.log(params);
    const payload = {
      params
    }

    dispatch(getProductPage(payload));
  }, [])

  return (
    <div style={{ margin: '0 10px' }}>
      <h3>{page.title}</h3>
      <Carousel
        renderThumbs={() => { }}
      >
        {
          page.banners && page.banners.map((banner, index) =>
            <a
              key={index}
              style={{ display: 'block' }}
              href={banner.navigateTo}
            >
              <img src={banner.img} alt="" />
            </a>
          )
        }
      </Carousel>
      <div style={{
        display: 'flex'
      }}>
        {
          page.products && page.products.map((product, index) =>
            <div 
              key={index}
              className='card'
            >
              <img src={product.img} alt="" />
            </div>
          )
        }
      </div>
    </div>
  )

}