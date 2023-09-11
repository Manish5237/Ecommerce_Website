import React from 'react'
import Layout from '../../components/Layout'
import { useLocation } from 'react-router-dom'
// import getParams from '../../utils/getParams'
import { ProductStore } from './ProductStore'
import './style.css'
import { ProductPage } from './ProductPage'

/**
* @author
* @function ProductListPage
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

export const ProductListPage = (props) => {

  const { search } = useLocation();

  const renderProduct = () => {
    const params = getParams(search);
    let content = null;
    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />
        break;

      case 'page':
        content = <ProductPage {...props} />
        break;

      default:
        content = null
    }
    return content;
  }

  return (
    <div>
      <Layout />
      {renderProduct()}
    </div>
  )

}