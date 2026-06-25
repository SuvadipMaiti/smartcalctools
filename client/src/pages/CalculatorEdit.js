import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tagAllAsync } from '../redux/slices/TagSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  calculatorShowAsync,
  calculatorUpdateAsync,
} from '../redux/slices/CalculatorSlice';
import { apiFilepath, filepath } from '../helpers/urlConfig';
import CreatableSelect from 'react-select/creatable';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { setLogout } from '../redux/slices/AuthSlice';
import * as url from '../helpers/url';

const CalculatorEdit = () => {
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
  const { userId, slug } = useParams();
  const { calculator } = useSelector((state) => state.calculatorReducer);
  const [suggestions, setSuggestions] = useState();
  const [publishDate, setPublishDate] = useState(new Date());

  useEffect(() => {
    if (auth && auth.token && auth.admin !== 1) {
      dispatch(setLogout());
      navigate(url.login());
    }
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    if (calculator && calculator?.title) {
      setTitle(calculator?.title);
      setExternalUrl(calculator?.url);
      setDescription(calculator?.description);
      var defcatData = calculator?.belongsToTag.map((opt) => ({
        value: opt.id,
        label: opt.name,
      }));
      setDefaultTag(defcatData);
      if (calculator.publishDate) {
        setPublishDate(new Date(calculator.publishDate));
      }
    }
  }, [calculator]);

  useEffect(() => {
    if (auth && userId && parseInt(auth.id) === parseInt(userId)) {
      dispatch(calculatorShowAsync({ slug, toast }));
    } else {
      toast.error('You are not authorized to edit this calculator');
      navigate(url.myProfileCalculator());
    }
  }, [auth, userId, slug, dispatch, navigate]);

  useEffect(() => {
    dispatch(tagAllAsync({ toast }));
  }, [dispatch]);

  const fileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const calculatorUpdate = async (e) => {
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
      calculatorUpdateAsync({
        id,
        slug,
        calculatorData,
        dispatch,
        navigate,
        toast,
      })
    );
  };

  useEffect(() => {
    // const suggestions = tags.map((tag) => ({
    //   value: tag.id.toString(),
    //   label: tag.name,
    // }));

    // Default tags already assigned to the calculator
    const defaultTags = calculator?.belongsToTag || []; // use directly

    // Full list of all tags, excluding the ones already assigned
    const suggestions = tags
      .filter((tag) => !defaultTags.some((defTag) => defTag.id === tag.id)) // remove assigned tags
      .map((tag) => ({
        value: tag.id.toString(),
        label: tag.name,
      }));
      
    setSuggestions(suggestions);
  }, [tags,calculator]);

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
        <h3>Calculator Edit</h3>
        <p>
          Tag <span>*</span>
        </p>
        <div className="box react-tag">
          <CreatableSelect
            isMulti
            options={suggestions}
            onChange={selectTag}
            value={defaultTag}
          />
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
        {calculator && calculator.file && (
          <img
            src={apiFilepath + '/uploads/calculator/' + calculator.file}
            alt="avatar"
            style={{ width: '100%', height: 'auto', padding: '1rem' }}
            onError={(e) => {
              e.currentTarget.src = filepath + '/assets/images/user.png';
            }}
          />
        )}
        <p>
          Calculator Component <span>*</span>
        </p>
        <input
          type="text"
          name="url"
          placeholder="Calculator Component : ToolBmr,ToolEmi, etc"
          required
          className="box"
          value={externalUrl}
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
          value="Update"
          name="submit"
          className="btn"
          onClick={calculatorUpdate}
        />
      </form>
    </section>
  );
};

export default CalculatorEdit;
