import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolBmrCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolBmr = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultBmrRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolBmr } = useSelector((state) => state.toolReducer);
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

  const toolBmrDataSubmit = async (e) => {
    e.preventDefault();
    const toolBmrData = new FormData();
    toolBmrData.append('age', age);
    toolBmrData.append('height', height);
    toolBmrData.append('weight', weight);
    toolBmrData.append('gender', gender);
    dispatch(toolBmrCalculateAsync({ toolBmrData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultBmrRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolBmr && toolBmr.bmr && (
        <section ref={resultBmrRef} className="user-profile">
          <h1 className="heading">BMR RESULT</h1>
          <div className="info">
            <div className="user">
              <p
                className="description"
                style={{ padding: '1rem' }}
                dangerouslySetInnerHTML={{
                  __html: toolBmr && toolBmr.message ? toolBmr.message : '',
                }}
              ></p>
            </div>
          </div>
        </section>
      )}
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>BMR Calculator (Metric Units)</h3>
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
            onClick={toolBmrDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolBmr;
