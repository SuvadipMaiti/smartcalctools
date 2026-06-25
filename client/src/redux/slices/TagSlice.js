import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';

export const tagAllAsync = createAsyncThunk(
  'tag/tagAllAsync',
  async ({ page, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.tagAll(page);
      if (response.data.status && page) {

        // toast.success(response.data.message);
        if (page && page === 1) {
          dispatch(setTags(response.data.data));
        } else {
          dispatch(addTags(response.data.data));
        }
        dispatch(setHasMore(response.data.data.length > 0));
      } else {
        // toast.error(response.data.message);
      }
      const tagData = response.data.data;
      return { tagData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const tagShowAsync = createAsyncThunk(
  'tag/tagShowAsync',
  async ({ slug, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.tagShow(slug);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const tagShowData = response.data.data;
      return { tagShowData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tag: {},
    pageCount: 1,
    hasMore: true,
    tags: [],
    tagLists: [],
    error: '',
    loading: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.pageCount = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setTags: (state, action) => {
      state.tagLists = action.payload;
    },
    addTags: (state, action) => {
      state.tagLists = [...state.tagLists, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    // all tag
    builder
      .addCase(tagAllAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(tagAllAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tags = payload.tagData;
        console.log('tags fetch sucessfully!');
      })
      .addCase(tagAllAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tag show
    builder
      .addCase(tagShowAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(tagShowAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tag = payload.tagShowData;
        console.log('tag show data fetch sucessfully!');
      })
      .addCase(tagShowAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setPage, setHasMore, setTags, addTags } = tagSlice.actions;
export default tagSlice.reducer;
