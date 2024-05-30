import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import './reserval-screen.css'
import Header from '../../../components/header/header';
import { AuthorizationStatus } from '../../../const';
import { useAppSelector, useAppDispatch } from '../../../hooks/hook';
import { fetchReservalAction } from '../../../store/api-actions';
import useRestById from '../../../hooks/rest-by-id';

function formatDateToServer(data) {
  const [year, month, day] = data.split('-');
  return `${day}.${month}.${year}`;
}

function formatDateToClient(data) {
  const [day, month, year] = data.split('.');
  return `${year}-${month}-${day}`;
}

export default function ReservalScreen () {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const restaurant = useRestById();
  const reserval = useAppSelector((state) => state.dataReseval)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reserval.date) {
      setValuesReserval((prevValues) => ({
        ...prevValues,
        date: formatDateToClient(reserval.date),
      }));
    }
  }, [reserval.date]);

  const [valuesReserval, setValuesReserval] = useState({
    id: restaurant.id,
    date: '',
    timeStart: reserval.timeStart || restaurant.opening,
    timeEnd: reserval.timeEnd || restaurant.ending,
    persons: reserval.persons || 1,
    message: reserval.message || '',
  });

  const handleReservalChange = (event) => {
    setValuesReserval({
      ...valuesReserval,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitReserval = (evt) => {
    evt.preventDefault();
    const formattedValues = {
      ...valuesReserval,
      date: formatDateToServer(valuesReserval.date),
    };
    dispatch(fetchReservalAction(formattedValues))
  }

  return (
    <>
      <Helmet>
        <title>ReservalTime</title>
      </Helmet>
      <Header/>
      <section className="main-reserval">
        <form className="reserval__form">
          {authorizationStatus === AuthorizationStatus.ADMIN_REST && (
            <>
              <div className="reserval__field">
                <label
                  className="reserval__label"
                  htmlFor="reserval-client"
                >
                  ПОСЕТИТЕЛЬ:
                </label>
                <input
                  className="reserval__input"
                  type="text"
                  name="client"
                  id="reserval-client"
                  // value={valuesReserval.name}
                  // onChange={handleReservalChange}
                  required
                />
              </div>
            </>
          )}
          <div className="reserval__field">
            <label
              className="reserval__label"
              htmlFor="reserval-date"
            >
              ДАТА:
            </label>
            <input
              className="reserval__input"
              type="date"
              name="date"
              id="reserval-date"
              value={valuesReserval.date}
              onChange={handleReservalChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="reserval__field">
            <div className="reserval__field">
              <label
                className="reserval__label"
                htmlFor="reserval-start-time"
              >
                БРОНЬ С:
              </label>
              <input
                className="reserval-time-start__input"
                type="time"
                name="timeStart"
                id="reserval-start-time"
                value={valuesReserval.timeStart}
                onChange={handleReservalChange}
                min={restaurant.opening}
                max={valuesReserval.timeEnd}
                required
              />
            </div>
            <div className="reserval__field">
              <label
                className="reserval__label"
                htmlFor="reserval-end-time"
              >
                ДО:
              </label>
              <input
                className="reserval-time-end__input"
                type="time"
                name="timeEnd"
                id="reserval-end-time"
                value={valuesReserval.timeEnd}
                onChange={handleReservalChange}
                min={valuesReserval.timeStart}
                max={restaurant.ending}
                required
              />
            </div>
          </div>
          <div className="reserval__field">
            <label
              className="reserval__label"
              htmlFor="reserval-guests"
            >
              КОЛИЧЕСТВО ГОСТЕЙ:
            </label>
            <input
              className="reserval__input"
              type="number"
              name="persons"
              id="reserval-persons"
              value={valuesReserval.persons}
              onChange={handleReservalChange}
              required
            />
          </div>
          <div className="reserval__field">
            <label
              className="reserval__label"
              htmlFor="reserval-wishes"
            >
              ПОЖЕЛАНИЯ:
            </label>
            <textarea
              className="reserval__textarea"
              type="text"
              name="message"
              id="reserval-message"
              value={valuesReserval.message}
              onChange={handleReservalChange}
              maxLength={200}
              required
            />
          </div>         
        </form>
        <div className="reserval__field">
          {/* <button className="cancel__btn"></button> */}
          <button className="next__btn" onClick={handleSubmitReserval}></button>
        </div>
      </section>
    </>
  )
}
