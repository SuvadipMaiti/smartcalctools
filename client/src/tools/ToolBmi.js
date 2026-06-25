import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolBmiCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolBmi = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultBmiRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolBmi } = useSelector((state) => state.toolReducer);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolBmiDataSubmit = async (e) => {
    e.preventDefault();
    const toolBmiData = new FormData();
    toolBmiData.append('age', age);
    toolBmiData.append('height', height);
    toolBmiData.append('weight', weight);
    toolBmiData.append('gender', gender);
    dispatch(toolBmiCalculateAsync({ toolBmiData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultBmiRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolBmi && toolBmi.bmi && (
        <section ref={resultBmiRef} className="user-profile">
          <h1 className="heading">BMI RESULT</h1>
          <div className="info">
            <div className="user">
              <h3 style={{ color: toolBmi?.color }}>
                {toolBmi && toolBmi.bmi ? toolBmi.bmi : ''}
              </h3>
              <h3 style={{ color: toolBmi?.color }}>
                {toolBmi && toolBmi.category ? toolBmi.category : ''}
              </h3>
              <p>{toolBmi && toolBmi.message ? toolBmi.message : ''}</p>
            </div>
          </div>
        </section>
      )}
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>BMI Calculator (Metric Units)</h3>
          <p>
            Age <span>*</span>
          </p>
          <input
            type="number"
            name="age"
            placeholder="Ages (1-150)"
            required
            className="box"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <p>
            Gender <span>*</span>
          </p>
          <div className="gender-box">
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Male</span>
            </label>

            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Female</span>
            </label>
          </div>
          <p>
            Height <span>*</span>
          </p>
          <input
            type="number"
            name="height"
            placeholder="Height (30 cm - 300cm)"
            required
            className="box"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <p>
            Weight <span>*</span>
          </p>
          <input
            type="number"
            name="weight"
            placeholder="Weight (2 kg - 800 kg)"
            required
            className="box"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="submit"
            value="Calculate"
            name="submit"
            className="btn"
            onClick={toolBmiDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolBmi;
