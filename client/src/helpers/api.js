import axios from 'axios';
import { apiBase } from './urlConfig';

const api = axios.create({
  baseURL: apiBase,
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem('auth')) {
    const authData = JSON.parse(localStorage.getItem('auth'));
    const tokenId = authData?.token;
    req.headers.Authorization = `Bearer ${tokenId}`;
  }
  return req;
});

export const register = (userData) => api.post('/user/register', userData);
export const accountVerification = (userData) => api.post('/user/account-activation',userData);
export const accountVerificationLinkCreate = (userData) => api.post('/user/account-activation-link-create',userData);
export const forgotPasswordEmail = (userData) => api.post('/user/forgot-password-email', userData);
export const forgotPasswordOtp = (userData) => api.post('/user/forgot-password-otp', userData);
export const forgotPasswordNewPassword = (userData) => api.post('/user/forgot-password-new-password', userData);
export const login = (userData) => api.post('/user/login', userData);

export const logingoogle = (userData) => api.post('/user/logingoogle', userData);

export const profileUpdate = (profileData,id) => api.put(`/user/profile/${id}`, profileData);
export const passwordUpdate = (profileData,id) => api.put(`/user/password/${id}`, profileData);
export const userAll = () => api.get(`/user`);

export const tagAll = (page) => api.get(`/tag?page=${page}`);
export const tagShow = (slug) => api.get(`/tag/${slug}`);

export const calculatorAll = (authid,page,search) => api.get(`/calculator/list?authid=${authid}&page=${page}&search=${search}`);
export const calculatorAllByTag = (page,tagId) => api.get(`/calculator/list-by-tag?page=${page}&tagId=${tagId}`);
 
export const calculatorCreate = (calculatorData,id) => api.post(`/calculator/${id}`, calculatorData);
export const ProfileCalculator = (id,page,search) => api.get(`/calculator/profile?id=${id}&page=${page}&search=${search}`);
export const calculatorShow = (slug) => api.get(`/calculator/${slug}`);
export const calculatorUpdate = (calculatorData,id,slug) => api.put(`/calculator/${id}/${slug}`, calculatorData);
export const calculatorDelete = (id,slug) => api.delete(`/calculator/delete/${id}/${slug}`);

export const toolBmiCalculate = (toolBmiData) => api.post(`/tool/tool-bmi`, toolBmiData);
export const toolBmrCalculate = (toolBmrData) => api.post(`/tool/tool-bmr`, toolBmrData);
export const toolTdeeCalculate = (toolTdeeData) => api.post(`/tool/tool-tdee`, toolTdeeData);
export const toolCalorieCalculate = (toolCalorieData) => api.post(`/tool/tool-calorie`, toolCalorieData);
export const toolBfpCalculate = (toolBfpData) => api.post(`/tool/tool-bfp`, toolBfpData);
export const toolIbwCalculate = (toolIbwData) => api.post(`/tool/tool-ibw`, toolIbwData);
export const toolHrzCalculate = (toolHrzData) => api.post(`/tool/tool-hrz`, toolHrzData);
export const toolWiCalculate = (toolWiData) => api.post(`/tool/tool-wi`, toolWiData);
export const toolPiCalculate = (toolPiData) => api.post(`/tool/tool-pi`, toolPiData);
export const toolEmiCalculate = (toolEmiData) => api.post(`/tool/tool-emi`, toolEmiData);
export const toolSipCalculate = (toolSipData) => api.post(`/tool/tool-sip`, toolSipData);
export const toolCiCalculate = (toolCiData) => api.post(`/tool/tool-ci`, toolCiData);
export const toolFdCalculate = (toolFdData) => api.post(`/tool/tool-fd`, toolFdData);
export const toolRdCalculate = (toolRdData) => api.post(`/tool/tool-rd`, toolRdData);
export const toolRoiCalculate = (toolRoiData) => api.post(`/tool/tool-roi`, toolRoiData);
export const toolTsCalculate = (toolTsData) => api.post(`/tool/tool-ts`, toolTsData);
export const toolDrCalculate = (toolDrData) => api.post(`/tool/tool-dr`, toolDrData);
export const toolSigCalculate = (toolSigData) => api.post(`/tool/tool-sig`, toolSigData);

export const commentAll = (calculatorId,page) => api.get(`/comment/list?calculatorId=${calculatorId}&page=${page}`); 
export const commentCreate = (commentData,userId) => api.post(`/comment/${userId}`, commentData);
export const commentUpdate = (commentData,userId,commentId) => api.put(`/comment/${userId}/${commentId}`, commentData);
export const commentDelete = (userId,commentId) => api.delete(`/comment/delete/${userId}/${commentId}`);

export const likeCreate = (likeData) => api.post(`/like-view/like`, likeData);
export const likeCount = (likeData) => api.post(`/like-view/like-count`, likeData);
export const viewCreate = (viewData) => api.post(`/like-view/view`, viewData);


export const collectionAll = () => api.get(`/collection`); 
export const collectionCreate = (collectionData,id) => api.post(`/collection/${id}`, collectionData);
export const ProfileCollection = (id) => api.get(`/collection/profile/${id}`);
export const collectionShow = (slug) => api.get(`/collection/${slug}`);
export const calculatorInCollectionShow = (calculatorInCollectionId) => api.get(`/collection/calculator-in-collection-show/${calculatorInCollectionId}`);
export const collectionUpdate = (collectionData,id,slug) => api.put(`/collection/${id}/${slug}`, collectionData);

export const calculatorAddtoCollection = (collectionData,id,collectionSlug) => api.put(`/collection/calculator-addto-collection/${id}/${collectionSlug}`, collectionData);
export const calculatorEdittoCollection = (collectionData,id,collectionSlug) => api.put(`/collection/calculator-editto-collection/${id}/${collectionSlug}`, collectionData);

