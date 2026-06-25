import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as url from '../helpers/url';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  calculatorShowAsync,
  calculatorAllRelevantAsync,
  setPage,
} from '../redux/slices/CalculatorSlice';
import {
  likeCreateAsync,
  viewCreateAsync,
  likeCountAsync,
} from '../redux/slices/LikeViewSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  commentCreateAsync,
  commentUpdateAsync,
  commentDeleteAsync,
  commentAllAsync,
  setPageComment,
} from '../redux/slices/CommentSlice';
import ToolBmr from '../tools/ToolBmi';
import ToolEmi from '../tools/ToolEmi';
import ToolCalorie from '../tools/ToolCalorie';
import ToolBmi from '../tools/ToolBmi';
import ToolTdee from '../tools/ToolTdee';
import ToolBfp from '../tools/ToolBfp';
import ToolIbw from '../tools/ToolIbw';
import ToolHrz from '../tools/ToolHrz';
import ToolWi from '../tools/ToolWi';
import ToolPi from '../tools/ToolPi';
import ToolTs from '../tools/ToolTs';
import ToolCi from '../tools/ToolCi';
import ToolSip from '../tools/ToolSip';
import ToolRoi from '../tools/ToolRoi';
import ToolDr from '../tools/ToolDr';
import ToolRd from '../tools/ToolRd';
import ToolSig from '../tools/ToolSig';

