import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolHrzCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolHrz = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultHrzRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolHrz } = useSelector((state) => state.toolReducer);
  const [age, setAge] = useState('');
  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolHrzDataSubmit = async (e) => {
    e.preventDefault();
    const toolHrzData = new FormData();
    toolHrzData.append('age', age);
    dispatch(toolHrzCalculateAsync({ toolHrzData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultHrzRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolHrz && toolHrz.hrMax && (
        <section ref={resultHrzRef} className="user-profile">
          <h1 className="heading">HRZ (Heart Rate Zone) Calculator RESULT</h1>
          <div className="info">
            <div className="user">
              <h3 style={{ color: 'green' }}>
                Maximum heart rate (HRmax) :{' '} 
                {toolHrz && toolHrz.hrMax ? toolHrz.hrMax : ''} BPM
              </h3>
              <h3 style={{ color: 'green' }}>
                Method : {toolHrz && toolHrz.method ? toolHrz.method : ''}
              </h3>
              <p
                style={{ padding: '1rem' }}
                dangerouslySetInnerHTML={{
                  __html: toolHrz && toolHrz?.message ? toolHrz?.message : '',
                }}
              ></p>
            </div>
          </div>
        </section>
      )}
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>HRZ (Heart Rate Zone) Calculator (Metric Units)</h3>
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
          <input
            type="submit"
            value="Calculate"
            name="submit"
            className="btn"
            onClick={toolHrzDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolHrz;
