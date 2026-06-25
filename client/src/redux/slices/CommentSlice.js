import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';
import * as url from '../../helpers/url';

export const commentDeleteAsync = createAsyncThunk(
  'comment/commentDeleteAsync',
  async (
    { userId, commentId, calculatorId, calculatorslug, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.commentDelete(userId, commentId);
      if (response.data.status) {
        toast.success(response.data.message);
        var page = 1;
        dispatch(setPageComment(page));
        dispatch(commentAllAsync({ calculatorId, page, toast, navigate, dispatch }));
        navigate(url.calculatorView(calculatorslug), { replace: true });
      } else {
        toast.error(response.data.message);
      }
      const commentUpdateData = response.data.data;
      return { commentUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const commentCreateAsync = createAsyncThunk(
  'comment/commentCreateAsync',
  async (
    { userId, calculatorslug, calculatorId, commentData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.commentCreate(commentData, userId);
      if (response.data.status) {
        toast.success(response.data.message);
        var page = 1;
        dispatch(setPageComment(page));
        dispatch(commentAllAsync({ calculatorId, page, toast, navigate, dispatch }));
        navigate(url.calculatorView(calculatorslug), { replace: true });
      } else {
        toast.error(response.data.message);
      }
      const commentSubmitData = response.data.data;
      return { commentSubmitData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const commentUpdateAsync = createAsyncThunk(
  'comment/commentUpdateAsync',
  async (
    { userId, commentId,calculatorId, calculatorslug, commentData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.commentUpdate(commentData, userId, commentId);
      if (response.data.status) {
        toast.success(response.data.message);
        var page = 1;
        dispatch(setPageComment(page));
        dispatch(commentAllAsync({ calculatorId, page, toast, navigate, dispatch }));
        navigate(url.calculatorView(calculatorslug), { replace: true });
      } else {
        toast.error(response.data.message);
      }
      const commentUpdateData = response.data.data;
      return { commentUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const commentAllAsync = createAsyncThunk(
  'comment/commentAllAsync',
  async (
    { calculatorId, page, toast, navigate, dispatch },
    { rejectedWithValue }
  ) => {
    try {
      var response = await apiUrl.commentAll(calculatorId, page);
      if (response.data.status) {
        // toast.success(response.data.message);
        if (page === 1) {
          dispatch(setAllComment(response.data.data));
        } else {
          dispatch(addAllComment(response.data.data));
        }
        dispatch(setHasMoreComment(response.data.data.length > 0));
      } else {
        // toast.error(response.data.message);
      }
      const commentData = response.data.data;
      return { commentData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    pageCountComment: 1,
    hasMoreComment: true,
    comments: [],
    commentLists: [],
    commentCreate: {},
    commentupdate: {},
    commentdelete: {},
    error: '',
    loading: false,
  },
  reducers: {
    setPageComment: (state, action) => {
      state.pageCountComment = action.payload;
    },
    setHasMoreComment: (state, action) => {
      state.hasMoreComment = action.payload;
    },
    setAllComment: (state, action) => {
      state.commentLists = action.payload;
    },
    addAllComment: (state, action) => {
      state.commentLists = [...state.commentLists, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    //   comment list
    builder
      .addCase(commentAllAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(commentAllAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments = payload.commentData;
        console.log('comment fetch sucessfully!');
      })
      .addCase(commentAllAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // comment create
    builder
      .addCase(commentCreateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(commentCreateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.commentCreate = payload.commentSubmitData;
        console.log('comment create sucessfully!');
      })
      .addCase(commentCreateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   comment update
    builder
      .addCase(commentUpdateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(commentUpdateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.commentupdate = payload.commentUpdateData;
        console.log('comment updated sucessfully!');
      })
      .addCase(commentUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   comment delete
    builder
      .addCase(commentDeleteAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(commentDeleteAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.commentdelete = payload.commentDeleteData;
        console.log('comment deleted sucessfully!');
      })
      .addCase(commentDeleteAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setPageComment,
  setHasMoreComment,
  addAllComment,
  setAllComment,
} = commentSlice.actions;
export default commentSlice.reducer;
