import React from 'react';
import './App.css';
import { Homepage } from './containers/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductListPage } from './containers/ProductListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions';
import { ProductDetailsPage } from './containers/ProductDetailsPage/index';
import { CartPage } from './containers/CartPage';
import { CheckoutPage } from './containers/CheckoutPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage />} />
          <Route path="/:slug" element={<ProductListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
