import { Link } from 'react-router-dom';
import logo from '/logo.svg'
import Login from '../login/login';
import './header.css'

export default function Header() {
  return (
    <>
      <section className="header">
          <Link className="logo" to="/"><img className="logo_link" alt="logo" src={logo}/></Link>
          <Login/>
      </section>
    </>
  )
}