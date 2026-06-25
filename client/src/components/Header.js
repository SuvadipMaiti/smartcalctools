import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import * as url from '../helpers/url';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/slices/AuthSlice';
import { toast } from 'react-toastify';
import { searchKeywordAsync } from '../redux/slices/CalculatorSlice';
import { googleLogout } from '@react-oauth/google';

const Header = () => {
  let body = document.body;
  let darkMode = localStorage.getItem('dark-mode');
  const enableDarkMode = () => {
    let toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    }
  };

  const disableDarkMode = () => {
    let toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    }
  };

  const colorChangeFun = () => {
    darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'disabled') {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };

  useEffect(() => {
    if (darkMode === 'enabled') {
      enableDarkMode();
    }
    // eslint-disable-next-line
  }, [darkMode]);

  const userBtnClickFun = () => {
    let profile = document.querySelector('.header .flex .profile');
    let search = document.querySelector('.header .flex .search-form');
    profile.classList.toggle('active');
    search.classList.remove('active');
  };

  const searchBtnClickFun = () => {
    let profile = document.querySelector('.header .flex .profile');
    let search = document.querySelector('.header .flex .search-form');
    search.classList.toggle('active');
    profile.classList.remove('active');
  };

  const menuBtnClickFun = () => {
    let sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('active');
    body.classList.toggle('active');
  };

  window.onscroll = () => {
    let profile = document.querySelector('.header .flex .profile');
    let search = document.querySelector('.header .flex .search-form');
    let sideBar = document.querySelector('.side-bar');
    profile.classList.remove('active');
    search.classList.remove('active');

    if (window.innerWidth < 1200) {
      sideBar.classList.remove('active');
      body.classList.remove('active');
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authReducer);
  const { searchKeyword } = useSelector((state) => state.calculatorReducer);
  const handleLogout = () => {
    if (auth && auth.googleId) {
      googleLogout();
    }
    dispatch(setLogout());
    toast.success('logout sucessfull');
    navigate(url.login());
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    var search = e.target.value;
    dispatch(searchKeywordAsync(search));
    navigate(url.dashboard());
  };

  return (
    <header className="header">
      <section className="flex">
        <Link to={url.dashboard()} className="logo">
          SmartCalcTools
        </Link>

        <div className="search-form">
          <input
            type="text"
            name="search_box"
            required
            placeholder="search..."
            maxLength="100"
            value={searchKeyword}
            onChange={searchSubmit}
          />
          <button type="button" className="fas fa-search"></button>
        </div>

        <div className="icons">
          <div
            id="menu-btn"
            onClick={() => menuBtnClickFun()}
            className="fas fa-bars"
          ></div>
          <div
            id="search-btn"
            onClick={() => searchBtnClickFun()}
            className="fas fa-search"
          ></div>
          <div
            id="user-btn"
            onClick={() => userBtnClickFun()}
            className="fas fa-user"
          ></div>
          <div
            id="toggle-btn"
            onClick={() => colorChangeFun()}
            className="fas fa-sun"
          ></div>
        </div>

        <div className="profile">
          {auth?.avatar ? (
            <img
              src={apiFilepath + '/uploads/avatar/' + auth?.avatar}
              className="image"
              alt={auth?.name}
              onError={(e) => {
                e.currentTarget.src = filepath + '/assets/static/user.png';
              }}
            />
          ) : (
            <img
              src={filepath + '/assets/static/user.png'}
              className="image"
              alt="Avatar"
            />
          )}
          <h3 className="name">{auth && auth.name ? auth.name : 'Name'}</h3>
          <p className="role">
            {auth && auth.username ? auth.username : 'Username'}
          </p>
          {auth && auth.id ? (
            <>
              <Link to={url.myProfile()} className="btn">
                view profile
              </Link>
              <div className="delete-btn" onClick={() => handleLogout()}>
                Log Out
              </div>
            </>
          ) : (
            <>
              <div className="flex-btn">
                <Link to={url.login()} className="option-btn">
                  login
                </Link>
                <Link to={url.register()} className="option-btn">
                  register
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
