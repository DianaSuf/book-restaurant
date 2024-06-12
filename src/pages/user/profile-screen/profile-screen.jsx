import { Helmet } from 'react-helmet-async';
import './profile-screen.css'
import Header from '../../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { fetchUserProfileAction, fetchUserProfileUpdateAction, fetchAdminProfileAction, fetchAdminProfileUpdateAction } from '../../../store/api-actions';
import { useState, useEffect } from 'react';
import { AuthorizationStatus } from '../../../const';
import { formatDateToServer } from '../../../utils';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [userData, setUserData] = useState(null); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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
    }
    };
    
    fetchData();
  }, [dispatch, date, authorizationStatus]);
  
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
  }, [userData]); // This effect runs when userData changes

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
            <div className="book"></div>
          </div>
        </section>
      )}
    </>
  )
}
