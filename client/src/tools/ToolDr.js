import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolDrCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolDr = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultDrRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolDr } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolDrDataSubmit = async (e) => {
    e.preventDefault();
    const toolDrData = new FormData();
    toolDrData.append('loanAmount', loanAmount);
    toolDrData.append('interest', interest);
    toolDrData.append('tenure', tenure);
    dispatch(toolDrCalculateAsync({ toolDrData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultDrRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolDr && toolDr.monthlyDR && (
        <>
          <section ref={resultDrRef} className="user-profile">
            <h1 className="heading">DR RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolDr && toolDr.principalAmount
                    ? toolDr.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly DR (Rs):{' '}
                  {toolDr && toolDr.monthlyDR ? toolDr.monthlyDR : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolDr && toolDr.totalInterest
                    ? toolDr.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolDr && toolDr.totalPayment ? toolDr.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolDr &&
                toolDr.schedule &&
                toolDr.schedule.length > 0 &&
                toolDr.schedule.map((dr, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {dr?.month ? dr?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {dr?.principalPaid ? dr?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {dr?.interestPaid ? dr?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Dr Paid: {dr?.dr ? dr?.dr : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {dr?.remainingBalance ? dr?.remainingBalance : 0}
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
          <h3>DR Calculator</h3>
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
            onClick={toolDrDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolDr;
