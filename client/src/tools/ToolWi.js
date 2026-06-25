import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolWiCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolWi = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultWiRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolWi } = useSelector((state) => state.toolReducer);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolWiDataSubmit = async (e) => {
    e.preventDefault();
    const toolWiData = new FormData();
    toolWiData.append('age', age);
    toolWiData.append('weight', weight);
    dispatch(toolWiCalculateAsync({ toolWiData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultWiRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolWi && toolWi.baseWaterMl && (
        <section ref={resultWiRef} className="user-profile">
          <h1 className="heading">WI (Water Intake) Calculator RESULT</h1>
          <div className="info">
            <div className="user">
              <h3 style={{ color: 'green' }}>
                Daily Water Recommendation : {toolWi && toolWi.baseWaterMl ? toolWi.baseWaterMl : ''} Ml/Day
              </h3>
              <p
                style={{ padding: '1rem' }}
                dangerouslySetInnerHTML={{
                  __html: toolWi && toolWi?.message ? toolWi?.message : '',
                }}
              ></p>
            </div>
          </div>
        </section>
      )}
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>WI (Water Intake) Calculator (Metric Units)</h3>
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
            onClick={toolWiDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolWi;
