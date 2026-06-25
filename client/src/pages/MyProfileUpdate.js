import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiFilepath,filepath } from '../helpers/urlConfig';
import { useNavigate } from 'react-router-dom';
import { profileUpdateAsync } from '../redux/slices/AuthSlice';

const MyProfileUpdate = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setName(auth.name);
  }, [auth]);

  const fileUpload = (e) => {
    setAvatar(e.target.files[0]);
  };

  const profileUpdate = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append('name', name);
    profileData.append('avatar', avatar);
    dispatch(profileUpdateAsync({ id, profileData, navigate, toast }));
  };

  return (
    <section className="form-container">
      <form action="" method="post" encType="multipart/form-data">
        <h3>update profile</h3>
        <p>update name</p>
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          maxLength="50"
          className="box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>update avatar pic</p>
        <input
          type="file"
          accept="image/*"
          className="box"
          onChange={fileUpload}
        />
        {auth?.avatar && (
          <img
            src={
              auth?.avatarFullUrl
                ? auth?.avatar
                : apiFilepath + '/uploads/avatar/' + auth?.avatar
            }
            alt={auth?.name}
            style={{ width: '50px', height: '50px' }}
            onError={(e) => {
              e.currentTarget.src = filepath +'/assets/static/user.png';
            }}
          />
        )}
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

export default MyProfileUpdate;
