import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { passwordUpdateAsync } from '../redux/slices/AuthSlice';

const MyPasswordUpdate = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const profileUpdate = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append('password', password);
    profileData.append('cpassword', cpassword);
    dispatch(passwordUpdateAsync({ id, profileData, navigate, toast }));
  };



  return (
    <section className="form-container">
      <form action="" method="post" encType="multipart/form-data">
        <h3>Change password</h3>
        <p>
          your password <span><i class="info-icon fas fa-info-circle" title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."></i></span>
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
          value="update profile"
          name="submit"
          className="btn"
          onClick={profileUpdate}
        />
      </form>
    </section>
  );
};

export default MyPasswordUpdate;
