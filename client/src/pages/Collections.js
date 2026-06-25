import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { collectionAllAsync } from '../redux/slices/CollectionSlice';
import moment from 'moment';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import { Link } from 'react-router-dom';

const Collections = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collectionReducer);

  useEffect(() => {
    dispatch(collectionAllAsync({ toast }));
  }, [dispatch]);

  return (
    <section className="collections">
      <h1 className="heading">All Collections</h1>

      <div className="box-container">
        {collections &&
          collections.length > 0 &&
          collections.map((collection, i) => (
            <Link to={`/collection/${collection?.slug}`} key={collection?.id ? collection?.id : i}>
            <div className="box">
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
                    e.currentTarget.src = filepath + '/assets/images/user.png';
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
                      e.currentTarget.src = filepath + '/assets/static/no-image.jpg';
                    }}
                  />
                ) : (
                  <img
                    src={filepath + '/assets/static/no-image.jpg'}
                    alt="collection"
                    onError={(e) => {
                      e.currentTarget.src = filepath + '/assets/static/no-image.jpg';
                    }}
                  />
                )}
                <span><i className="fas fa-eye"></i></span>
              </div>
              <h3 className="title">{collection?.title ? collection?.title : null}</h3>
            </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Collections;
