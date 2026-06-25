import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  collectionShowAsync,
  collectionUpdateAsync,
} from '../redux/slices/CollectionSlice';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const CollectionEdit = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const { userId, slug } = useParams();
  const { collection } = useSelector((state) => state.collectionReducer);

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
        dispatch(setLogout());
        navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    if (collection && collection?.title) {
      setTitle(collection?.title);
      setDescription(collection?.description);
    }
  }, [collection]);

  useEffect(() => {
    if (auth && userId && parseInt(auth.id) === parseInt(userId)) {
      dispatch(collectionShowAsync({ slug, toast }));
    } else {
      toast.error('You are not authorized to edit this collection');
      navigate(url.myProfileCollection());
    }
  }, [auth, userId, slug, dispatch, navigate]);

  const fileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const collectionUpdate = async (e) => {
    e.preventDefault();
    const collectionData = new FormData();
    collectionData.append('title', title);
    collectionData.append('description', description);
    collectionData.append('file', file);
    dispatch(
      collectionUpdateAsync({
        id,
        slug,
        collectionData,
        dispatch,
        navigate,
        toast,
      })
    );
  };

  // Define your Quill modules
  const Quillmodules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
    ],
  };

  return (
    <section className="form-container">
      <form action="" method="post" encType="multipart/form-data">
        <h3>Collection Edit</h3>
        <p>
          Title <span>*</span>
        </p>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          maxLength="50"
          className="box"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>
          Description <span>*</span>
        </p>
        <div className="box">
          <ReactQuill
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
            modules={Quillmodules}
            className="react-quill"
            theme="snow"
          />
        </div>
        <p>File (Image)</p>
        <input
          type="file"
          accept="image/*"
          className="box"
          onChange={fileUpload}
        />
        {collection && collection.file && (
          <img
            src={apiFilepath + '/uploads/collection/' + collection.file}
            alt="avatar"
            style={{ width: '100%', height: 'auto', padding: '1rem' }}
            onError={(e) => {
              e.currentTarget.src = filepath + '/assets/images/user.png';
            }}
          />
        )}
        <input
          type="submit"
          value="Update"
          name="submit"
          className="btn"
          onClick={collectionUpdate}
        />
      </form>
    </section>
  );
};

export default CollectionEdit;
