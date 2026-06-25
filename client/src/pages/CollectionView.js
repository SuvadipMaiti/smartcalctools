import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import * as url from '../helpers/url';
import { collectionShowAsync } from '../redux/slices/CollectionSlice';
import moment from 'moment';

const CollectionView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { slug } = useParams();
  const { collection } = useSelector((state) => state.collectionReducer);

  useEffect(() => {
    dispatch(collectionShowAsync({ slug, toast }));
  }, [slug, dispatch, navigate]);

  return (
    <>
      <section className="playlist-details">
        <h1 className="heading">My Collection View</h1>

        <div className="row">
          <div className="column">
            {/* <form action="" method="post" className="save-playlist">
              <button type="submit">
                <i className="far fa-bookmark"></i> <span>save playlist</span>
              </button>
            </form> */}

            <div className="thumb">
              {collection && (
                <img
                  src={apiFilepath + '/uploads/collection/' + collection.file}
                  alt="avatar"
                  onError={(e) => {
                    e.currentTarget.src = filepath + '/assets/static/no-image.jpg';
                  }}
                />
              )}
              {/* <span>10 videos</span> */}
            </div>
          </div>
          <div className="column">
            <div className="tutor">
              <img
                src={
                  collection?.belongsToUser?.avatar
                    ? apiFilepath +
                      '/uploads/avatar/' +
                      collection?.belongsToUser?.avatar
                    : filepath + '/assets/images/company-logo-1658436134701.png'
                }
                alt="avatar"
                onError={(e) => {
                  e.currentTarget.src = filepath +'/assets/images/user.png';
                }}
              />
              <div>
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

            <div className="details">
              <h3>{collection && collection.title ? collection.title : ''}</h3>
            
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    collection && collection.description ? collection.description : ''
                }}
              ></p>
              {/* <Link to={url.calculatorCreate()} className="inline-btn">
                Create a Calculator
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      <section className="playlist-videos">
        <h1 className="heading">Calculators List</h1>

        <div className="box-container">
          {collection.hasManyCalculatorInCollections &&
            collection.hasManyCalculatorInCollections.map((calculatorcollection, i) => (
              <div className="box" key={calculatorcollection?.id ? calculatorcollection?.id : i}>
                <Link to={url.calculatorView(calculatorcollection?.belongsToCalculator?.slug)}>
                  <i className="fas fa-eye"></i>
                  {calculatorcollection?.belongsToCalculator?.file ? (
                    <img
                      src={
                        apiFilepath +
                        '/uploads/calculator/' +
                        calculatorcollection?.belongsToCalculator?.file
                      }
                      alt="calculator"
                      onError={(e) => {
                        e.currentTarget.src = filepath +'/assets/static/no-image.jpg';
                      }}
                    />
                  ) : (
                    <img
                      src={filepath +'/assets/static/no-image.jpg'}
                      alt="calculator"
                      onError={(e) => {
                        e.currentTarget.src = filepath +'/assets/static/no-image.jpg';
                      }}
                    />
                  )}
                  <h1>Calculator No : {calculatorcollection?.calculatorno
                      ? calculatorcollection?.calculatorno
                      : null}</h1>
                  <h3>
                    {calculatorcollection?.belongsToCalculator?.title
                      ? calculatorcollection?.belongsToCalculator?.title
                      : null}
                  </h3>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default CollectionView;
