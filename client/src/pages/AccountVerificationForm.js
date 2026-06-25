import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { accountVerificationAsync } from '../redux/slices/AuthSlice';
import { useParams } from 'react-router-dom';

const AccountVerificationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(()=>{
    const userData = {
      token: token,
    };
    dispatch(accountVerificationAsync({ userData, navigate, toast }));
  },[dispatch,navigate,token]);

  return (
    <>
      <section className="form-container">
        <div className="btn" style={{margin:'10%'}}> Activation going on .... </div>
      </section>
    </>
  );
};

export default AccountVerificationForm;
