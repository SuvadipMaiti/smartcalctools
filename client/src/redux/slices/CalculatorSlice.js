import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';
import * as url from '../../helpers/url';
import { profileUpdateAsync } from './AuthSlice';

export const ProfileCalculatorAsync = createAsyncThunk(
  'calculator/ProfileCalculatorAsync',
  async ({ id, page, search, toast, navigate,dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.ProfileCalculator(id, page, search);
      if (response.data.status) {
        // toast.success(response.data.message);
        if (page === 1) {
          dispatch(setProfilecalculators(response.data.data));
        } else {
          dispatch(addProfilecalculators(response.data.data));
        }
        dispatch(setHasMore(response.data.data.length > 0));
      } else {
        // toast.error(response.data.message);
      }
      console.log(response.data.data);
      const ProfileCalculatorsData = response.data.data;
      return { ProfileCalculatorsData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorDeleteAsync = createAsyncThunk(
  'calculator/calculatorDeleteAsync',
  async ({ id, slug, dispatch, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.calculatorDelete(id, slug);
      if (response.data.status) {
        toast.success(response.data.message);
        // dispatch(ProfileCalculatorAsync({ id, toast }));
        navigate(url.myProfile());
      } else {
        toast.error(response.data.message);
      }
      const calculatorUpdateData = response.data.data;
      return { calculatorUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorCreateAsync = createAsyncThunk(
  'calculator/calculatorCreateAsync',
  async (
    { id, calculatorData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.calculatorCreate(calculatorData, id);
      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(ProfileCalculatorAsync({ id, toast }));
        navigate(url.myProfileCalculator());
      } else {
        toast.error(response.data.message);
      }
      const calculatorSubmitData = response.data.data;
      return { calculatorSubmitData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorShowAsync = createAsyncThunk(
  'calculator/calculatorShowAsync',
  async ({ slug, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.calculatorShow(slug);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const calculatorShowData = response.data.data;
      return { calculatorShowData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorUpdateAsync = createAsyncThunk(
  'calculator/calculatorUpdateAsync',
  async (
    { id, slug, calculatorData, dispatch, navigate, toast },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.calculatorUpdate(calculatorData, id, slug);
      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(ProfileCalculatorAsync({ id, toast }));
        navigate(url.myProfileCalculator());
      } else {
        toast.error(response.data.message);
      }
      const calculatorUpdateData = response.data.data;
      return { calculatorUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorAllAsync = createAsyncThunk(
  'calculator/calculatorAllAsync',
  async ({ authid, page, search, toast, navigate,dispatch }, { rejectedWithValue }) => {
    try {
      var response = [];
      if (search && search.length > 0) {
      } else {
        search = undefined;
      }
      if (authid) {
      } else {
        authid = undefined;
      }
      response = await apiUrl.calculatorAll(authid, page, search);
      if (response.data.status) {
        // toast.success(response.data.message);
        if (page === 1) {
          dispatch(setAllCalculator(response.data.data));
        } else {
          dispatch(addAllCalculator(response.data.data));
        }
        dispatch(setHasMore(response.data.data.length > 0));
      } else {
        // toast.error(response.data.message);
      }
      const calculatorData = response.data.data;
      console.log('calculatorData = response.data.data', calculatorData);
      return { calculatorData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorAllRelevantAsync = createAsyncThunk(
  'calculator/calculatorAllRelevantAsync',
  async ({ authid, page, search, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      var response = [];
      if (search && search.length > 0) {
      } else {
        search = undefined;
      }
      if (authid && authid.length > 0) {
      } else {
        authid = undefined;
      }
      response = await apiUrl.calculatorAll(authid, page, search);
      if (response.data.status) {
        // toast.success(response.data.message);
        if (page === 1) {
          dispatch(setAllRelevant(response.data.data));
        } else {
          dispatch(addAllRelevant(response.data.data));
        }
        dispatch(setHasMore(response.data.data.length > 0));
      } else {
        // toast.error(response.data.message);
      }
      const calculatorRelevantData = response.data.data;
      return { calculatorRelevantData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const calculatorAllByTagAsync = createAsyncThunk(
  'calculator/calculatorAllByTagAsync',
  async ({ page, tagId, toast, navigate,dispatch }, { rejectedWithValue }) => {
    try {
      var response = await apiUrl.calculatorAllByTag(page, tagId);
      if (response.data.status) {
        if (page === 1) {
          dispatch(setCalculatorByTags(response.data.data));
        } else {
          dispatch(addCalculatorByTags(response.data.data));
        }
        dispatch(setHasMore(response.data.data.length > 0));
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
      const calculatorByTagData = response.data.data;
      return { calculatorByTagData };
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    calculator: {},
    pageCount: 1,
    hasMore: true,
    searchKeyword: '',
    calculators: [],
    calculatorLists: [],
    calculatorRelevants: [],
    calculatorRelevantLists: [],
    calculatorByTags: [],
    calculatorByTagLists: [],
    calculatorCreate: {},
    calculatorupdate: {},
    calculatordelete: {},
    profilecalculators: [],
    profileCalculatorLists: [],
    error: '',
    loading: false,
  },
  reducers: {
    searchKeywordAsync: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setPage: (state, action) => {
      state.pageCount = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setCalculatorByTags: (state, action) => {
      state.calculatorByTagLists = action.payload;
    },
    addCalculatorByTags: (state, action) => {
      state.calculatorByTagLists = [...state.calculatorByTagLists, ...action.payload];
    },
    setProfilecalculators: (state, action) => {
      state.profileCalculatorLists = action.payload;
    },
    addProfilecalculators: (state, action) => {
      state.profileCalculatorLists = [...state.profileCalculatorLists, ...action.payload];
    },
    setAllCalculator: (state, action) => {
      state.calculatorLists = action.payload;
    },
    addAllCalculator: (state, action) => {
      state.calculatorLists = [...state.calculatorLists, ...action.payload];
    },
    setAllRelevant: (state, action) => {
      state.calculatorRelevantLists = action.payload;
    },
    addAllRelevant: (state, action) => {
      state.calculatorRelevantLists = [...state.calculatorRelevantLists, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    //   calculator list
    builder
      .addCase(calculatorAllAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorAllAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculators = payload.calculatorData;
        console.log('calculator fetch sucessfully!');
      })
      .addCase(calculatorAllAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator relevant list
    builder
      .addCase(calculatorAllRelevantAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorAllRelevantAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorRelevants = payload.calculatorRelevantData;
        console.log('calculator relevant list fetch sucessfully!');
      })
      .addCase(calculatorAllRelevantAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator by keyword list
    builder
      .addCase(calculatorAllByTagAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorAllByTagAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorByTags = payload.calculatorByTagData;
        console.log('calculator by tag list fetch sucessfully!');
      })
      .addCase(calculatorAllByTagAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // calculator create
    builder
      .addCase(calculatorCreateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorCreateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorCreate = payload.calculatorSubmitData;
        console.log('calculator create sucessfully!');
      })
      .addCase(calculatorCreateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // profile calculators
    builder
      .addCase(ProfileCalculatorAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(ProfileCalculatorAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profilecalculators = payload.ProfileCalculatorsData;
        console.log('Profile calculator fetch sucessfully!');
      })
      .addCase(profileUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator show
    builder
      .addCase(calculatorShowAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorShowAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculator = payload.calculatorShowData;
        console.log('calculator show data fetch sucessfully!');
      })
      .addCase(calculatorShowAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator update
    builder
      .addCase(calculatorUpdateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorUpdateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorupdate = payload.calculatorUpdateData;
        console.log('calculator updated sucessfully!');
      })
      .addCase(calculatorUpdateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   calculator delete
    builder
      .addCase(calculatorDeleteAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(calculatorDeleteAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatordelete = payload.calculatorDeleteData;
        console.log('calculator deleted sucessfully!');
      })
      .addCase(calculatorDeleteAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { searchKeywordAsync,setPage,setHasMore,setCalculatorByTags,addCalculatorByTags,setProfilecalculators,addProfilecalculators,addAllCalculator,setAllCalculator,setAllRelevant,addAllRelevant } = calculatorSlice.actions;
export default calculatorSlice.reducer;
