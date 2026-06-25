import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import * as url from '../helpers/url';

const MyProfile = () => {
  const { auth } = useSelector((state) => state.authReducer);

  return (
    <section className="user-profile">
      <h1 className="heading">your profile</h1>

      <div className="info">
        <div className="user">
          {auth?.avatar && (
            <img
              src={
                auth?.avatarFullUrl
                  ? auth?.avatar
                  : apiFilepath + '/uploads/avatar/' + auth?.avatar
              }
              alt={auth?.name}
              onError={(e) => {
                e.currentTarget.src = filepath + '/assets/static/user.png';
              }}
            />
          )}
          <h3>{auth && auth.name ? auth.name : 'Name'}</h3>
          <p>{auth && auth.username ? auth.username : 'Username'}</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {auth && auth.id && (
              <>
                <Link to={url.myProfileUpdate()} className="inline-btn">
                  update profile
                </Link>
                <Link to={url.myPasswordUpdate()} className="inline-btn">
                  Change Password
                </Link>
              </>
            )}
          </div>
        </div>
        {auth && auth.admin === 1 && (
          <div className="box-container">
            <div className="box">
              <div className="flex">
                <i className="fas fa-bookmark"></i>
                <div>
                  {/* <span>4</span> */}
                  <p>My all calculators</p>
                </div>
              </div>
              <Link to={url.myProfileCalculator()} className="inline-btn">
                My Calculators
              </Link>
            </div>

            <div className="box">
              <div className="flex">
                <i className="fas fa-bookmark"></i>
                <div>
                  {/* <span>33</span> */}
                  <p>My all collections</p>
                </div>
              </div>
              <Link to={url.myProfileCollection()} className="inline-btn">
                My Collections
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
