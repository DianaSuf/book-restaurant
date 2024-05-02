import { Helmet } from 'react-helmet-async';
import './super-screen.css'
import Header from '../../../components/header/header';
import { useRef } from 'react';
import { useAppDispatch } from '../../../hook';
import { AddAdmin } from '../../../store/api-actions';

export default function SuperScreen() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (usernameRef.current !== null && emailRef.current !== null) {
      dispatch(AddAdmin({
        username: usernameRef.current.value,
        email: emailRef.current.value
      }));
    }
  }

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="main">
        <div className="modall">
          <form action="#" className="modal__form" onSubmit={handleSubmit}>
            <h1 className="appoint__text">Новый администратор</h1>
            <div className="appoint__field">
              <label
                className="appoint__label"
                htmlFor="user-login"
              >
                Логин
              </label>
            </div>
            <input
              ref={usernameRef}
              className="appoint__input"
              type="text"
              name="login"
              id="user-login"
              required
            />
            <div className="appoint__field">
              <label
                className="appoint__label"
                htmlFor="user-email"
              >
                Email
              </label>
            </div>
            <input
              ref={emailRef}
              className="appoint__input"
              type="email"
              name="email"
              id="user-email"
              required 
            />
            <div className="appoint"><button className="appoint__btn" type="submit"></button></div>
          </form>
        </div>
      </section>
    </>
  )
}
