import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolIbwCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolIbw = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultIbwRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolIbw } = useSelector((state) => state.toolReducer);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolIbwDataSubmit = async (e) => {
    e.preventDefault();
    const toolIbwData = new FormData();
    toolIbwData.append('age', age);
    toolIbwData.append('height', height);
    toolIbwData.append('gender', gender);
    dispatch(toolIbwCalculateAsync({ toolIbwData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultIbwRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolIbw && toolIbw.ibw && (
        <section ref={resultIbwRef} className="user-profile">
          <h1 className="heading">IBW (Ideal Body Weight) Calculator RESULT</h1>
          <div className="info">
            <div className="user">
              <h3 style={{ color: toolIbw?.color }}>
                 Ideal body weight : {toolIbw && toolIbw.ibw ? toolIbw.ibw : ''} kg
              </h3>
              <h3 style={{ color: toolIbw?.color }}>
                Method : {toolIbw && toolIbw.method ? toolIbw.method : ''}
              </h3>
              <h3 style={{ color: toolIbw?.color }}>
                {toolIbw && toolIbw.category ? toolIbw.category : ''}
              </h3>
              <h3 style={{ color: toolIbw?.color }}>
                Healthy BMI Range :{' '}
                {toolIbw && toolIbw.healthyBMIRange
                  ? toolIbw.healthyBMIRange
                  : ''}
              </h3>
              <p>{toolIbw && toolIbw.message ? toolIbw.message : ''}</p>{' '}
            </div>
          </div>
        </section>
      )}
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>IBW (Ideal Body Weight) Calculator (Metric Units)</h3>
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
          <input
            type="submit"
            value="Calculate"
            name="submit"
            className="btn"
            onClick={toolIbwDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolIbw;
