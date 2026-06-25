import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  collectionShowAsync,
  calculatorAddtoCollectionAsync,
} from '../redux/slices/CollectionSlice';
import Select from 'react-select';
import { ProfileCalculatorAsync } from '../redux/slices/CalculatorSlice';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const CalculatorAddtoCollection = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [calculatorno, setCalculatorno] = useState('');
  const [calculator, setCalculator] = useState('');
  const [calculatorId, setCalculatorId] = useState('');
  const [collectionSlug, setCollectionSlug] = useState('');
  const { userId, slug } = useParams();
  const { collection } = useSelector((state) => state.collectionReducer);
  const { profilecalculators } = useSelector(
    (state) => state.calculatorReducer
  );

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    if (collection && collection?.title) {
      setCollectionTitle(collection?.title);
      setCollectionSlug(collection?.slug);
    }
  }, [collection]);

  useEffect(() => {
    if (auth && userId && parseInt(auth.id) === parseInt(userId)) {
      dispatch(collectionShowAsync({ slug, toast }));
      dispatch(ProfileCalculatorAsync({ id, toast }));
    } else {
      toast.error('You are not authorized to edit this collection');
      navigate(url.myProfileCollection());
    }
  }, [id, auth, userId, slug, dispatch, navigate]);

  const calculatorAddSubmit = async (e) => {
    e.preventDefault();
    const collectionData = new FormData();
    collectionData.append('calculatorno', calculatorno);
    collectionData.append('calculatorId', calculatorId);
    dispatch(
      calculatorAddtoCollectionAsync({
        id,
        collectionSlug,
        collectionData,
        dispatch,
        navigate,
        toast,
      })
    );
  };

  const options = profilecalculators.map((calculator) => {
    return {
      label: calculator.title,
      value: calculator.id,
    };
  });
  
  const calculatorChange = (selectedOption) => {
    setCalculator(selectedOption);
    setCalculatorId(selectedOption.value);
  };

  return (
    <section className="form-container">
      <form action="" method="post" encType="multipart/form-data">
        <h3>Add Calculator In Collection</h3>
        <p>
          Collection <span>*</span>
        </p>
        <input
          type="text"
          name="collection"
          placeholder="Collection"
          required
          readOnly
          maxLength="50"
          className="box"
          value={collectionTitle}
        />
        <p>
          Calculator No. <span>*</span>
        </p>
        <input
          type="number"
          name="calculatorno"
          placeholder="Calculator No"
          required
          maxLength="50"
          className="box"
          value={calculatorno}
          onChange={(e) => setCalculatorno(e.target.value)}
        />
        <p>
          Calculator <span>*</span>
        </p>
        <div className="box">
          <Select
            value={calculator}
            onChange={calculatorChange}
            options={options}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          name="submit"
          className="btn"
          onClick={calculatorAddSubmit}
        />
      </form>
    </section>
  );
};

export default CalculatorAddtoCollection;
