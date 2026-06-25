import React, { useEffect, useState } from 'react';
import { ProfileCollectionAsync } from '../redux/slices/CollectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const MyProfileCollection = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const { profilecollections } = useSelector(
    (state) => state.collectionReducer
  );

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
        dispatch(setLogout());
        navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  // console.log(profilecollections);
  useEffect(() => {
    dispatch(ProfileCollectionAsync({ id, toast }));
  }, [dispatch, id]);

  return (
    <>
      <section className="playlist-details">
        <h1 className="heading">My All collections</h1>

        {/* <div className="row">
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
              <Link to={url.collectionCreate()} className="inline-btn">
                Create a Collection
              </Link>
            </div>
          </div>
        </div> */}
      </section>

      <section className="playlist-videos">
        <h1 className="heading">Collections List</h1>

        <div className="box-container">
          {profilecollections &&
            profilecollections.map((collection, i) => (
              <div className="box" key={collection?.id ? collection?.id : i}>
                <Link to={url.myProfileCollectionView(collection?.slug)}>
                  <i className="fas fa-eye"></i>
                  {collection?.file ? (
                    <img
                      src={
                        apiFilepath + '/uploads/collection/' + collection?.file
                      }
                      alt="collection"
                      onError={(e) => {
                        e.currentTarget.src =
                          filepath + '/assets/static/no-image.jpg';
                      }}
                    />
                  ) : (
                    <img
                      src={filepath + '/assets/static/no-image.jpg'}
                      alt="collection"
                      onError={(e) => {
                        e.currentTarget.src =
                          filepath + '/assets/static/no-image.jpg';
                      }}
                    />
                  )}
                  <h3>{collection?.title ? collection?.title : null}</h3>
                </Link>
                {parseInt(collection?.belongsToUser?.id) === parseInt(id) && (
                  <Link
                    to={url.collectionEdit(
                      collection?.userId,
                      collection?.slug
                    )}
                    className="btn"
                  >
                    Edit
                  </Link>
                )}
                {parseInt(collection?.belongsToUser?.id) === parseInt(id) && (
                  <Link
                    to={url.calculatorAddtoCollection(
                      collection?.userId,
                      collection?.slug
                    )}
                    className="btn"
                  >
                    Add Calculator
                  </Link>
                )}
                {parseInt(collection?.belongsToUser?.id) === parseInt(id) && (
                  <Link
                    to={url.collectionDelete(
                      collection?.userId,
                      collection?.slug
                    )}
                    className="delete-btn"
                  >
                    Delete
                  </Link>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default MyProfileCollection;
