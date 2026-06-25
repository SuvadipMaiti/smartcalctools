import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { accountVerificationLinkCreateAsync } from '../redux/slices/AuthSlice';

const AccountVerificationLinkCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');


  const accountVerificationLinkSend = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
    };
    dispatch(accountVerificationLinkCreateAsync({ userData, navigate, toast }));
  };


  return (
    <>
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>
            Resend account activation link
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
            onClick={accountVerificationLinkSend}
          />
        </form>
      </section>
    </>
  );
};

export default AccountVerificationLinkCreateForm;
