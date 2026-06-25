import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolCiCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolCi = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultCiRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolCi } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolCiDataSubmit = async (e) => {
    e.preventDefault();
    const toolCiData = new FormData();
    toolCiData.append('loanAmount', loanAmount);
    toolCiData.append('interest', interest);
    toolCiData.append('tenure', tenure);
    dispatch(toolCiCalculateAsync({ toolCiData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultCiRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolCi && toolCi.monthlyCI && (
        <>
          <section ref={resultCiRef} className="user-profile">
            <h1 className="heading">CI RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolCi && toolCi.principalAmount
                    ? toolCi.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly CI (Rs):{' '}
                  {toolCi && toolCi.monthlyCI ? toolCi.monthlyCI : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolCi && toolCi.totalInterest
                    ? toolCi.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolCi && toolCi.totalPayment ? toolCi.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolCi &&
                toolCi.schedule &&
                toolCi.schedule.length > 0 &&
                toolCi.schedule.map((ci, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {ci?.month ? ci?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {ci?.principalPaid ? ci?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {ci?.interestPaid ? ci?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Ci Paid: {ci?.ci ? ci?.ci : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {ci?.remainingBalance ? ci?.remainingBalance : 0}
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
          <h3>CI Calculator</h3>
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
            onClick={toolCiDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolCi;
