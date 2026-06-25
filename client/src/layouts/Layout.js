import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  
  const { auth } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (auth && auth.token) {
      const authToken = auth.token;
      const decodedToken = decode(authToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogout());
        navigate(url.login());
      }
    }
  }, [auth, dispatch, navigate]);


  useEffect(() => {
    // Scroll to the top of the page whenever the URL changes
    window.scrollTo(0, 0);
  }, [pathname]); // Run this effect whenever the pathname changes



  return (
    <>
      <Header  />

      <Sidebar />

      <ToastContainer autoClose={2000} />
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
