import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolTsCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolTs = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultTsRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolTs } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolTsDataSubmit = async (e) => {
    e.preventDefault();
    const toolTsData = new FormData();
    toolTsData.append('loanAmount', loanAmount);
    toolTsData.append('interest', interest);
    toolTsData.append('tenure', tenure);
    dispatch(toolTsCalculateAsync({ toolTsData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultTsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolTs && toolTs.monthlyTS && (
        <>
          <section ref={resultTsRef} className="user-profile">
            <h1 className="heading">TS RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolTs && toolTs.principalAmount
                    ? toolTs.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly TS (Rs):{' '}
                  {toolTs && toolTs.monthlyTS ? toolTs.monthlyTS : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolTs && toolTs.totalInterest
                    ? toolTs.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolTs && toolTs.totalPayment ? toolTs.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolTs &&
                toolTs.schedule &&
                toolTs.schedule.length > 0 &&
                toolTs.schedule.map((ts, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {ts?.month ? ts?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {ts?.principalPaid ? ts?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {ts?.interestPaid ? ts?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Ts Paid: {ts?.ts ? ts?.ts : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {ts?.remainingBalance ? ts?.remainingBalance : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
      <section className="form-container">
        <form action="" method="post" encType="multipart/form-data">
          <h3>TS Calculator</h3>
          <p>
            Loan Amount (Rs) <span>*</span>
          </p>
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount (Rs)"
            required
            className="box"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <p>
            Interest (%) <span>*</span>
          </p>
          <input
            type="number"
            name="interest"
            placeholder="Interest (1 % - 50 %)"
            required
            className="box"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
          <p>
            Tenure (months) <span>*</span>
          </p>
          <input
            type="number"
            name="tenure"
            placeholder="Tenure (1 - 1000 months)"
            required
            className="box"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
          <input
            type="submit"
            value="Calculate"
            name="submit"
            className="btn"
            onClick={toolTsDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolTs;
