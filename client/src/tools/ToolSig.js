import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolSigCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolSig = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultSigRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolSig } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolSigDataSubmit = async (e) => {
    e.preventDefault();
    const toolSigData = new FormData();
    toolSigData.append('loanAmount', loanAmount);
    toolSigData.append('interest', interest);
    toolSigData.append('tenure', tenure);
    dispatch(toolSigCalculateAsync({ toolSigData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultSigRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolSig && toolSig.monthlySIG && (
        <>
          <section ref={resultSigRef} className="user-profile">
            <h1 className="heading">SIG RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolSig && toolSig.principalAmount
                    ? toolSig.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly SIG (Rs):{' '}
                  {toolSig && toolSig.monthlySIG ? toolSig.monthlySIG : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolSig && toolSig.totalInterest
                    ? toolSig.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolSig && toolSig.totalPayment ? toolSig.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolSig &&
                toolSig.schedule &&
                toolSig.schedule.length > 0 &&
                toolSig.schedule.map((sig, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {sig?.month ? sig?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {sig?.principalPaid ? sig?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {sig?.interestPaid ? sig?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Sig Paid: {sig?.sig ? sig?.sig : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {sig?.remainingBalance ? sig?.remainingBalance : 0}
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
          <h3>SIG Calculator</h3>
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
            onClick={toolSigDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolSig;
