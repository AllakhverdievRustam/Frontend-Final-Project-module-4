import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import DefaultImg from '../../source/images/default.png'
import './PersonalArea.scss';

const PersonalArea = () => {
  const [uploadedImage, setUploadedImage] = useState({});

  const user = JSON.parse(localStorage.getItem('user'));
  const { authorization, image } = user;

  useEffect(() => {
    if (image) {
      setUploadedImage({
        src: image,
        file: ''
      });
    } else {
      setUploadedImage({
        src: DefaultImg,
        file: ''
      });
    }
  }, [image])

  const disabledButtonSave = !(uploadedImage.file);

  const previewImg = (e) => {
    if (e.target.files[0]) {
      setUploadedImage({
        src: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0]
      });
    }
  }

  const onClickSave = () => {
    const fd = new FormData();
    fd.append('img', uploadedImage.file);

    axios.patch('http://localhost:8000/changeUser', fd,
      {
        headers: { Authorization: authorization }
      }
    ).then(result => {
      const objResult = {
        authorization,
        image: result.data.image
      };

      localStorage.setItem('user', JSON.stringify(objResult));

      setUploadedImage({
        src: result.data.image,
        file: ''
      });
    });
  }

  return (
    <div>
      <Header name='Личный кабинет' flagExit={true} flagArea={false} />

      <div className="area-main-block">
        <img src={uploadedImage.src} alt='your img' />

        <div className='btn-block'>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => onClickSave()}
            disabled={disabledButtonSave}
          >
            Сохранить
          </button>

          <input
            accept="image/*"
            className="d-none"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => previewImg(e)}
          />
          <label htmlFor="contained-button-file">
            <span
              className="btn btn-outline-dark"
            >
              Загрузить картинку
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PersonalArea;