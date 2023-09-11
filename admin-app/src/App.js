import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import { Home } from './containers/Home';
import { Signin } from './containers/Signin';
import { Signup } from './containers/Signup';
import PrivateRoute from './components/HOC/privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions'
import { Products } from './containers/products';
import { Orders } from './containers/order';
import { Category } from './containers/category';
import { NewPage } from './containers/NewPage';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/page" element={<PrivateRoute><NewPage /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute>{ <Products/> }</PrivateRoute>} />
        <Route path="/category" element={<PrivateRoute>{ <Category/> }</PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute>{ <Orders/> }</PrivateRoute>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
