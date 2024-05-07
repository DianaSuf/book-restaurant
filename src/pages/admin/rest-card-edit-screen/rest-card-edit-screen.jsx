import { Helmet } from 'react-helmet-async';
import Header from '../../../components/header/header';
import './rest-card-edit-screen.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector, useAppDispatch } from '../../../hook';
import { fetchRestaurantAdminUpdateAction } from '../../../store/api-actions';

export default function RestCardEditScreen () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state) => state.data);
  const [textValues, setTextValues] = useState({
    name: restaurant.name,
    town: restaurant.town,
    address: restaurant.address,
    opening: restaurant.opening,
    ending: restaurant.ending,
    phone: restaurant.phone,
    description: restaurant.description,
    tables: restaurant.tables,
  });

  const handleTextChange = (event) => {
    setTextValues({
      ...textValues,
      [event.target.name]: event.target.value,
    });
    // console.log(textValues);
  };

  const handleSubmitSave = (evt) => {
    evt.preventDefault();
    dispatch(fetchRestaurantAdminUpdateAction(textValues))
  }

  return (
    <>
      <Helmet>
        <title>EditTime</title>
      </Helmet>
      <Header/>
      <section className="main-edit">
        <form action="#" className="edit__form" onSubmit={handleSubmitSave}>
          <div className="edit__form-info">
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
                  className="edit-street__input"
                  type="text"
                  name="street"
                  id="restarant-street"
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
          <div className="edit__form-description">
            <label
              className="edit__label"
              htmlFor="restarant-description"
            >
              Описание
            </label>
            <textarea
              className="edit-description__input"
              type="text"
              name="description"
              id="restarant-description"
              maxLength={350}
              value={textValues.description}
              onChange={handleTextChange}
              required
            >
            </textarea>
            <p className="symbols">Введено символов: {textValues.description.length} из 350</p>
            <div className="edit-container">
              <div className="edit-container-field">
                <label
                  className="edit__label"
                  htmlFor="restarant-opening"
                >
                  Начало работы
                </label>
                <input
                  className="edit-description-info__input"
                  type="text"
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
                  className="edit-description-info__input"
                  type="text"
                  name="ending"
                  id="restarant-ending"
                  value={textValues.ending}
                  onChange={handleTextChange}
                  required
                />
              </div>
              <div className="edit-container-field">
                <label
                  className="edit__label"
                  htmlFor="restarant-tables"
                >
                  Кол-во столов
                </label>
                <input
                  className="edit-description-info__input-tables"
                  type="text"
                  name="tables"
                  id="restarant-tables"
                  value={textValues.tables}
                  onChange={handleTextChange}
                  required
                />
              </div>
            </div>
          </div>
          <button className="save__btn"></button>
        </form>
        <div className="images"></div>
        <button className="back-card" onClick={() => navigate(AppRoute.Admin)}></button>
      </section>
    </>
  )
}