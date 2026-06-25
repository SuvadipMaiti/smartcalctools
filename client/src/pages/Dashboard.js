import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import { Link, useNavigate } from 'react-router-dom';
import { calculatorAllAsync, setPage } from '../redux/slices/CalculatorSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
// import MetaData from '../components/MetaData';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { calculatorLists, pageCount, hasMore, searchKeyword } = useSelector(
    (state) => state.calculatorReducer
  );
  const { auth } = useSelector((state) => state.authReducer);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [keywords, setKeywords] = useState('');
  // const [author, setAuthor] = useState('');
  // const [image, setImage] = useState('');
  // const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // setTitle('SmartCalcTools: smart calculator tools');
    // var description = `SmartCalcTools: SmartCalcTools offers free online calculators for BMI, EMI, SIP, loans, health, math & finance. Fast, accurate & easy-to-use tools for daily calculations.`;
    // setDescription(description);
    // var key = `online calculator, free calculator, bmi calculator, emi calculator, sip calculator, loan calculator, health calculator, finance calculator, math calculator, age calculator, date calculator, smart calculators, conversion calculator`;
    // setKeywords(key);
    // setAuthor('SmartCalcTools');
    // setImage(filepath + '/assets/static/companylogo.png');
    // setCurrentUrl(filepath);
  }, []);

  useEffect(() => {
    const search = searchKeyword;
    var page = 1;
    dispatch(setPage(page));
    if (auth && auth?.id) {
      const authid = auth?.id;
      dispatch(
        calculatorAllAsync({ authid, page, search, toast, navigate, dispatch })
      );
    } else {
      dispatch(calculatorAllAsync({ page, search, toast, navigate, dispatch }));
    }
  }, [dispatch, navigate, searchKeyword, auth]);

  const nextPage = () => {
    const search = searchKeyword;
    var page = pageCount + 1;
    if (auth && auth?.id) {
      const authid = auth?.id;
      dispatch(
        calculatorAllAsync({ authid, page, search, toast, navigate, dispatch })
      );
    } else {
      dispatch(calculatorAllAsync({ page, search, toast, navigate, dispatch }));
    }
    dispatch(setPage(page));
  };

  return (
    <>
      {/* <MetaData
        title={title}
        description={description}
        keywords={keywords}
        author={author}
        image={image}
        currentUrl={currentUrl}
      /> */}
      <section className="collections">
        <h1 className="heading">our calculators</h1>
        <InfiniteScroll
          dataLength={calculatorLists.length}
          next={nextPage}
          hasMore={hasMore}
          loader={
            <div style={{ width: '100%' }} className="btn">
              Loading...
            </div>
          }
          endMessage={
            <div style={{ width: '100%' }} className="btn">
              No more calculators
            </div>
          }
          scrollThreshold={0.9} // Optional threshold to trigger next load
        >
          <div className="box-container">
            {!calculatorLists || calculatorLists.length === 0 ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="box">
                  <div
                    className="skeleton skeleton-img"
                    style={{ width: '100%', height: '120px' }}
                  />
                  <div
                    className="skeleton skeleton-title"
                    style={{
                      width: '80%',
                      height: '1.5rem',
                      margin: '0.5rem 0',
                    }}
                  />
                  <div
                    className="skeleton skeleton-desc"
                    style={{ width: '60%', height: '1rem' }}
                  />
                </div>
              ))
            ) : (
              <>
                {calculatorLists &&
                  calculatorLists.length > 0 &&
                  calculatorLists.map((calculator, i) => (
                    <Link to={`/calculator/${calculator?.slug}`} key={i}>
                      <div className="box">
                        <div className="tutor">
                          {!calculator ? (
                            <div
                              className="skeleton skeleton-img"
                              style={{ width: '100%', height: '300px' }}
                            />
                          ) : (
                            <img
                              src={
                                calculator?.belongsToUser?.avatar
                                  ? apiFilepath +
                                    '/uploads/avatar/' +
                                    calculator?.belongsToUser?.avatar
                                  : filepath +
                                    '/assets/images/company-logo-1658436134701.png'
                              }
                              alt="avatar"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src =
                                  filepath + '/assets/images/user.png';
                              }}
                            />
                          )}
                          <div className="info">
                            <h3>
                              {calculator?.belongsToUser?.name
                                ? calculator?.belongsToUser?.name
                                : 'User'}
                            </h3>
                            <span>
                              {calculator?.publishTime
                                ? moment(calculator?.publishTime).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                  )
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="thumb">
                          {!calculator ? (
                            <div
                              className="skeleton skeleton-img"
                              style={{ width: '100%', height: '300px' }}
                            />
                          ) : (
                            <img
                              src={
                                calculator?.fileUrl
                                  ? calculator.fileUrl
                                  : calculator?.file
                                  ? apiFilepath +
                                    '/uploads/calculator/' +
                                    calculator.file
                                  : filepath + '/assets/static/no-image.jpg'
                              }
                              alt="calculator"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src =
                                  filepath + '/assets/static/no-image.jpg';
                              }}
                            />
                          )}
                          <span>
                            <i className="fas fa-eye"></i>
                          </span>
                        </div>
                        <h3 className="title">
                          {calculator?.title ? calculator?.title : null}
                        </h3>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <i className="far fa-heart"></i>
                            <span>
                              {' '}
                              {calculator?.likes ? calculator?.likes : 0} Likes
                            </span>
                          </div>
                          <div>
                            <i className="far fa-eye"></i>
                            <span>
                              {' '}
                              {calculator?.views ? calculator?.views : 0} Views
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </>
            )}
          </div>
        </InfiniteScroll>
      </section>
      {/* <section className="collections">
        <h1 className="heading">our collections</h1>

        <div className="box-container">
          {collections &&
            collections.length > 0 &&
            collections.map((collection, i) => (
              <Link
                to={url.collectionView(collection?.slug)}
                key={collection?.id ? collection?.id : i}
              >
                <div className="box">
                  <div className="tutor">
                    <img
                      src={
                        collection?.belongsToUser?.avatar
                          ? apiFilepath +
                            '/uploads/avatar/' +
                            collection?.belongsToUser?.avatar
                          : filepath +'/assets/images/company-logo-1658436134701.png'
                      }
                      alt="avatar"
                      onError={(e) => {
                        e.currentTarget.src = filepath +'/assets/images/user.png';
                      }}
                    />
                    <div className="info">
                      <h3>
                        {collection?.belongsToUser?.name
                          ? collection?.belongsToUser?.name
                          : 'User'}
                      </h3>
                      <span>
                        {collection?.createdAt
                          ? moment(collection?.createdAt).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className="thumb">
                    {collection?.file ? (
                      <img
                        src={apiFilepath + '/uploads/collection/' + collection?.file}
                        alt="collection"
                        onError={(e) => {
                          e.currentTarget.src = filepath +'/assets/static/no-image.jpg';
                        }}
                      />
                    ) : (
                      <img
                        src={filepath +'/assets/static/no-image.jpg'}
                        alt="collection"
                        onError={(e) => {
                          e.currentTarget.src = filepath +'/assets/static/no-image.jpg';
                        }}
                      />
                    )}
                    <span>
                      <i className="fas fa-eye"></i>
                    </span>
                  </div>
                  <h3 className="title">
                    {collection?.title ? collection?.title : null}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
        <div className="more-btn">
          <Link to={url.collections()} className="inline-option-btn">
            view all collections
          </Link>
        </div>
      </section> */}
    </>
  );
};

export default Dashboard;
