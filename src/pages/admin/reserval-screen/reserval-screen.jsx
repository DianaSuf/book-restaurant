import { Helmet } from 'react-helmet-async';
import './reserval-screen.css'
import Header from '../../../components/header/header';
import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

export default function ReservalScreen () {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

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
              required
            />
          </div>
          <div className="reserval__field">
            <label
              className="reserval__label"
              htmlFor="reserval-time"
            >
              ВРЕМЯ:
            </label>
            <input
              className="reserval__input"
              type="time"
              name="time"
              id="reserval-time"
              required
            />
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
              name="guests"
              id="reserval-guests"
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
              name="wishes"
              id="reserval-wishes"
              maxLength={200}
              required
            />
          </div>         
        </form>
        <div className="reserval__field">
          <button className="cancel__btn"></button>
          <button className="next__btn" onClick={() => navigate(AppRoute.Table)}></button>
        </div>
      </section>
    </>
  )
}