const CalculatorView = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { slug } = useParams();
  const { calculator } = useSelector((state) => state.calculatorReducer);
  const { likeCount, viewCount, liked } = useSelector(
    (state) => state.likeViewReducer
  );
  const { auth } = useSelector((state) => state.authReducer);
  const { calculatorRelevantLists, pageCount, hasMore } = useSelector(
    (state) => state.calculatorReducer
  );
  const { commentLists, pageCountComment, hasMoreComment } = useSelector(
    (state) => state.commentReducer
  );
  const [shareUrl, setShareUrl] = useState('');
  const [shareTitle, setShareTitle] = useState('');
  const [shareTag, setShareTag] = useState('');
  const [search, setSearch] = useState('');
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [visibleEditFormId, setVisibleEditFormId] = useState();
  const toolNames = {
    ToolBmi: ToolBmi,
    ToolEmi: ToolEmi,
    ToolCalorie: ToolCalorie,
    ToolTdee: ToolTdee,
    ToolBmr: ToolBmr,
    ToolBfp: ToolBfp,
    ToolIbw: ToolIbw,
    ToolHrz: ToolHrz,
    ToolWi: ToolWi,
    ToolPi: ToolPi,
    ToolTs: ToolTs,
    ToolCi: ToolCi,
    ToolSip: ToolSip,
    ToolRoi: ToolRoi,
    ToolDr: ToolDr,
    ToolRd: ToolRd,
    ToolSig: ToolSig,
  };

  const DynamicToolName = toolNames[calculator?.url];

  useEffect(() => {
    dispatch(calculatorShowAsync({ slug, toast }));
  }, [slug, dispatch]);

  useEffect(() => {
    if (!calculator || !calculator?.id) return;
    if (calculator && calculator.id) {
      var page = 1;
      var calculatorId = calculator.id;
      dispatch(setPageComment(page));
      dispatch(
        commentAllAsync({ calculatorId, page, toast, navigate, dispatch })
      );
    }
  }, [dispatch, navigate, calculator]);

  useEffect(() => {
    var page = 1;
    dispatch(setPage(page));
    if (auth && auth?.id) {
      const authid = auth?.id;
      dispatch(
        calculatorAllRelevantAsync({
          authid,
          page,
          search,
          toast,
          navigate,
          dispatch,
        })
      );
    } else {
      dispatch(
        calculatorAllRelevantAsync({ page, search, toast, navigate, dispatch })
      );
    }
  }, [dispatch, navigate, auth, search]);

  useEffect(() => {
    if (calculator) {
      var key = ``;
      calculator?.belongsToTag?.map((tag) => {
        return (key += tag.name + ',');
      });
      setSearch(key);
      setShareTag(key);
      setShareUrl(filepath + window.location.pathname);
      setShareTitle(calculator?.title);
    } else {
      navigate(url.dashboard(), { replace: true });
    }
  }, [calculator, navigate]);

  const nextPage = () => {
    var page = pageCount + 1;
    if (auth && auth?.id) {
      const authid = auth?.id;
      dispatch(
        calculatorAllRelevantAsync({
          authid,
          page,
          search,
          toast,
          navigate,
          dispatch,
        })
      );
    } else {
      dispatch(
        calculatorAllRelevantAsync({ page, search, toast, navigate, dispatch })
      );
    }
    dispatch(setPage(page));
  };

  const commentSubmit = async (e) => {
    e.preventDefault();
    if (auth && auth.id && calculator && calculator.id) {
      var userId = auth.id;
      var calculatorId = calculator.id;
      var calculatorslug = slug;
      const commentData = new FormData();
      commentData.append('comment', comment);
      commentData.append('calculatorId', calculatorId);
      dispatch(
        commentCreateAsync({
          userId,
          calculatorslug,
          calculatorId,
          commentData,
          dispatch,
          navigate,
          toast,
        })
      );
    } else {
      toast.error('Please login first.');
      navigate(url.login());
    }
  };

  const nextPageComment = () => {
    if (calculator && calculator.id) {
      var page = pageCountComment + 1;
      var calculatorId = calculator.id;
      dispatch(
        commentAllAsync({ calculatorId, page, toast, navigate, dispatch })
      );
      dispatch(setPageComment(page));
    }
  };

  const commentEditSubmit = async (e, commentId) => {
    e.preventDefault();
    setVisibleEditFormId(null);
    if (auth && auth.id && calculator && calculator.id) {
      var userId = auth.id;
      var calculatorId = calculator.id;
      var calculatorslug = slug;
      const commentData = new FormData();
      commentData.append('calculatorId', calculatorId);
      commentData.append('comment', editComment);
      dispatch(
        commentUpdateAsync({
          userId,
          commentId,
          calculatorId,
          calculatorslug,
          commentData,
          dispatch,
          navigate,
          toast,
        })
      );
    } else {
      toast.error('Please login first.');
      navigate(url.login());
    }
  };

  const commentDeleteSubmit = async (e, commentId) => {
    e.preventDefault();
    setVisibleEditFormId(null);
    if (auth && auth.id && calculator && calculator.id) {
      var userId = auth.id;
      var calculatorId = calculator.id;
      var calculatorslug = slug;
      dispatch(
        commentDeleteAsync({
          userId,
          commentId,
          calculatorId,
          calculatorslug,
          dispatch,
          navigate,
          toast,
        })
      );
    } else {
      toast.error('Please login first.');
      navigate(url.login());
    }
  };

  const commentEditFormOpen = async (e, commentId) => {
    e.preventDefault();
    if (visibleEditFormId) {
      setVisibleEditFormId(null);
    } else {
      setVisibleEditFormId(commentId);
    }
  };

  const likeSubmit = (e) => {
    e.preventDefault();
    if (auth && auth.id && calculator && calculator.id) {
      var userId = auth.id;
      var calculatorId = calculator.id;
      const likeData = new FormData();
      likeData.append('userId', userId);
      likeData.append('calculatorId', calculatorId);
      dispatch(
        likeCreateAsync({
          slug,
          likeData,
          dispatch,
          navigate,
          toast,
        })
      );
    } else {
      toast.error('Please login first.');
      navigate(url.login());
    }
  };

  useEffect(() => {
    if (calculator && calculator.id) {
      var calculatorId = calculator.id;
      const viewData = new FormData();
      viewData.append('calculatorId', calculatorId);
      dispatch(
        viewCreateAsync({
          viewData,
          dispatch,
          navigate,
          toast,
        })
      );
    }
  }, [dispatch, navigate, calculator, slug]);

  useEffect(() => {
    if (calculator && calculator.id) {
      var userId = null;
      if (auth && auth.id) {
        userId = auth.id;
      }
      var calculatorId = calculator.id;
      const likeData = new FormData();
      likeData.append('userId', userId);
      likeData.append('calculatorId', calculatorId);
      dispatch(
        likeCountAsync({
          likeData,
          dispatch,
          navigate,
          toast,
        })
      );
    }
  }, [calculator, auth, dispatch, navigate, slug]);

  return (
    <>
      <section className="watch-video">
        <div className="video-container">
          <h3 className="title">
            {!calculator ? (
              <div
                className="skeleton skeleton-title"
                style={{ width: '60%', height: '2rem' }}
              />
            ) : (
              calculator?.title
            )}
          </h3>
          <div className="info border-none">
            <p className="date">
              <i className="fas fa-calendar"></i>
              <span>
                {calculator?.publishTime
                  ? moment(calculator?.publishTime).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )
                  : null}
              </span>
            </p>
          </div>
          <div className="info">
            <p className="date">
              <i className="fas fa-folder"></i>
              <span>
                {calculator?.belongsToTag &&
                  calculator?.belongsToTag.map((tag,i) => {
                    return <small key={i} className="tag">{tag.name} &nbsp;</small>;
                  })}
              </span>
            </p>
          </div>
          <div className="video">
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
                    ? apiFilepath + '/uploads/calculator/' + calculator.file
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
          </div>
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
                    : filepath + '/assets/images/company-logo-1658436134701.png'
                }
                alt="avatar"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = filepath + '/assets/images/user.png';
                }}
              />
            )}
            <div>
              <h3>
                {calculator?.belongsToUser?.name
                  ? calculator?.belongsToUser?.name
                  : 'User'}
              </h3>
              <span>
                {calculator?.belongsToUser?.username
                  ? calculator?.belongsToUser?.username
                  : 'Username'}
              </span>
            </div>
          </div>
          <div className="info">
            <b>Share :</b>
            <p className="date">
              <FacebookShareButton url={shareUrl} hashtag={shareTag}>
                <i className="fab fa-facebook-square"></i>
              </FacebookShareButton>
            </p>
            <p className="date">
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <i className="fab fa-twitter-square"></i>
              </TwitterShareButton>
            </p>
            <p className="date">
              <WhatsappShareButton
                url={shareUrl}
                title={shareTitle}
                separator={shareTag}
              >
                <i className="fab fa-whatsapp-square"></i>
              </WhatsappShareButton>
            </p>
            <p className="date">
              <LinkedinShareButton
                url={shareUrl}
                title={shareTitle}
                summary={shareTag}
                source={shareUrl}
              >
                <i className="fab fa-linkedin"></i>
              </LinkedinShareButton>
            </p>
          </div>
          <div className="flex">
            {/* {calculator && calculator?.url && (
              <Link
                to={`/${calculator?.url}`}
                className="inline-btn"
              >
                Open {calculator.title}
              </Link>
            )} */}
            {liked === true ? (
              <button onClick={likeSubmit}>
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                  style={{ color: 'blue' }}
                ></i>
                <span>{likeCount} Likes</span>
              </button>
            ) : (
              <button onClick={likeSubmit}>
                <i className="far fa-heart"></i>
                <span>{likeCount} Likes</span>
              </button>
            )}

            <button>
              <i className="far fa-eye"></i>
              <span>{viewCount} Views</span>
            </button>
          </div>
          {DynamicToolName ? React.createElement(DynamicToolName) : null}
          <p className="description" style={{ padding: '1rem' }}>
            {!calculator ? (
              <div
                className="skeleton skeleton-desc"
                style={{ width: '100%', height: '6rem' }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: calculator?.description || '',
                }}
              />
            )}
          </p>
        </div>
      </section>
      {calculatorRelevantLists && calculatorRelevantLists.length > 1 && (
        <section className="collections">
          <h1 className="heading">Relevant Calculators</h1>
          <div
            id="scrollableCalculator"
            style={{
              height: '50vh',
              overflow: 'auto',
              display: 'flex',
            }}
          >
            <InfiniteScroll
              dataLength={calculatorRelevantLists.length}
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
              scrollableTarget="scrollableCalculator"
            >
              <div className="box-container">
                {!calculatorRelevantLists ? (
                  Array.from({ length: 3 }).map((_, i) => (
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
                    </div>
                  ))
                ) : (
                  <>
                    {calculatorRelevantLists &&
                      calculatorRelevantLists
                        .filter(
                          (calculatorRelevant) =>
                            calculatorRelevant.id !== calculator.id
                        )
                        .map((calculatorRelevant, i) => (
                          <Link
                            to={`/calculator/${calculatorRelevant?.slug}`}
                            key={i}
                          >
                            <div className="box">
                              <div className="tutor">
                                {!calculatorRelevant ? (
                                  <div
                                    className="skeleton skeleton-img"
                                    style={{ width: '100%', height: '300px' }}
                                  />
                                ) : (
                                  <img
                                    src={
                                      calculatorRelevant?.belongsToUser?.avatar
                                        ? apiFilepath +
                                          '/uploads/avatar/' +
                                          calculatorRelevant?.belongsToUser
                                            ?.avatar
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
                                    {calculatorRelevant?.belongsToUser?.name
                                      ? calculatorRelevant?.belongsToUser?.name
                                      : 'User'}
                                  </h3>
                                  <span>
                                    {calculatorRelevant?.publishTime
                                      ? moment(
                                          calculatorRelevant?.publishTime
                                        ).format('MMMM Do YYYY, h:mm:ss a')
                                      : null}
                                  </span>
                                </div>
                              </div>
                              <div className="thumb">
                                {!calculatorRelevant ? (
                                  <div
                                    className="skeleton skeleton-img"
                                    style={{ width: '100%', height: '300px' }}
                                  />
                                ) : (
                                  <img
                                    src={
                                      calculatorRelevant?.fileUrl
                                        ? calculatorRelevant.fileUrl
                                        : calculatorRelevant?.file
                                        ? apiFilepath +
                                          '/uploads/calculator/' +
                                          calculatorRelevant.file
                                        : filepath +
                                          '/assets/static/no-image.jpg'
                                    }
                                    alt="calculatorRelevant"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        filepath +
                                        '/assets/static/no-image.jpg';
                                    }}
                                  />
                                )}
                                <span>
                                  <i className="fas fa-eye"></i>
                                </span>
                              </div>
                              <h3 className="title">
                                {calculatorRelevant?.title
                                  ? calculatorRelevant?.title
                                  : null}
                              </h3>
                            </div>
                          </Link>
                        ))}
                  </>
                )}
              </div>
            </InfiniteScroll>
          </div>
        </section>
      )}
      <section className="comments">
        <h1 className="heading">comments</h1>

        <div className="add-comment">
          <h3>add comment</h3>
          <textarea
            name="comment_box"
            placeholder="enter your comment"
            required
            maxLength="1000"
            cols="30"
            rows="10"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <input
            type="submit"
            value="add comment"
            className="inline-btn"
            name="add_comment"
            onClick={commentSubmit}
          />
        </div>

        <h1 className="heading">user comments</h1>

        <div className="box-container">
          {!commentLists ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="box" style={{ margin: '1rem' }}>
                <div
                  className="skeleton skeleton-img"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div
                  className="skeleton skeleton-title"
                  style={{ width: '40%', height: '1rem', margin: '0.5rem 0' }}
                />
                <div
                  className="skeleton skeleton-desc"
                  style={{ width: '100%', height: '2rem' }}
                />
              </div>
            ))
          ) : (
            <InfiniteScroll
              dataLength={commentLists.length}
              next={nextPageComment}
              hasMore={hasMoreComment}
              loader={
                <div style={{ width: '100%' }} className="btn">
                  Loading...
                </div>
              }
              endMessage={
                <div style={{ width: '100%' }} className="btn">
                  No more comments
                </div>
              }
              scrollThreshold={0.9} // Optional threshold to trigger next load
            >
              {commentLists &&
                commentLists.length > 0 &&
                commentLists.map((comment, i) => (
                  <div className="box" style={{ margin: '1rem' }} key={i}>
                    <div className="user">
                      {!comment ? (
                        <div
                          className="skeleton skeleton-img"
                          style={{ width: '100%', height: '300px' }}
                        />
                      ) : (
                        <img
                          src={
                            comment?.belongsToUser?.avatar
                              ? apiFilepath +
                                '/uploads/avatar/' +
                                comment?.belongsToUser?.avatar
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
                      <div>
                        <h3>
                          {comment?.belongsToUser?.name
                            ? comment?.belongsToUser?.name
                            : 'User'}
                        </h3>
                        <span>
                          {comment?.publishTime
                            ? moment(comment?.publishTime).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )
                            : null}
                        </span>
                      </div>
                    </div>
                    <div className="comment-box">{comment?.comment}</div>
                    {comment?.userId &&
                      auth?.id &&
                      comment.userId === auth.id && (
                        <>
                          {comment.id === visibleEditFormId && (
                            <div className="add-comment">
                              <h3>edit comment</h3>
                              <textarea
                                name="comment_box"
                                placeholder="enter your comment"
                                required
                                maxLength="1000"
                                cols="30"
                                rows="10"
                                onChange={(e) => setEditComment(e.target.value)}
                              ></textarea>
                              <input
                                type="submit"
                                value="edit comment"
                                className="inline-btn"
                                name="edit_comment"
                                onClick={(e) =>
                                  commentEditSubmit(e, comment.id)
                                }
                              />
                            </div>
                          )}

                          <div className="flex-btn">
                            <input
                              type="submit"
                              value="edit comment"
                              name="edit_comment"
                              className="inline-option-btn"
                              onClick={(e) =>
                                commentEditFormOpen(e, comment.id)
                              }
                            />
                            <input
                              type="submit"
                              value="delete comment"
                              name="delete_comment"
                              className="inline-delete-btn"
                              onClick={(e) =>
                                commentDeleteSubmit(e, comment.id)
                              }
                            />
                          </div>
                        </>
                      )}
                  </div>
                ))}
            </InfiniteScroll>
          )}
        </div>
      </section>
    </>
  );
};

export default CalculatorView;
