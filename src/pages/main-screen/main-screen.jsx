import { Helmet } from 'react-helmet-async';
import './main-screen.css'
import Header from '../../components/header/header';

export default function MainScreen() {

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="promo"></section>
    </>
  )
}
