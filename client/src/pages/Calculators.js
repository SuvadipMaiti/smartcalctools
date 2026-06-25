import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { collectionAllAsync } from '../redux/slices/CollectionSlice';
import moment from 'moment';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import { Link, useNavigate } from 'react-router-dom';
// import * as url from '../helpers/url';
import { calculatorAllAsync } from '../redux/slices/CalculatorSlice';

const Calculators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { collections } = useSelector((state) => state.collectionReducer);
  const { calculators, searchKeyword } = useSelector((state) => state.calculatorReducer);
  const { auth } = useSelector((state) => state.authReducer);
  const [calculatorsData, setCalculatorsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(true);

  useEffect(() => {
    setSearch(searchKeyword);
    setPage(1);
    setCalculatorsData([]); // Clear previous search results
    setHasMore(true); // Reset hasMore flag
  }, [searchKeyword]);

  useEffect(() => {
    if (page) {
      setLoading(true);
      if (auth && auth?.id) {
        const authid = auth?.id;
        dispatch(calculatorAllAsync({ authid, page, search, toast, navigate }));
      } else {
        dispatch(calculatorAllAsync({ page, search, toast, navigate }));
      }
    }
  }, [dispatch, navigate, auth, page, search]);

  useEffect(() => {
    // Compare new calculators with existing calculatorsData
    const newCalculators = calculators.filter(
      (newCalculator) => !calculatorsData.some((oldCalculator) => oldCalculator.id === newCalculator.id)
    );

    // Update calculatorsData only if there are new calculators
    if (newCalculators.length > 0) {
      setCalculatorsData((prevCalculators) => [...prevCalculators, ...newCalculators]);
    }

    // Update hasMore flag
    setHasMore(calculators.length > 0);

    // Reset loading state
    setLoading(false);
  }, [calculators, calculatorsData]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  console.log('page', page);
  return (
    <>
      {/* <section className="home-grid">
        <h1 className="heading">quick options</h1>

        <div className="box-container">
          <div className="box">
            <h3 className="title">likes and comments</h3>
            <p className="likes">
              total likes : <span>25</span>
            </p>
            <a href={link} className="inline-btn">
              view likes
            </a>
            <p className="likes">
              total comments : <span>12</span>
            </p>
            <a href={link} className="inline-btn">
              view comments
            </a>
            <p className="likes">
              saved playlists : <span>4</span>
            </p>
            <a href={link} className="inline-btn">
              view playlists
            </a>
          </div>

          <div className="box">
            <h3 className="title">top tags</h3>
            <div className="flex">
              <a href={link}>
                <i className="fas fa-code"></i>
                <span>development</span>
              </a>
              <a href={link}>
                <i className="fas fa-chart-simple"></i>
                <span>business</span>
              </a>
              <a href={link}>
                <i className="fas fa-pen"></i>
                <span>design</span>
              </a>
              <a href={link}>
                <i className="fas fa-chart-line"></i>
                <span>marketing</span>
              </a>
              <a href={link}>
                <i className="fas fa-music"></i>
                <span>music</span>
              </a>
              <a href={link}>
                <i className="fas fa-camera"></i>
                <span>photography</span>
              </a>
              <a href={link}>
                <i className="fas fa-cog"></i>
                <span>software</span>
              </a>
              <a href={link}>
                <i className="fas fa-vial"></i>
                <span>science</span>
              </a>
            </div>
          </div>

          <div className="box">
            <h3 className="title">popular topics</h3>
            <div className="flex">
              <a href={link}>
                <i className="fab fa-html5"></i>
                <span>HTML</span>
              </a>
              <a href={link}>
                <i className="fab fa-css3"></i>
                <span>CSS</span>
              </a>
              <a href={link}>
                <i className="fab fa-js"></i>
                <span>javascript</span>
              </a>
              <a href={link}>
                <i className="fab fa-react"></i>
                <span>react</span>
              </a>
              <a href={link}>
                <i className="fab fa-php"></i>
                <span>PHP</span>
              </a>
              <a href={link}>
                <i className="fab fa-bootstrap"></i>
                <span>bootstrap</span>
              </a>
            </div>
          </div>

          <div className="box">
            <h3 className="title">become a tutor</h3>
            <p className="tutor">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, nam?
            </p>
            <a href="teachers.html" className="inline-btn">
              get started
            </a>
          </div>
        </div>
      </section> */}
      <section className="collections">
        <h1 className="heading">our calculators</h1>

        <div className="box-container">
          {calculatorsData &&
            calculatorsData.length > 0 &&
            calculatorsData.map((calculator, i) => (
              <Link to={`/calculator/${calculator?.slug}`} key={calculator?.id ? calculator?.id : i}>
                <div className="box">
                  <div className="tutor">
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
                      onError={(e) => {
                        e.currentTarget.src =
                          filepath + '/assets/images/user.png';
                      }}
                    />
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
                    <img
                      src={
                        calculator?.fileUrl
                          ? calculator.fileUrl
                          : calculator?.file
                          ? apiFilepath + '/uploads/calculator/' + calculator.file
                          : filepath + '/assets/static/no-image.jpg'
                      }
                      alt="calculator"
                      onError={(e) => {
                        e.currentTarget.src =
                          filepath + '/assets/static/no-image.jpg';
                      }}
                    />
                    <span>
                      <i className="fas fa-eye"></i>
                    </span>
                  </div>
                  <h3 className="title">{calculator?.title ? calculator?.title : null}</h3>
                </div>
              </Link>
            ))}
        </div>
        {loading && (
          <div style={{ width: '100%' }} className="btn">
            Loading...
          </div>
        )}
        {!loading && !hasMore && (
          <div style={{ width: '100%' }} className="btn">
            No more data available
          </div>
        )}
        {!loading && hasMore && (
          <button
            style={{ width: '100%' }}
            className="btn"
            onClick={loadMore}
            onMouseEnter={loadMore}
            disabled={loading}
          >
            Load More
          </button>
        )}
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

export default Calculators;
