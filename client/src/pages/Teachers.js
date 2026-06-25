import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userAllAsync } from '../redux/slices/AuthSlice';
import { apiFilepath,filepath } from '../helpers/urlConfig';

const Teachers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(userAllAsync({ toast }));
  }, [dispatch]);

  return (
    <section className="teachers">
      <h1 className="heading">expert teachers</h1>

      <form action="" method="post" className="search-tutor">
        <input
          type="text"
          name="search_box"
          placeholder="search tutors..."
          required
          maxLength="100"
        />
        <button
          type="submit"
          className="fas fa-search"
          name="search_tutor"
        ></button>
      </form>

      <div className="box-container">
        <div className="box offer">
          <h3>become a tutor</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque ipsam fuga ex et aliquam.
          </p>
          <a href="register.html" className="inline-btn">
            get started
          </a>
        </div>
        {users &&
          users.length > 0 &&
          users.map((user, i) => (
            <div className="box">
              <div className="tutor">
                <img
                  src={
                    user?.avatar
                      ? apiFilepath + '/uploads/avatar/' + user?.avatar
                      : filepath +'/assets/static/company-logo-1658436134701.png'
                  }
                  alt="avatar"
                  onError={(e) => {
                    e.currentTarget.src = filepath +'/assets/static/user.png';
                  }}
                />
                <div>
                  <h3>{user?.name ? user?.name : null}</h3>
                  <span>{user?.username ? user?.username : null}</span>
                </div>
              </div>
              <p>
                total playlists : <span>4</span>
              </p>
              <p>
                total videos : <span>18</span>
              </p>
              <p>
                total likes : <span>1208</span>
              </p>
              <a href="teacher_profile.html" className="inline-btn">
                view profile
              </a>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Teachers;
