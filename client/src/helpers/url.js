export const register = () => `/register`;
export const login = () => `/login`;
export const accountVerificationLinkCreate = () => `/account-verification-link-create`;
export const accountVerification = (token) => `/account-verification/${token}`;
export const forgotPasswordEmail = () => `/forgot-password-email`;
export const forgotPasswordOtp = () => `/forgot-password-otp`;
export const forgotPasswordNewPassword = () => `/forgot-password-new-password`;
export const dashboard = () => `/`;
export const about = () => `/about`;
export const teachers = () => `/teachers`;
export const contact = () => `/contact`;
export const privacyPolicy = () => `/privacy-policy`;
export const termsAndCondition = () => `/terms-condition`;

export const calculatorView = (slug) => `/calculator/${slug}`;
export const calculatorCreate = () => `/calculator-create`;
export const calculatorEdit = (userId,slug) => `/calculator-edit/${userId}/${slug}`;
export const calculatorDelete = (userId,slug) => `/calculator-delete/${userId}/${slug}`;
export const calculators = () => `/calculators`;

export const toolbmi = () => `/tool-bmi`;
export const toolbmr = () => `/tool-bmr`;
export const tooltdee = () => `/tool-tdee`;
export const toolcalorie = () => `/tool-calorie`;
export const toolbfp = () => `/tool-bfp`;
export const toolibw = () => `/tool-ibw`;
export const toolhrz = () => `/tool-hrz`;
export const toolwi = () => `/tool-wi`;
export const toolpi = () => `/tool-pi`;
export const toolemi = () => `/tool-emi`;  
export const toolsip = () => `/tool-sip`;  
export const toolci = () => `/tool-ci`;  
export const toolfd = () => `/tool-fd`;  
export const toolrd = () => `/tool-rd`;  
export const toolroi = () => `/tool-roi`;  
export const toolts = () => `/tool-ts`;  
export const tooldr = () => `/tool-dr`;  
export const toolsig = () => `/tool-sig`;  

export const myProfileCalculator = () => `/my-profile-calculator`;

export const myProfile = () => `/my-profile`;
export const myProfileUpdate = () => `/my-profile-update`;
export const myPasswordUpdate = () => `/my-password-update`;

export const collections = () => `/collections`;
export const collectionView = (slug) => `/collection/${slug}`;
export const collectionCreate = () => `/collection-create`;
export const collectionEdit = (userId,slug) => `/collection-edit/${userId}/${slug}`;
export const collectionDelete = (userId,slug) => `/collection-delete/${userId}/${slug}`;
export const myProfileCollection = () => `/my-profile-collection`;
export const myProfileCollectionView = (slug) => `/my-profile-collection-view/${slug}`;

export const feed = () => `/feed`;
export const sitemap = () => `/sitemap`;
export const sitemapcollection = () => `/sitemap-collection`;
export const sitemapcalculator = () => `/sitemap-calculator`;

export const calculatorAddtoCollection = (userId,slug) => `/calculator-addto-collection/${userId}/${slug}`;
export const calculatorEdittoCollection = (userId,calculatorInCollectionId) => `/calculator-editto-collection/${userId}/${calculatorInCollectionId}`;


