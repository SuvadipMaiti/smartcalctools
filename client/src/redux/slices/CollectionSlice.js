import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';
import * as url from '../../helpers/url';
import { profileUpdateAsync } from './AuthSlice';

export const ProfileCollectionAsync = createAsyncThunk(
  'collection/ProfileCollectionAsync',
  async ({ id, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.ProfileCollection(id);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const ProfileCollectionsData = response.data.data;
      return { ProfileCollectionsData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const collectionCreateAsync = createAsyncThunk(
  'collection/collectionCreateAsync',
  async (
    { id, collectionData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.collectionCreate(collectionData, id);
      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(ProfileCollectionAsync({ id, toast }));
        navigate(url.myProfileCollection());
      } else {
        toast.error(response.data.message);
      }
      const collectionSubmitData = response.data.data;
      return { collectionSubmitData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const collectionShowAsync = createAsyncThunk(
  'collection/collectionShowAsync',
  async ({ slug, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.collectionShow(slug);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const collectionShowData = response.data.data;
      return { collectionShowData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorInCollectionShowAsync = createAsyncThunk(
  'collection/calculatorInCollectionShowAsync',
  async ({ calculatorInCollectionId, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.calculatorInCollectionShow(calculatorInCollectionId);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const calculatorInCollectionShowData = response.data.data;
      return { calculatorInCollectionShowData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const collectionUpdateAsync = createAsyncThunk(
  'collection/collectionUpdateAsync',
  async (
    { id, slug, collectionData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.collectionUpdate(collectionData, id, slug);
      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(ProfileCollectionAsync({ id, toast }));
        navigate(url.myProfileCollection());
      } else {
        toast.error(response.data.message);
      }
      const collectionUpdateData = response.data.data;
      return { collectionUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const collectionAllAsync = createAsyncThunk(
  'collection/collectionAllAsync',
  async ({ toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.collectionAll();
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const collectionData = response.data.data;
      return { collectionData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorAddtoCollectionAsync = createAsyncThunk(
  'collection/calculatorAddtoCollectionAsync',
  async (
    { id, collectionSlug, collectionData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.calculatorAddtoCollection(collectionData, id, collectionSlug);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.myProfileCollectionView(collectionSlug));
      } else {
        toast.error(response.data.message);
      }
      const calculatorAddtoCollectionData = response.data.data;
      return { calculatorAddtoCollectionData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorEdittoCollectionAsync = createAsyncThunk(
  'collection/calculatorEdittoCollectionAsync',
  async (
    { id, collectionSlug, collectionData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.calculatorEdittoCollection(collectionData, id, collectionSlug);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.myProfileCollectionView(collectionSlug));
      } else {
        toast.error(response.data.message);
      }
      const calculatorEdittoCollectionData = response.data.data;
      return { calculatorEdittoCollectionData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collection: {},
    collections: [],
    collectionCreate: {},
    collectionupdate: {},
    profilecollections: [],
    calculatorAddtoCollection: {},
    calculatorEdittoCollection: {},
    calculatorInCollectionShow: {},
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //   collection update
    builder
      .addCase(collectionAllAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(collectionAllAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.collections = payload.collectionData;
        console.log('collection fetch sucessfully!');
      })
      .addCase(collectionAllAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // collection create
    builder
      .addCase(collectionCreateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(collectionCreateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.collectionCreate = payload.collectionSubmitData;
        console.log('collection create sucessfully!');
      })
      .addCase(collectionCreateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // profile collections
    builder
      .addCase(ProfileCollectionAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(ProfileCollectionAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profilecollections = payload.ProfileCollectionsData;
        console.log('Profile collection fetch sucessfully!');
      })
      .addCase(profileUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   collection show
    builder
      .addCase(collectionShowAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(collectionShowAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.collection = payload.collectionShowData;
        console.log('collection show data fetch sucessfully!');
      })
      .addCase(collectionShowAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator in collection show
    builder
      .addCase(calculatorInCollectionShowAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorInCollectionShowAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorInCollection = payload.calculatorInCollectionShowData;
        console.log('calculator in collection show data fetch sucessfully!');
      })
      .addCase(calculatorInCollectionShowAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   collection update
    builder
      .addCase(collectionUpdateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(collectionUpdateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.collectionupdate = payload.collectionUpdateData;
        console.log('collection updated sucessfully!');
      })
      .addCase(collectionUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator add to collection
    builder
      .addCase(calculatorAddtoCollectionAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorAddtoCollectionAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorAddtoCollection = payload.calculatorAddtoCollectionData;
        console.log('calculator added to collection sucessfully!');
      })
      .addCase(calculatorAddtoCollectionAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator edit to collection
    builder
      .addCase(calculatorEdittoCollectionAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorEdittoCollectionAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorEdittoCollection = payload.calculatorEdittoCollectionData;
        console.log('calculator edited to collection sucessfully!');
      })
      .addCase(calculatorEdittoCollectionAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default collectionSlice.reducer;
