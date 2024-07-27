import { Helmet } from 'react-helmet-async';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import './rest-card-edit-screen.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { AppRoute } from '../../../const';
import { useAppSelector, useAppDispatch } from '../../../hooks/hook';
import stub from '/stub.jpg'
import { fetchRestaurantAdminUpdateAction, fetchRestaurantAdminUpdateTableAction, fetchRestaurantAdminUpdatePhotoAction, fetchRestaurantAdminUpdateMenuAction, fetchRestaurantAdminUpdatePlanAction } from '../../../store/api-actions';

export default function RestCardEditScreen () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state) => state.dataRest);
  const stubImages = [stub, stub, stub];
  const images = restaurant.photosRest && restaurant.photosRest.length > 0 && restaurant.photosRest[0] !== null ? restaurant.photosRest.map(photo => `data:image/jpeg;base64,${photo}`) : stubImages;
  const addImagesRef = useRef(null);
  const addMenuRef = useRef(null);
  const addPlanRef = useRef(null);
  const [textValues, setTextValues] = useState({
    name: restaurant.name,
    town: restaurant.town,
    address: restaurant.address,
    opening: restaurant.opening,
    ending: restaurant.ending,
    phone: restaurant.phone,
    description: restaurant.description,
  });

  const [textTableValues, setTextTableValues] = useState({
    table: restaurant.tables,
  });

  const handleTextChange = (event) => {
    setTextValues({
      ...textValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleTextTableChange = (event) => {
    setTextTableValues({
      ...textTableValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitSave = (evt) => {
    evt.preventDefault();
    dispatch(fetchRestaurantAdminUpdateAction(textValues))
  }

  const handleSubmitSaveTables = (evt) => {
    evt.preventDefault();
    dispatch(fetchRestaurantAdminUpdateTableAction(textTableValues))
  }

  const handleChangeImages = (evt) => {
    evt.preventDefault();
    const files = evt.target.files;
    if (files.length === 3) {
      const readers = [];
      const base64Strings = [];
  
      const onLoadEnd = (index) => (e) => {
        base64Strings[index] = e.target.result.replace("data:", "").replace(/^.+,/, "");
        if (base64Strings.length === 3 && base64Strings.every(Boolean)) {
          dispatch(fetchRestaurantAdminUpdatePhotoAction({
            photo1: base64Strings[0],
            photo2: base64Strings[1],
            photo3: base64Strings[2],
          }));
        }
      };
  
      for (let i = 0; i < files.length; i++) {
        readers[i] = new FileReader();
        readers[i].onloadend = onLoadEnd(i);
        readers[i].readAsDataURL(files[i]);
      }
    } else {
      alert('Пожалуйста, выберите ровно три фотографии.');
    }
  };

  const handleChangeMenu = (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      dispatch(fetchRestaurantAdminUpdateMenuAction({ photo: base64String }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChangePlan = (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      dispatch(fetchRestaurantAdminUpdatePlanAction({ photo: base64String }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>EditTime</title>
      </Helmet>
      <Header/>
      <section className="main-edit">
        <div className="edit__form-restarant">
          <form action="#" className="edit__form" onSubmit={handleSubmitSave}>
            <div className="edit__form-content">
              <div className="edit__form-container">
                <label
                  className="edit__label"
                  htmlFor="restarant-name"
                >
                  Название ресторана
                </label>
                <input
                  className="edit__input"
                  type="text"
                  name="name"
                  id="restarant-name"
                  value={textValues.name}
                  onChange={handleTextChange}
                  required
                />
                <div className="edit-container">
                  <div className="edit-container-field">
                    <label
                      className="edit__label"
                      htmlFor="restarant-town"
                    >
                      Город
                    </label>
                    <input
                      className="edit-town__input"
                      type="text"
                      name="town"
                      id="restarant-town"
                      value={textValues.town}
                      onChange={handleTextChange}
                      required
                    />
                  </div>
                  <div className="edit-container-field">
                    <label
                      className="edit__label"
                      htmlFor="restarant-street"
                    >
                      Улица
                    </label>
                    <input
                      className="edit-address__input"
                      type="text"
                      name="address"
                      id="restarant-address"
                      value={textValues.address}
                      onChange={handleTextChange}
                      required
                    />
                  </div>
                </div>
                <label
                  className="edit__label"
                  htmlFor="restarant-phone"
                >
                  Контактные данные
                </label>
                <input
                  className="edit__input"
                  type="tel"
                  name="phone"
                  id="restarant-phone"
                  value={textValues.phone}
                  onChange={handleTextChange}
                  required
                />
              </div>
              <div className="edit__form-container-description">
                <label
                  className="edit__label"
                  htmlFor="restarant-description"
                >
                  Описание
                </label>
                <textarea
                  className="edit-description__textarea"
                  type="text"
                  name="description"
                  id="restarant-description"
                  maxLength={350}
                  value={textValues.description}
                  onChange={handleTextChange}
                  required
                />
                <p className="symbols">Введено символов: {textValues.description.length} из 350</p>
                <div className="edit-container-time">
                  <div className="edit-container-field">
                    <label
                      className="edit__label"
                      htmlFor="restarant-opening"
                    >
                      Начало работы
                    </label>
                    <input
                      className="edit-description-info__input"
                      type="time"
                      name="opening"
                      id="restarant-opening"
                      value={textValues.opening}
                      onChange={handleTextChange}
                      required
                    />
                  </div>
                  <div className="edit-container-field">
                    <label
                      className="edit__label"
                      htmlFor="restarant-ending"
                    >
                      Конец работы
                    </label>
                    <input
                      className="edit-description-info-last__input"
                      type="time"
                      name="ending"
                      id="restarant-ending"
                      value={textValues.ending}
                      onChange={handleTextChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="center-content"><button className="save__btn"></button></div>
          </form>
        </div>
        <div className="images imagesAdd">
          <div className="images-content">
            <img className="image imageAdd" src={images[0]}/>
            <img className="image imageAdd" src={images[1]}/>
            <img className="image imageAdd" src={images[2]}/>
          </div>
          <div className="change__btns-addImages">
            <button className="addImages__btn" onClick={() => addImagesRef.current.click()}></button>
            <input ref={addImagesRef} className="addImages_input" type="file" accept='image/*,.png,.jpg,.gif,.web' multiple onChange={handleChangeImages}/>
          </div>
        </div>
        <div className="images">
          <img className="image" src={restaurant.menu !== null ? `data:image/jpeg;base64,${restaurant.menu}` : stub}/>
          <div className="change__btns">
            <button className="addMenu__btn" onClick={() => addMenuRef.current.click()}></button>
            <input ref={addMenuRef} className="addMenu_input" type="file" accept='image/*,.png,.jpg,.gif,.web' onChange={handleChangeMenu}/>
          </div>
        </div>
        <div className="images">
          <img className="image" src={restaurant.plan !== null ? `data:image/jpeg;base64,${restaurant.plan}` : stub}/>
          <div className="change__btns">
            <button className="addPlan__btn" onClick={() => addPlanRef.current.click()}></button>
            <input ref={addPlanRef} className="addPlan_input" type="file" accept='image/*,.png,.jpg,.gif,.web' onChange={handleChangePlan}/>
          </div>
        </div>
        <div className="edit-container-time">
          <div className="edit-container-field">
            <label
              className="edit__label-tables"
              htmlFor="restarant-tables"
            >
              Кол-во столов
            </label>
            <input
              className="edit-description-info__input-tables"
              type="number"
              name="table"
              id="restarant-tables"
              value={textTableValues.table}
              onChange={handleTextTableChange}
              disabled={restaurant.tables != 0}
              required
            />
          </div>
          {restaurant.tables == 0 &&
            <button className="save-tables__btn" disabled={restaurant.tables != 0} onClick={handleSubmitSaveTables}></button>}
          <p className="save-tables__text">После сохранения это поле станет не редактируемым!</p>
        </div>
        <div className="center-content">
          <button className="back-card__btn" onClick={() => navigate(AppRoute.Restaurant)}></button>
        </div>
      </section>
      <Footer/>
    </>
  )
}
