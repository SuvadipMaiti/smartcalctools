import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordOtpAsync } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ForgotPasswordOtpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const { forgotPasswordEmail } = useSelector((state) => state.authReducer);

  useEffect(()=>{
    if(forgotPasswordEmail && forgotPasswordEmail?.email){
      setEmail(forgotPasswordEmail?.email);
    }else{
      navigate(url.forgotPasswordEmail());
    }
  },[forgotPasswordEmail,navigate]);

  const forgotPasswordOtpSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      otp: otp,
    };
    dispatch(forgotPasswordOtpAsync({ userData, navigate, toast }));
  };


  return (
    <>
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>
            Forgot Password
          </h3>
          <p>
            OTP send to your mail id <span>*</span>
          </p>
          <input
            type="text"
            name="otp"
            placeholder="enter your otp"
            required
            maxLength="50"
            className="box"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="submit"
            value="Submit"
            name="submit"
            className="btn"
            onClick={forgotPasswordOtpSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ForgotPasswordOtpForm;
