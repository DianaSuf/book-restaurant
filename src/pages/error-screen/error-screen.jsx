import { Helmet } from 'react-helmet-async';
import error from '/error.svg'
import './error-screen.css'
import Header from '../../components/header/header';

export default function ErrorScreen() {
  return (
    <>
      <Helmet>
        <title>Oops</title>
      </Helmet>
      <Header/>
      <section className="error"><img className="error_img" alt="error_img" src={error}/></section>
    </>
  )
}
