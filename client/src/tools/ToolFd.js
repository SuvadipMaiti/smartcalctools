import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolFdCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolFd = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultFdRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolFd } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolFdDataSubmit = async (e) => {
    e.preventDefault();
    const toolFdData = new FormData();
    toolFdData.append('loanAmount', loanAmount);
    toolFdData.append('interest', interest);
    toolFdData.append('tenure', tenure);
    dispatch(toolFdCalculateAsync({ toolFdData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultFdRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolFd && toolFd.monthlyFD && (
        <>
          <section ref={resultFdRef} className="user-profile">
            <h1 className="heading">FD RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolFd && toolFd.principalAmount
                    ? toolFd.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly FD (Rs):{' '}
                  {toolFd && toolFd.monthlyFD ? toolFd.monthlyFD : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolFd && toolFd.totalInterest
                    ? toolFd.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolFd && toolFd.totalPayment ? toolFd.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolFd &&
                toolFd.schedule &&
                toolFd.schedule.length > 0 &&
                toolFd.schedule.map((fd, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {fd?.month ? fd?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {fd?.principalPaid ? fd?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {fd?.interestPaid ? fd?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Fd Paid: {fd?.fd ? fd?.fd : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {fd?.remainingBalance ? fd?.remainingBalance : 0}
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
          <h3>FD Calculator</h3>
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
            onClick={toolFdDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolFd;
