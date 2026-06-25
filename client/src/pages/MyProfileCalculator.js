import React, { useEffect, useState } from 'react';
import {
  ProfileCalculatorAsync,
  calculatorDeleteAsync,
  setPage,
} from '../redux/slices/CalculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const MyProfileCalculator = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const { profileCalculatorLists, pageCount, hasMore } = useSelector(
    (state) => state.calculatorReducer
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
        dispatch(setLogout());
        navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    var page = 1;
    dispatch(setPage(page));
    dispatch(
      ProfileCalculatorAsync({ id, page, search, toast, navigate, dispatch })
    );
  }, [dispatch, navigate, id, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const calculatorDeleteFun = (id, slug) => {
    dispatch(calculatorDeleteAsync({ id, slug, navigate, toast }));
  };

  const nextPage = () => {
    var page = pageCount + 1;
    dispatch(
      ProfileCalculatorAsync({ id, page, search, toast, navigate, dispatch })
    );
    dispatch(setPage(page));
  };

  return (
    <>
      {/* <section className="playlist-details">
        <h1 className="heading">My All calculators</h1>

        <div className="row">
          <div className="column">
            <form action="" method="post" className="save-playlist">
              <button type="submit">
                <i className="far fa-bookmark"></i> <span>save playlist</span>
              </button>
            </form>

            <div className="thumb">
              <img src={filepath +'/assets/images/thumb-1.png'} alt="" />
              <span>10 videos</span>
            </div>
          </div>
          <div className="column">
            <div className="tutor">
              <img src={filepath +'/assets/images/pic-2.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <span>21-10-2022</span>
              </div>
            </div>

            <div className="details">
              <h3>complete HTML tutorial</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                minus reiciendis, error sunt veritatis exercitationem deserunt
                velit doloribus itaque voluptate.
              </p>
              <Link to={url.calculatorCreate()} className="inline-btn">
                Create a Calculator
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className="playlist-videos">
        <h1 className="heading">My Calculators List</h1>
        <input
          style={{ width: '100%', margin: '1rem', padding: '1rem' }}
          type="text"
          required
          placeholder="search my calculator..."
          maxLength="100"
          value={search}
          onChange={handleSearch}
        />
        <InfiniteScroll
          dataLength={profileCalculatorLists.length}
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
            {profileCalculatorLists &&
              profileCalculatorLists.map((calculator, i) => (
                <div className="box" key={i}>
                  <Link to={`/calculator/${calculator?.slug}`}>
                    <i className="fas fa-eye"></i>
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
                      onError={(e) => {
                        e.currentTarget.src =
                          filepath + '/assets/static/no-image.jpg';
                      }}
                    />
                    <h3>{calculator?.title ? calculator?.title : null}</h3>
                  </Link>
                  {parseInt(calculator?.belongsToUser?.id) === parseInt(id) && (
                    <Link
                      to={url.calculatorEdit(
                        calculator?.userId,
                        calculator?.slug
                      )}
                      className="btn"
                    >
                      Edit
                    </Link>
                  )}
                  {parseInt(calculator?.belongsToUser?.id) === parseInt(id) && (
                    <div
                      onClick={() =>
                        calculatorDeleteFun(
                          calculator?.userId,
                          calculator?.slug
                        )
                      }
                      className="btn"
                    >
                      Delete
                    </div>
                  )}
                </div>
              ))}
          </div>
        </InfiniteScroll>
      </section>
    </>
  );
};

export default MyProfileCalculator;
