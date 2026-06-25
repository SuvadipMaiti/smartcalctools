import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';

export const toolBmiCalculateAsync = createAsyncThunk(
  'tool/toolBmiCalculateAsync',
  async ({ toolBmiData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolBmiCalculate(toolBmiData);
      const toolBmiCalculateData = response.data.data;
      return { toolBmiCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolBmrCalculateAsync = createAsyncThunk(
  'tool/toolBmrCalculateAsync',
  async ({ toolBmrData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolBmrCalculate(toolBmrData);
      const toolBmrCalculateData = response.data.data;
      return { toolBmrCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolTdeeCalculateAsync = createAsyncThunk(
  'tool/toolTdeeCalculateAsync',
  async (
    { toolTdeeData, toast, navigate, dispatch },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.toolTdeeCalculate(toolTdeeData);
      const toolTdeeCalculateData = response.data.data;
      return { toolTdeeCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolCalorieCalculateAsync = createAsyncThunk(
  'tool/toolCalorieCalculateAsync',
  async (
    { toolCalorieData, toast, navigate, dispatch },
    { rejectedWithValue }
  ) => {
    try {
      const response = await apiUrl.toolCalorieCalculate(toolCalorieData);
      const toolCalorieCalculateData = response.data.data;
      return { toolCalorieCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolBfpCalculateAsync = createAsyncThunk(
  'tool/toolBfpCalculateAsync',
  async ({ toolBfpData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolBfpCalculate(toolBfpData);
      const toolBfpCalculateData = response.data.data;
      return { toolBfpCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolIbwCalculateAsync = createAsyncThunk(
  'tool/toolIbwCalculateAsync',
  async ({ toolIbwData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolIbwCalculate(toolIbwData);
      const toolIbwCalculateData = response.data.data;
      return { toolIbwCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolHrzCalculateAsync = createAsyncThunk(
  'tool/toolHrzCalculateAsync',
  async ({ toolHrzData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolHrzCalculate(toolHrzData);
      const toolHrzCalculateData = response.data.data;
      return { toolHrzCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolWiCalculateAsync = createAsyncThunk(
  'tool/toolWiCalculateAsync',
  async ({ toolWiData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolWiCalculate(toolWiData);
      const toolWiCalculateData = response.data.data;
      return { toolWiCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolPiCalculateAsync = createAsyncThunk(
  'tool/toolPiCalculateAsync',
  async ({ toolPiData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolPiCalculate(toolPiData);
      const toolPiCalculateData = response.data.data;
      return { toolPiCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolEmiCalculateAsync = createAsyncThunk(
  'tool/toolEmiCalculateAsync',
  async ({ toolEmiData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolEmiCalculate(toolEmiData);
      const toolEmiCalculateData = response.data.data;
      return { toolEmiCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolSigCalculateAsync = createAsyncThunk(
  'tool/toolSigCalculateAsync',
  async ({ toolSigData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolSigCalculate(toolSigData);
      const toolSigCalculateData = response.data.data;
      return { toolSigCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolDrCalculateAsync = createAsyncThunk(
  'tool/toolDrCalculateAsync',
  async ({ toolDrData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolDrCalculate(toolDrData);
      const toolDrCalculateData = response.data.data;
      return { toolDrCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolTsCalculateAsync = createAsyncThunk(
  'tool/toolTsCalculateAsync',
  async ({ toolTsData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolTsCalculate(toolTsData);
      const toolTsCalculateData = response.data.data;
      return { toolTsCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolRoiCalculateAsync = createAsyncThunk(
  'tool/toolRoiCalculateAsync',
  async ({ toolRoiData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolRoiCalculate(toolRoiData);
      const toolRoiCalculateData = response.data.data;
      return { toolRoiCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolRdCalculateAsync = createAsyncThunk(
  'tool/toolRdCalculateAsync',
  async ({ toolRdData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolRdCalculate(toolRdData);
      const toolRdCalculateData = response.data.data;
      return { toolRdCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolFdCalculateAsync = createAsyncThunk(
  'tool/toolFdCalculateAsync',
  async ({ toolFdData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolFdCalculate(toolFdData);
      const toolFdCalculateData = response.data.data;
      return { toolFdCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolCiCalculateAsync = createAsyncThunk(
  'tool/toolCiCalculateAsync',
  async ({ toolCiData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolCiCalculate(toolCiData);
      const toolCiCalculateData = response.data.data;
      return { toolCiCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const toolSipCalculateAsync = createAsyncThunk(
  'tool/toolSipCalculateAsync',
  async ({ toolSipData, toast, navigate, dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.toolSipCalculate(toolSipData);
      const toolSipCalculateData = response.data.data;
      return { toolSipCalculateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    toolBmi: {},
    toolBmr: {},
    toolTdee: {},
    toolCalorie: {},
    toolBfp: {},
    toolIbw: {},
    toolHrz: {},
    toolWi: {},
    toolPi: {},
    toolEmi: {},
    toolSip: {},
    toolCi: {},
    toolFd: {},
    toolRd: {},
    toolRoi: {},
    toolTs: {},
    toolDr: {},
    toolSig: {},
    error: '',
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //   tool bmi calculate
    builder
      .addCase(toolBmiCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolBmiCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolBmi = payload.toolBmiCalculateData;
        console.log('tool bmi data fetch sucessfully!');
      })
      .addCase(toolBmiCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool bmr calculate
    builder
      .addCase(toolBmrCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolBmrCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolBmr = payload.toolBmrCalculateData;
        console.log('tool bmr data fetch sucessfully!');
      })
      .addCase(toolBmrCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool tdee calculate
    builder
      .addCase(toolTdeeCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolTdeeCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolTdee = payload.toolTdeeCalculateData;
        console.log('tool tdee data fetch sucessfully!');
      })
      .addCase(toolTdeeCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool calorie calculate
    builder
      .addCase(toolCalorieCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolCalorieCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolCalorie = payload.toolCalorieCalculateData;
        console.log('tool calorie data fetch sucessfully!');
      })
      .addCase(toolCalorieCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool bfp calculate
    builder
      .addCase(toolBfpCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolBfpCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolBfp = payload.toolBfpCalculateData;
        console.log('tool bfp data fetch sucessfully!');
      })
      .addCase(toolBfpCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool ibw calculate
    builder
      .addCase(toolIbwCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolIbwCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolIbw = payload.toolIbwCalculateData;
        console.log('tool ibw data fetch sucessfully!');
      })
      .addCase(toolIbwCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool hrz calculate
    builder
      .addCase(toolHrzCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolHrzCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolHrz = payload.toolHrzCalculateData;
        console.log('tool hrz data fetch sucessfully!');
      })
      .addCase(toolHrzCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool wi calculate
    builder
      .addCase(toolWiCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolWiCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolWi = payload.toolWiCalculateData;
        console.log('tool wi data fetch sucessfully!');
      })
      .addCase(toolWiCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool pi calculate
    builder
      .addCase(toolPiCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolPiCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolPi = payload.toolPiCalculateData;
        console.log('tool pi data fetch sucessfully!');
      })
      .addCase(toolPiCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool emi calculate
    builder
      .addCase(toolEmiCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolEmiCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolEmi = payload.toolEmiCalculateData;
        console.log('tool emi data fetch sucessfully!');
      })
      .addCase(toolEmiCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool sip calculate
    builder
      .addCase(toolSipCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolSipCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolSip = payload.toolSipCalculateData;
        console.log('tool sip data fetch sucessfully!');
      })
      .addCase(toolSipCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool ci calculate
    builder
      .addCase(toolCiCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolCiCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolCi = payload.toolCiCalculateData;
        console.log('tool ci data fetch sucessfully!');
      })
      .addCase(toolCiCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool fd calculate
    builder
      .addCase(toolFdCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolFdCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolFd = payload.toolFdCalculateData;
        console.log('tool fd data fetch sucessfully!');
      })
      .addCase(toolFdCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool rd calculate
    builder
      .addCase(toolRdCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolRdCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolRd = payload.toolRdCalculateData;
        console.log('tool rd data fetch sucessfully!');
      })
      .addCase(toolRdCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool roi calculate
    builder
      .addCase(toolRoiCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolRoiCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolRoi = payload.toolRoiCalculateData;
        console.log('tool roi data fetch sucessfully!');
      })
      .addCase(toolRoiCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool ts calculate
    builder
      .addCase(toolTsCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolTsCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolTs = payload.toolTsCalculateData;
        console.log('tool ts data fetch sucessfully!');
      })
      .addCase(toolTsCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool dr calculate
    builder
      .addCase(toolDrCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolDrCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolDr = payload.toolDrCalculateData;
        console.log('tool dr data fetch sucessfully!');
      })
      .addCase(toolDrCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   tool sig calculate
    builder
      .addCase(toolSigCalculateAsync.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(toolSigCalculateAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.toolSig = payload.toolSigCalculateData;
        console.log('tool sig data fetch sucessfully!');
      })
      .addCase(toolSigCalculateAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default toolSlice.reducer;
