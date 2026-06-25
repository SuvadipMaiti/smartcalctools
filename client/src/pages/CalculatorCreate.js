import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { calculatorCreateAsync } from '../redux/slices/CalculatorSlice';
import { tagAllAsync } from '../redux/slices/TagSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/creatable';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const CalculatorCreate = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.authReducer);
  const { tags } = useSelector((state) => state.tagReducer);
  const [id] = useState(auth?.id);
  const [title, setTitle] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [defaultTag, setDefaultTag] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [publishDate, setPublishDate] = useState();

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
        dispatch(setLogout());
        navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    dispatch(tagAllAsync({ toast }));
  }, [dispatch]);

  const fileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(tagAllAsync({ toast }));
    setPublishDate(new Date());
  }, [dispatch]);

  const calculatorSubmit = async (e) => {
    e.preventDefault();

    const publishDateUtc = moment.utc(publishDate).toISOString();
    const calculatorData = new FormData();
    calculatorData.append('title', title);
    calculatorData.append('url', externalUrl);
    calculatorData.append('description', description);
    calculatorData.append('file', file);
    calculatorData.append('tagIds', JSON.stringify(defaultTag));
    calculatorData.append('publishTime', publishDateUtc);
    dispatch(
      calculatorCreateAsync({ id, calculatorData, dispatch, navigate, toast })
    );
  };

  useEffect(() => {
    const suggestions = tags.map((tag) => ({
      value: tag.id.toString(),
      label: tag.name,
    }));
    setSuggestions(suggestions);
  }, [tags]);

  const selectTag = (e) =>
    setDefaultTag(
      e.map((option) => ({ value: option.value, label: option.label }))
    );

  const setPublishDateFun = (date) => {
    setPublishDate(date);
  };

  const urlFun = (event) => {
    const { value } = event.target;
    // Regular expression to check if the input is a valid URL
    // const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    // if (urlRegex.test(value)) {
      setExternalUrl(value);
    // }
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
        <h3>Create a calculator</h3>
        <p>
          Tag <span>*</span>
        </p>
        <div className="box react-tag">
          <CreatableSelect isMulti options={suggestions} onChange={selectTag} />
        </div>
        <p>
          Title <span>*</span>
        </p>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          maxLength="200"
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
        <p>
          Calculator Component<span>*</span>
        </p>
        <input
          type="text"
          name="url"
          placeholder="Calculator Component : ToolBmr,ToolEmi, etc"
          required
          className="box"
          onChange={urlFun}
        />
        <p>Publish Date</p>
        <Datetime
          className="box"
          value={publishDate}
          onChange={setPublishDateFun}
          inputProps={{ placeholder: 'Select Date and Time' }}
        />
        <input
          type="submit"
          value="Submit"
          name="submit"
          className="btn"
          onClick={calculatorSubmit}
        />
      </form>
    </section>
  );
};

export default CalculatorCreate;
