import { Helmet } from 'react-helmet-async';
import './super-screen.css'
import Header from '../../../components/header/header';

export default function SuperScreen() {
  return (
    <>
      <Helmet>
        <title>TableTme</title>
      </Helmet>
      <Header/>
      <section className="main">
        <div className="modall">
          <form action="#" className="modal__form">
            <h1>Новый администратор</h1>
            <div className="appoint__field">
              <label
                className="appoint__label"
                htmlFor="user-login"
              >
                Логин
              </label>
            </div>
            <input
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
