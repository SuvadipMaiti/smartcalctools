import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { forgotPasswordEmailAsync } from '../redux/slices/AuthSlice';

const ForgotPasswordEmailForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');



  const forgotPasswordEmailSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
    };
    dispatch(forgotPasswordEmailAsync({ userData, navigate, toast }));
  };


  return (
    <>
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>
            Forgot Password
          </h3>
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
          <input
            type="submit"
            value="Submit"
            name="submit"
            className="btn"
            onClick={forgotPasswordEmailSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ForgotPasswordEmailForm;
