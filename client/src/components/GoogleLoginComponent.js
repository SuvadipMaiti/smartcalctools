import React from 'react';
import { loginGoogleAsync } from '../redux/slices/AuthSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleClientId } from '../helpers/urlConfig';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode";

const GoogleLoginComponent = ({locationcreate}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = (response) => {
    if(response && response?.credential){
        const resp = jwtDecode(response.credential);
        console.log('Login successful:', resp);
        const userData = {
          name: resp?.name,
          email: resp?.email,
          googleAvatar: resp?.picture,
          token: response?.credential,
          googleId: resp?.sub,
          locationcreate: locationcreate,
        };
        dispatch(loginGoogleAsync({ userData, navigate, toast }));
    }
  };

  const handleFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin 
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
