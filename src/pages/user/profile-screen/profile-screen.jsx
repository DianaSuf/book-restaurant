import { Helmet } from 'react-helmet-async';
import './profile-screen.css'
import Header from '../../../components/header/header';

export default function ProfileScreen() {
  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
    </>
  )
}
