import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/slices/AuthSlice';
import GoogleLoginComponent from '../components/GoogleLoginComponent';
import * as url from '../helpers/url';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginAsync({ userData, navigate, toast }));
  };

  return (
    <section className="form-container">
      <form action="" method="post" encType="multipart/form-data">
        <h3>login now</h3>
        <p>
          your email <span>*</span>
        </p>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          required
          maxLength="50"
          className="box"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>
          your password <span>*</span>
        </p>
        <input
          type="password"
          name="pass"
          placeholder="enter your password"
          required
          maxLength="20"
          className="box"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="login new"
          name="submit"
          className="btn"
          onClick={loginSubmit}
        />
        <div className="box">
          <GoogleLoginComponent />
        </div>
        <Link to={url.forgotPasswordEmail()}>
          <div className="btn">Forgot Password ?</div>
        </Link>
        <Link to={url.accountVerificationLinkCreate()}>
          <div className="box">
            Click here to resend account verification link
          </div>
        </Link>
      </form>
    </section>
  );
};

export default Login;
