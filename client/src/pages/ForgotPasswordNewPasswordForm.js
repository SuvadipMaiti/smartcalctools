import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordNewPasswordAsync } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ForgotPasswordNewPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');  
  const { forgotPasswordOtp } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (forgotPasswordOtp && forgotPasswordOtp?.email && forgotPasswordOtp?.otp) {
      setEmail(forgotPasswordOtp?.email);
      setOtp(forgotPasswordOtp?.otp.toString());
    }else{
      navigate(url.forgotPasswordOtp());
    }
  }, [forgotPasswordOtp,navigate]);

  const forgotPasswordNewPasswordSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      otp: otp,
      password: password,
      cpassword: cpassword,
    };
    dispatch(forgotPasswordNewPasswordAsync({ userData, navigate, toast }));
  };

  return (
    <>
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>Forgot Password</h3>
          <p>
            your password{' '}
            <span>
              <i
                class="info-icon fas fa-info-circle"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
              ></i>
            </span>
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
          <input
            type="submit"
            value="Submit"
            name="submit"
            className="btn"
            onClick={forgotPasswordNewPasswordSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ForgotPasswordNewPasswordForm;
