import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';


export const likeCreateAsync = createAsyncThunk(
  'likeView/likeCreateAsync',
  async (
    { likeData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.likeCreate(likeData);
      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(
          likeCountAsync({
            likeData,
            dispatch,
            navigate,
            toast,
          })
        );
      } else {
        toast.error(response.data.message);
      }
      const likeSubmitData = response.data.data;
      return { likeSubmitData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);


export const likeCountAsync = createAsyncThunk(
  'likeView/likeCountAsync',
  async (
    { likeData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.likeCount(likeData);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const likeCountData = response.data.data;
      return { likeCountData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const viewCreateAsync = createAsyncThunk(
  'likeView/viewCreateAsync',
  async (
    { viewData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.viewCreate(viewData);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const viewSubmitData = response.data.data;
      return { viewSubmitData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const likeViewSlice = createSlice({
  name: 'likeView',
  initialState: {
    likeCreate: {},
    likeCount: 0,
    viewCount: 0,
    liked: false,
    viewCreate: {},
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // like create
    builder
      .addCase(likeCreateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(likeCreateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.likeCreate = payload.likeSubmitData;
        console.log('like create sucessfully!');
      })
      .addCase(likeCreateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
      // like count
    builder
    .addCase(likeCountAsync.pending, (state, { payload }) => {
      state.loading = true;
    })
    .addCase(likeCountAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.likeCount = payload.likeCountData.likeCount;
      state.viewCount = payload.likeCountData.viewCount;
      state.liked = payload.likeCountData.liked;
      console.log('like count sucessfully!');
    })
    .addCase(likeCountAsync.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // view create
    builder
      .addCase(viewCreateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(viewCreateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.viewCreate = payload.viewSubmitData;
        console.log('view create sucessfully!');
      })
      .addCase(viewCreateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default likeViewSlice.reducer;
