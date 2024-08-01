import { Helmet } from 'react-helmet-async';
import './super-screen.css'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/hook';
import { addAdmin, deleteAdmin } from '../../../store/api-actions';

export default function SuperScreen() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRefDelete = useRef(null);
  const emailRefDelete = useRef(null);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [successDelete, setSuccessDelete] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (usernameRef.current !== null && emailRef.current !== null) {
      setError(null);
      setSuccess(null);
      try {
        await dispatch(addAdmin({
          username: usernameRef.current.value,
          email: emailRef.current.value
        })).unwrap();
        setSuccess("Успешно!");
        setError(null);

        setTimeout(() => {
          setSuccess(null);
        }, 5000);
        
      } catch (err) {
        setError(err.message || "Произошла ошибка")
      }
    }
  }

  const handleDelete = async (evt) => {
    evt.preventDefault();

    if (usernameRefDelete.current !== null && emailRefDelete.current !== null) {
      setErrorDelete(null);
      setSuccessDelete(null);
      try {
        await dispatch(deleteAdmin({
          username: usernameRefDelete.current.value,
          email: emailRefDelete.current.value
        })).unwrap();
        setSuccessDelete("Успешно!");
        setErrorDelete(null);

        setTimeout(() => {
          setSuccessDelete(null);
        }, 5000);
        
      } catch (err) {
        setErrorDelete(err.message || "Произошла ошибка")
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="main-modal">
        <form action="#" className="modal__form" onSubmit={handleSubmit}>
          <h1 className="appoint__text">Создать ресторан</h1>
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
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
        <form action="#" className="modal__form-delete" onSubmit={handleDelete}>
          <h1 className="appoint__text">Удалить ресторан</h1>
          <div className="appoint__field">
            <label
              className="appoint__label"
              htmlFor="user-login-delete"
            >
              Логин
            </label>
          </div>
          <input
            ref={usernameRefDelete}
            className="appoint__input"
            type="text"
            name="login"
            id="user-login-delete"
            required
          />
          <div className="appoint__field">
            <label
              className="appoint__label"
              htmlFor="user-email-delete"
            >
              Email
            </label>
          </div>
          <input
            ref={emailRefDelete}
            className="appoint__input"
            type="email"
            name="email"
            id="user-email-delete"
            required 
          />
          <div className="appoint"><button className="delete__btn" type="submit"></button></div>
          {successDelete && <div className="success-message">{successDelete}</div>}
          {errorDelete && <div className="error-message">{errorDelete}</div>}
        </form>
      </section>
      <Footer/>
    </>
  )
}
