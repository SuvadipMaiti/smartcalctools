import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/slices/AuthSlice';
import { Link } from 'react-router-dom';
import * as url from '../helpers/url';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const registerSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      cpassword,
    };
    dispatch(registerAsync({ userData, navigate, toast }));
  };

  return (
    <section className="form-container">
      <form action="" method="post" encType="multipart/form-data">
        <h3>register now</h3>
        <p>
          your name <span>*</span>
        </p>
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          required
          maxLength="50"
          className="box"
          onChange={(e) => setName(e.target.value)}
        />
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
        <p>
          confirm password <span>*</span>
        </p>
        <input
          type="password"
          name="c_pass"
          placeholder="confirm your password"
          required
          maxLength="20"
          className="box"
          onChange={(e) => setCpassword(e.target.value)}
        />
        <p>
          By clicking "Register New" you agree to our
          <Link to={url.termsAndCondition()}>
            <span> Terms of Service </span>
          </Link>
          &
          <Link to={url.privacyPolicy()}>
            <span> Privacy Policy </span>
          </Link>
        </p>
        <input
          type="submit"
          value="register new"
          name="submit"
          className="btn"
          onClick={registerSubmit}
        />
      </form>
    </section>
  );
};

export default Register;
