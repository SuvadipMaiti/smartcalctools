import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';
import * as url from '../../helpers/url';

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.register(userData);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.login());
      } else {
        toast.error(response.data.message);
      }
      const registerData = response.data.data;
      return { registerData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const accountVerificationAsync = createAsyncThunk(
  'auth/accountVerificationAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.accountVerification(userData);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.login());
      } else {
        toast.error(response.data.message);
        navigate(url.accountVerificationLinkCreate());
      }
      const accountVerificationData = response.data.data;
      return { accountVerificationData };
    } catch (err) {
      toast.error(err.response.data.message);
      navigate(url.accountVerificationLinkCreate());
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const accountVerificationLinkCreateAsync = createAsyncThunk(
  'auth/accountVerificationLinkCreateAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.accountVerificationLinkCreate(userData);
      if (response.data.status) {
        toast.success(response.data.message);
        // navigate(url.forgotPasswordOtp());
      } else {
        toast.error(response.data.message);
      }
      const accountVerificationLinkCreateData = response.data.data;
      return { accountVerificationLinkCreateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const forgotPasswordEmailAsync = createAsyncThunk(
  'auth/forgotPasswordEmailAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.forgotPasswordEmail(userData);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.forgotPasswordOtp());
      } else {
        toast.error(response.data.message);
      }
      const forgotPasswordEmailData = response.data.data;
      return { forgotPasswordEmailData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const forgotPasswordOtpAsync = createAsyncThunk(
  'auth/forgotPasswordOtpAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.forgotPasswordOtp(userData);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.forgotPasswordNewPassword());
      } else {
        toast.error(response.data.message);
      }
      const forgotPasswordOtpData = response.data.data;
      return { forgotPasswordOtpData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const forgotPasswordNewPasswordAsync = createAsyncThunk(
  'auth/forgotPasswordNewPasswordAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.forgotPasswordNewPassword(userData);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.login());
      } else {
        toast.error(response.data.message);
      }
      const forgotPasswordNewPasswordData = response.data.data;
      return { forgotPasswordNewPasswordData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ userData, navigate, dispatch, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.login(userData);
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }
      } else {
        toast.error(response.data.message);
      }
      const loginData = response.data.data;
      return { loginData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const loginGoogleAsync = createAsyncThunk(
  'auth/loginGoogleAsync',
  async ({ userData, navigate, dispatch, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.logingoogle(userData);
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }
        if (response.data.data.googleId) {
          toast.success(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
      const loginData = response.data.data;
      return { loginData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const profileUpdateAsync = createAsyncThunk(
  'auth/profileUpdateAsync',
  async ({ id, profileData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.profileUpdate(profileData, id);
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }
      } else {
        toast.error(response.data.message);
      }
      const profileUpdateData = response.data.data;
      return { profileUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const passwordUpdateAsync = createAsyncThunk(
  'auth/passwordUpdateAsync',
  async ({ id, profileData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.passwordUpdate(profileData, id);
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.myPasswordUpdate());
        }
      } else {
        toast.error(response.data.message);
      }
      const passwordUpdateData = response.data.data;
      return { passwordUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const userAllAsync = createAsyncThunk(
  'auth/userAllAsync',
  async ({ toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.userAll();
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const usersData = response.data.data;
      return { usersData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userregister: {},
    auth: JSON.parse(localStorage.getItem('auth'))
      ? JSON.parse(localStorage.getItem('auth'))
      : null,
    users: {},
    accountVerificationLinkCreate: {},
    accountVerification: {},
    forgotPasswordEmail: {},
    forgotPasswordOtp: {},
    forgotPasswordNewPassword: {},
    error: '',
    loading: false,
  },
  reducers: {
    setLogout: (state, action) => {
      localStorage.clear();
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder
      .addCase(registerAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userregister = payload.registerData;
        console.log('registration successfull');
      })
      .addCase(registerAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // account verification
    builder
      .addCase(accountVerificationAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(accountVerificationAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accountVerification = payload.accountVerificationData;
      })
      .addCase(accountVerificationAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // account verification link create
    builder
      .addCase(
        accountVerificationLinkCreateAsync.pending,
        (state, { payload }) => {
          state.loading = true;
        }
      )
      .addCase(
        accountVerificationLinkCreateAsync.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.accountVerificationLinkCreate =
            payload.accountVerificationLinkCreateData;
        }
      )
      .addCase(
        accountVerificationLinkCreateAsync.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    // forgot password email
    builder
      .addCase(forgotPasswordEmailAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(forgotPasswordEmailAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.forgotPasswordEmail = payload.forgotPasswordEmailData;
      })
      .addCase(forgotPasswordEmailAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // forgot password otp
    builder
      .addCase(forgotPasswordOtpAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(forgotPasswordOtpAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.forgotPasswordOtp = payload.forgotPasswordOtpData;
      })
      .addCase(forgotPasswordOtpAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // forgot password new password
    builder
      .addCase(forgotPasswordNewPasswordAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(
        forgotPasswordNewPasswordAsync.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.forgotPasswordNewPassword =
            payload.forgotPasswordNewPasswordData;
        }
      )
      .addCase(
        forgotPasswordNewPasswordAsync.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    //   login
    builder
      .addCase(loginAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.loginData;
        // console.log('login successfull');
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   google login
    builder
      .addCase(loginGoogleAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loginGoogleAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.loginData;
      })
      .addCase(loginGoogleAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   profile update
    builder
      .addCase(profileUpdateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(profileUpdateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.profileUpdateData;
        console.log('profile updated!');
      })
      .addCase(profileUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   password update
    builder
      .addCase(passwordUpdateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(passwordUpdateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.passwordUpdateData;
        console.log('password updated!');
      })
      .addCase(passwordUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   user list
    builder
      .addCase(userAllAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(userAllAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.usersData;
        console.log('user list fetched!');
      })
      .addCase(userAllAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
