import { Helmet } from 'react-helmet-async';
import './profile-screen.css'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import ModalReview from '../../../components/modal-review/modal-review';
import { renderStars } from '../../../components/modal-review/star';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { fetchUserProfileAction, fetchUserProfileUpdateAction, fetchAdminProfileAction, fetchAdminProfileUpdateAction, cancelReservalAction, cancelReservalAdminAction } from '../../../store/api-actions';
import { useState, useEffect } from 'react';
import { AuthorizationStatus } from '../../../const';
import { formatDateToServer } from '../../../utils';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [modalReviewIsOpen, setModalReviewIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reservals, setReservals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    let result;
    if (authorizationStatus === AuthorizationStatus.USER) {
      result = await dispatch(fetchUserProfileAction());
    } else if (authorizationStatus === AuthorizationStatus.ADMIN_REST) {
      const formattedDate = formatDateToServer(date);
      result = await dispatch(fetchAdminProfileAction({date: formattedDate} ));
    }

    if (result?.payload) {
      setUserData(result.payload);
      const reservalsWithState = result.payload.reservals.map((reserval) => ({
        ...reserval,
        isOpen: false
      }));
      setReservals(reservalsWithState);
    }
    };
    
    fetchData();
  }, [dispatch, date, authorizationStatus]);
  
  const toggleCard = (id) => {
    const updatedReservals = reservals.map((reserval) => {
      if (reserval.id === id) {
        return { ...reserval, isOpen: !reserval.isOpen };
      }
      return reserval;
    });
    setReservals(updatedReservals);
  };

  const [dataValues, setDataValues] = useState({
    realname: '',
    username: '',
    email: '',
    phone: '',
  });
    
  useEffect(() => {
    if (userData) {
      setDataValues({
        username: userData.username || '',
        realname: userData.realname || '',
        email: userData.email || '',
        phone: userData.phone || '',
      });
    }
  }, [userData]);

  const handleTextChange = (event) => {
    setDataValues({
      ...dataValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmitSaveData = (evt) => {
    evt.preventDefault();
    let roleValues;
    authorizationStatus === AuthorizationStatus.ADMIN_REST ? roleValues = {
      username: dataValues.username,
      email: dataValues.email,
      phone: dataValues.phone,
    } : roleValues = {
      username: dataValues.username,
      realname: dataValues.realname,
      email: dataValues.email,
      phone: dataValues.phone,
    };
    authorizationStatus === AuthorizationStatus.ADMIN_REST 
    ? dispatch(fetchAdminProfileUpdateAction(roleValues)) 
    : dispatch(fetchUserProfileUpdateAction(roleValues))
  }

  const handleCancelReserval = async (id) => {
    if (authorizationStatus === AuthorizationStatus.USER) {
      await dispatch(cancelReservalAction({id}));
    } else if (authorizationStatus === AuthorizationStatus.ADMIN_REST) {
      await dispatch(cancelReservalAdminAction({id}));
    }
    // Обновление состояния для удаления карточки из списка
    const updatedReservals = reservals.filter((reserval) => reserval.id !== id);
      setReservals(updatedReservals);
  };

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      {userData && (
        <section className="profile">
          <div className="data-user">
            <h1 className="data-user__name">Личные данные</h1>
            <form className="data-user__form" onSubmit={handleSubmitSaveData}>
              <label
                className="data-user__label"
                htmlFor="edit-login-user"
              >
                Логин
              </label>
              <input
                className="data-user__input"
                type="text"
                name="username"
                id="edit-login-user"
                value={dataValues.username}
                onChange={handleTextChange}
                required
              />
              <label
                className="data-user__label"
                htmlFor="edit-email-user"
              >
                Email
              </label>
              <input
                className="data-user__input"
                type="text"
                name="email"
                id="edit-email-user"
                value={dataValues.email}
                onChange={handleTextChange}
                required
              />
              <label
                className="data-user__label"
                htmlFor="edit-phone-user"
              >
                Номер телефона
              </label>
              <input
                className="data-user__input"
                type="tel"
                name="phone"
                id="edit-phone-user"
                value={dataValues.phone}
                onChange={handleTextChange}
                required
              />
              {authorizationStatus === AuthorizationStatus.USER && (
                <>
                  <label
                    className="data-user__label"
                    htmlFor="edit-name-user"
                  >
                    ФИО
                  </label>
                  <input
                    className="data-user__input"
                    type="text"
                    name="realname"
                    id="edit-name-user"
                    value={dataValues.realname}
                    onChange={handleTextChange}
                    required
                  />
                </>
              )}
              <button className="save-edit__btn" type="submit"></button>
            </form>
          </div>
          <div className="reservations">
            <div className="book-header">
              <h1 className="data-user__name">История бронирований</h1>
              {authorizationStatus === AuthorizationStatus.ADMIN_REST && (
                <input
                  className="filter__input"
                  type="date"
                  name="date"
                  id="filter-date"
                  value={date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              )}
            </div>
            {
              reservals.map((reserval) => (
                <div className="reserval-small-card"  key={reserval.id}>
                  <div className="reserval-small-card-container">
                    <div className="reserval-small-card-name-container">
                      <h2 className="reserval-small-card-name">{reserval.name}</h2>
                      {reserval.state === "FALSE" && authorizationStatus === AuthorizationStatus.USER && <div className="reserval-star-container">{renderStars(reserval.grade, 50)}</div> }
                      {reserval.state === "RATED" && authorizationStatus === AuthorizationStatus.USER && <div className="reserval-star-container">{renderStars(reserval.grade, 50)}</div> }
                    </div>
                    <p className="reserval-small-card-info">{reserval.date}, {reserval.time}</p>
                    {reserval.isOpen && (
                      <>
                        <p className="reserval-small-card-info">{reserval.table} столик, {reserval.persons} гостей</p>
                        <p className="reserval-small-card-info"><p className="reserval-small-card-text">Связаться:</p> {reserval.phone}</p>
                        <p className="reserval-small-card-info"><p className="reserval-small-card-text">Пожелания:</p> {reserval.message}</p>
                        {reserval.state === "RATED" && authorizationStatus === AuthorizationStatus.USER && (
                          <p className="reserval-small-card-info"><p className="reserval-small-card-text">Ваш отзыв:</p> {reserval.review}</p>
                        )}
                        {reserval.state === "TRUE" && (
                          <button className="cancel__bth" onClick={() => handleCancelReserval(reserval.id)}></button>
                        )}
                        {reserval.state === "FALSE" && authorizationStatus === AuthorizationStatus.USER && (
                          <>
                            <button className="grade__bth" onClick={() => setModalReviewIsOpen(true)}></button>
                            <ModalReview
                            isOpen={modalReviewIsOpen}
                            onClose={() => setModalReviewIsOpen(false)}
                            idReserval={reserval.id}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="switch-container"><button className="switch__bth" onClick={() => toggleCard(reserval.id)}></button></div>
                </div>
              ))
            }
          </div>
        </section>
      )}
      <Footer/>
    </>
  )
}
