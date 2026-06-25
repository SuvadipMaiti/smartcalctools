import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toolRoiCalculateAsync } from '../redux/slices/ToolSlice';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const ToolRoi = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const resultRoiRef = useRef(null);

  const { auth } = useSelector((state) => state.authReducer);
  const { toolRoi } = useSelector((state) => state.toolReducer);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const toolRoiDataSubmit = async (e) => {
    e.preventDefault();
    const toolRoiData = new FormData();
    toolRoiData.append('loanAmount', loanAmount);
    toolRoiData.append('interest', interest);
    toolRoiData.append('tenure', tenure);
    dispatch(toolRoiCalculateAsync({ toolRoiData, dispatch, navigate, toast }));

    // 🔹 Scroll to result section
    setTimeout(() => {
      resultRoiRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      {toolRoi && toolRoi.monthlyROI && (
        <>
          <section ref={resultRoiRef} className="user-profile">
            <h1 className="heading">ROI RESULT</h1>
            <div className="info">
              <div className="user">
                <p>
                  Principal Amount{' '}
                  {toolRoi && toolRoi.principalAmount
                    ? toolRoi.principalAmount
                    : ''}
                </p>
                <h3 style={{ color: '#f70317ff' }}>
                  Monthly ROI (Rs):{' '}
                  {toolRoi && toolRoi.monthlyROI ? toolRoi.monthlyROI : ''}
                </h3>
                <p>
                  Total Interest{' '}
                  {toolRoi && toolRoi.totalInterest
                    ? toolRoi.totalInterest
                    : ''}
                </p>
                <p style={{ color: '#f70317ff' }}>
                  Total Payment{' '}
                  {toolRoi && toolRoi.totalPayment ? toolRoi.totalPayment : ''}
                </p>
              </div>
            </div>
          </section>
          <section className="collections">
            <h1 className="heading">Payment Schedule</h1>
            <div className="box-container">
              {toolRoi &&
                toolRoi.schedule &&
                toolRoi.schedule.length > 0 &&
                toolRoi.schedule.map((roi, i) => (
                  <div className="box">
                    <div className="tutor">
                      <div className="info">
                        <h3 style={{ color: '#f70317ff' }}>
                          Month: {roi?.month ? roi?.month : ''}
                        </h3>
                        <span style={{ color: '#3803f7ff' }}>
                          Principal Paid:{' '}
                          {roi?.principalPaid ? roi?.principalPaid : ''}
                        </span>
                        <h3>
                          Interest Paid:{' '}
                          {roi?.interestPaid ? roi?.interestPaid : ''}
                        </h3>
                        <h3 style={{ color: '#f70317ff' }}>
                          Total Roi Paid: {roi?.roi ? roi?.roi : ''}
                        </h3>
                        <h3 style={{ color: '#3803f7ff' }}>
                          Remaining Balance:{' '}
                          {roi?.remainingBalance ? roi?.remainingBalance : 0}
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
          <h3>ROI Calculator</h3>
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
            onClick={toolRoiDataSubmit}
          />
        </form>
      </section>
    </>
  );
};

export default ToolRoi;
