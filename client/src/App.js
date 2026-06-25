import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import AccountVerificationForm from './pages/AccountVerificationForm';
import AccountVerificationLinkCreateForm from './pages/AccountVerificationLinkCreateForm';
import ForgotPasswordEmailForm from './pages/ForgotPasswordEmailForm';
import ForgotPasswordOtpForm from './pages/ForgotPasswordOtpForm';
import ForgotPasswordNewPasswordForm from './pages/ForgotPasswordNewPasswordForm';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyProfileUpdate from './pages/MyProfileUpdate';
import MyPasswordUpdate from './pages/MyPasswordUpdate';
import Error from './pages/Error';
import * as url from './helpers/url';
import ProtectedRoute from './routes/ProtectedRoute';
import MyProfile from './pages/MyProfile';
import MyProfileCalculator from './pages/MyProfileCalculator';
import MyProfileCollection from './pages/MyProfileCollection';
import CalculatorView from './pages/CalculatorView';
import CollectionView from './pages/CollectionView';
import MyProfileCollectionView from './pages/MyProfileCollectionView';
import CalculatorCreate from './pages/CalculatorCreate';
import CollectionCreate from './pages/CollectionCreate';
import CalculatorEdit from './pages/CalculatorEdit';
import CollectionEdit from './pages/CollectionEdit';
import Collections from './pages/Collections';
import Calculators from './pages/Calculators';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
import Teachers from './pages/Teachers';
import CalculatorAddtoCollection from './pages/CalculatorAddtoCollection';
import CalculatorEdittoCollection from './pages/CalculatorEdittoCollection';

function App() {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index name="dashboard" element={<Dashboard />} />
          <Route path={url.about()} name="about" element={<About />} />
          <Route path={url.contact()} name="contact" element={<Contact />} />
          <Route
            path={url.privacyPolicy()}
            name="privacy-policy"
            element={<PrivacyPolicy />}
          />
          <Route
            path={url.termsAndCondition()}
            name="terms-condition"
            element={<TermsAndCondition />}
          />
          <Route path={url.teachers()} name="teachers" element={<Teachers />} />
          <Route path={url.login()} name="login" element={<Login />} />
          <Route
            path={url.accountVerificationLinkCreate()}
            name="account-verification-link-create"
            element={<AccountVerificationLinkCreateForm />}
          />
          <Route
            path={url.accountVerification(':token')}
            name="account-verification"
            element={<AccountVerificationForm />}
          />
          <Route
            path={url.forgotPasswordEmail()}
            name="forgot-password-email"
            element={<ForgotPasswordEmailForm />}
          />
          <Route
            path={url.forgotPasswordOtp()}
            name="forgot-password-otp"
            element={<ForgotPasswordOtpForm />}
          />
          <Route
            path={url.forgotPasswordNewPassword()}
            name="forgot-password-new-password"
            element={<ForgotPasswordNewPasswordForm />}
          />
          <Route path={url.register()} name="register" element={<Register />} />
          <Route path={url.collections()} name="collections" element={<Collections />} />
          <Route path={url.calculators()} name="calculators" element={<Calculators />} /> 
          <Route
            path={url.myProfile()}
            name="my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.calculatorView(':slug')}
            name="calculatorview"
            element={<CalculatorView />}
          />
          <Route
            path={url.myProfileUpdate()}
            name="my-profile-update"
            element={
              <ProtectedRoute>
                <MyProfileUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.myPasswordUpdate()}
            name="my-password-update"
            element={
              <ProtectedRoute>
                <MyPasswordUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.calculatorCreate()}
            name="calculator-create"
            element={
              <ProtectedRoute>
                <CalculatorCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.collectionCreate()}
            name="collection-create"
            element={
              <ProtectedRoute>
                <CollectionCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.calculatorEdit(':userId', ':slug')}
            name="calculator-edit"
            element={
              <ProtectedRoute>
                <CalculatorEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.collectionEdit(':userId', ':slug')}
            name="collection-edit"
            element={
              <ProtectedRoute>
                <CollectionEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.myProfileCalculator()}
            name="my-profile-calculator"
            element={
              <ProtectedRoute>
                <MyProfileCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.myProfileCollection()}
            name="my-profile-collection"
            element={
              <ProtectedRoute>
                <MyProfileCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.calculatorAddtoCollection(':userId', ':slug')}
            name="calculator-addto-collection"
            element={
              <ProtectedRoute>
                <CalculatorAddtoCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.calculatorEdittoCollection(':userId', ':calculatorInCollectionId')}
            name="calculator-editto-collection"
            element={
              <ProtectedRoute>
                <CalculatorEdittoCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.myProfileCollectionView(':slug')}
            name="my-profile-collection-view"
            element={
              <ProtectedRoute>
                <MyProfileCollectionView />
              </ProtectedRoute>
            }
          />
          <Route
            path={url.collectionView(':slug')}
            name="collection-view"
            element={<CollectionView />}
          />
          <Route path="*" name="error" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
