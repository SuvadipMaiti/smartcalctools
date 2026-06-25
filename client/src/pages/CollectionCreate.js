import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collectionCreateAsync } from '../redux/slices/CollectionSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const CollectionCreate = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
        dispatch(setLogout());
        navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  const fileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const collectionSubmit = async (e) => {
    e.preventDefault();
    const collectionData = new FormData();
    collectionData.append('title', title);
    collectionData.append('description', description);
    collectionData.append('file', file);
    dispatch(
      collectionCreateAsync({ id, collectionData, dispatch, navigate, toast })
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
        <h3>Create a collection</h3>
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
        <input
          type="submit"
          value="Submit"
          name="submit"
          className="btn"
          onClick={collectionSubmit}
        />
      </form>
    </section>
  );
};

export default CollectionCreate;
