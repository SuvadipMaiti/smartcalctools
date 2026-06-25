import React from 'react';
import * as url from '../helpers/url';
import { filepath } from '../helpers/urlConfig';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  let body = document.body;
  let navigate = useNavigate();

  const { auth } = useSelector((state) => state.authReducer);

  const closeBtnClickFun = () => {
    let sideBar = document.querySelector('.side-bar');
    sideBar.classList.remove('active');
    body.classList.remove('active');
  };

  const openDashboardFun = () => {
    closeBtnClickFun();
    navigate(url.dashboard());
  };

  const openContactFun = () => {
    closeBtnClickFun();
    navigate(url.contact());
  };

  const openCollectionCreateFun = () => {
    closeBtnClickFun();
    navigate(url.collectionCreate());
  };

  const openCalculatorCreateFun = () => {
    closeBtnClickFun();
    navigate(url.calculatorCreate());
  };

  const openAboutFun = () => {
    closeBtnClickFun();
    navigate(url.about());
  };

  const openCollectionsFun = () => {
    closeBtnClickFun();
    navigate(url.collections());
  };

  return (
    <div className="side-bar">
      <div id="close-btn" onClick={() => closeBtnClickFun()}>
        <i className="fas fa-times"></i>
      </div>

      <div className="profile">
        <Link to={url.dashboard()} className="logo">
          <img
            src={filepath + '/assets/static/companylogo.png'}
            className="image"
            alt=""
          />
          <h3 className="name">SmartCalcTools</h3>
          <p className="role">Smart Calculator Tools</p>
        </Link>
        {auth && auth.admin === 1 && (
          <>
            <div className="btn" onClick={openCalculatorCreateFun}>
              Create a Calculator
            </div>
            <div className="btn" onClick={openCollectionCreateFun}>
              Create a Collection
            </div>
          </>
        )}
      </div>

      <nav className="navbar">
        <div className="link" onClick={openDashboardFun}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
        <div className="link" onClick={openCollectionsFun}>
          <i className="fas fa-tools"></i>
          <span>Collections</span>
        </div>

        <div className="link" onClick={openAboutFun}>
          <i className="fas fa-question"></i>
          <span>About Us</span>
        </div>

        <div className="link" onClick={openContactFun}>
          <i className="fas fa-headset"></i>
          <span>Contact Us</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
