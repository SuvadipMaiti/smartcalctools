import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  calculatorInCollectionShowAsync,
  calculatorEdittoCollectionAsync,
} from '../redux/slices/CollectionSlice';
import Select from 'react-select';
import { ProfileCalculatorAsync } from '../redux/slices/CalculatorSlice';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const CalculatorEdittoCollection = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [calculatorno, setCalculatorno] = useState('');
  const [calculator, setCalculator] = useState('');
  const [calculatorId, setCalculatorId] = useState('');
  const [collectionSlug, setCollectionSlug] = useState('');
  const { userId, calculatorInCollectionId } = useParams();
  const { calculatorInCollection } = useSelector(
    (state) => state.collectionReducer
  );
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
    if (calculatorInCollection && calculatorInCollection?.belongsToCollection) {
      setCollectionTitle(calculatorInCollection?.belongsToCollection?.title);
      setCollectionSlug(calculatorInCollection?.belongsToCollection?.slug);
      setCalculatorno(calculatorInCollection?.calculatorno);
      setCalculator({
        label: calculatorInCollection?.belongsToCalculator?.title,
        value: calculatorInCollection?.belongsToCalculator?.id,
      });
    }
  }, [calculatorInCollection]);

  useEffect(() => {
    if (auth && userId && parseInt(auth.id) === parseInt(userId)) {
      dispatch(
        calculatorInCollectionShowAsync({ calculatorInCollectionId, toast })
      );
      dispatch(ProfileCalculatorAsync({ id, toast }));
    } else {
      toast.error('You are not authorized to edit this collection');
      navigate(url.myProfileCollection());
    }
  }, [id, auth, userId, calculatorInCollectionId, dispatch, navigate]);

  const calculatorEditSubmit = async (e) => {
    e.preventDefault();
    const collectionData = new FormData();
    collectionData.append('calculatorInCollectionId', calculatorInCollectionId);
    collectionData.append('calculatorno', calculatorno);
    collectionData.append('calculatorId', calculatorId);
    dispatch(
      calculatorEdittoCollectionAsync({
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
        <h3>Edit Calculator In Collection</h3>
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
          onClick={calculatorEditSubmit}
        />
      </form>
    </section>
  );
};

export default CalculatorEdittoCollection;
