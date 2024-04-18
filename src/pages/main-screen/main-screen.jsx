import logo from '../../../public/logo.svg'
import profile from '../../../public/profile.svg'
import './main-screen.css'

export default function MainScreen() {
  return (
    <>
      <div className="header">
          <a className="logo"><img className="logo_link" alt="logo" src={logo}/></a>
          <a className="profile"><img className="profile_link" alt="profile" src={profile}/></a>
      </div>
    </>
  )
}