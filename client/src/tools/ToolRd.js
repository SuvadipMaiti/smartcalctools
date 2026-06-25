import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolRdCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolRd = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultRdRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolRd } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolRdDataSubmit = async (e) => {
    e.preventDefault();
    const toolRdData = new FormData();
    toolRdData.append('loanAmount', loanAmount);
    toolRdData.append('interest', interest);
    toolRdData.append('tenure', tenure);
    dispatch(toolRdCalculateAsync({ toolRdData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultRdRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolRd && toolRd.monthlyRD && (
        <>
          <section ref={resultRdRef} className="user-profile">
            <h1 className="heading">RD RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolRd && toolRd.principalAmount
                    ? toolRd.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly RD (Rs):{' '}
                  {toolRd && toolRd.monthlyRD ? toolRd.monthlyRD : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolRd && toolRd.totalInterest
                    ? toolRd.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolRd && toolRd.totalPayment ? toolRd.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolRd &&
                toolRd.schedule &&
                toolRd.schedule.length > 0 &&
                toolRd.schedule.map((rd, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {rd?.month ? rd?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {rd?.principalPaid ? rd?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {rd?.interestPaid ? rd?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Rd Paid: {rd?.rd ? rd?.rd : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {rd?.remainingBalance ? rd?.remainingBalance : 0}
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
          <h3>RD Calculator</h3>
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
            onClick={toolRdDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolRd;
