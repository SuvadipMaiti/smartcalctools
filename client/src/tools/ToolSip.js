import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolSipCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolSip = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultSipRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolSip } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolSipDataSubmit = async (e) => {
    e.preventDefault();
    const toolSipData = new FormData();
    toolSipData.append('loanAmount', loanAmount);
    toolSipData.append('interest', interest);
    toolSipData.append('tenure', tenure);
    dispatch(toolSipCalculateAsync({ toolSipData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultSipRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolSip && toolSip.monthlySIP && (
        <>
          <section ref={resultSipRef} className="user-profile">
            <h1 className="heading">SIP RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolSip && toolSip.principalAmount
                    ? toolSip.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly SIP (Rs):{' '}
                  {toolSip && toolSip.monthlySIP ? toolSip.monthlySIP : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolSip && toolSip.totalInterest
                    ? toolSip.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolSip && toolSip.totalPayment ? toolSip.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolSip &&
                toolSip.schedule &&
                toolSip.schedule.length > 0 &&
                toolSip.schedule.map((sip, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {sip?.month ? sip?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {sip?.principalPaid ? sip?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {sip?.interestPaid ? sip?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Sip Paid: {sip?.sip ? sip?.sip : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {sip?.remainingBalance ? sip?.remainingBalance : 0}
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
          <h3>SIP Calculator</h3>
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
            onClick={toolSipDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolSip;
