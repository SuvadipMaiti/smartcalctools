import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import calculatorReducer from './slices/CalculatorSlice';
import toolReducer from './slices/ToolSlice';
import collectionReducer from './slices/CollectionSlice';
import tagReducer from './slices/TagSlice';
import commentReducer from './slices/CommentSlice';
import likeViewReducer from './slices/LikeViewSlice';

export default configureStore({
  reducer: {
    authReducer: authReducer,
    calculatorReducer: calculatorReducer,
    toolReducer: toolReducer,
    collectionReducer: collectionReducer,
    tagReducer: tagReducer,
    commentReducer: commentReducer,
    likeViewReducer: likeViewReducer,
  },
});
