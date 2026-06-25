import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolEmiCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolEmi = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultEmiRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolEmi } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolEmiDataSubmit = async (e) => {
    e.preventDefault();
    const toolEmiData = new FormData();
    toolEmiData.append('loanAmount', loanAmount);
    toolEmiData.append('interest', interest);
    toolEmiData.append('tenure', tenure);
    dispatch(toolEmiCalculateAsync({ toolEmiData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultEmiRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolEmi && toolEmi.monthlyEMI && (
        <>
          <section ref={resultEmiRef} className="user-profile">
            <h1 className="heading">EMI RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolEmi && toolEmi.principalAmount
                    ? toolEmi.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly EMI (Rs):{' '}
                  {toolEmi && toolEmi.monthlyEMI ? toolEmi.monthlyEMI : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolEmi && toolEmi.totalInterest
                    ? toolEmi.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolEmi && toolEmi.totalPayment ? toolEmi.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolEmi &&
                toolEmi.schedule &&
                toolEmi.schedule.length > 0 &&
                toolEmi.schedule.map((emi, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {emi?.month ? emi?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {emi?.principalPaid ? emi?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {emi?.interestPaid ? emi?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Emi Paid: {emi?.emi ? emi?.emi : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {emi?.remainingBalance ? emi?.remainingBalance : 0}
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
          <h3>EMI Calculator</h3>
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
            onClick={toolEmiDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolEmi;
