import { Helmet } from 'react-helmet-async';
import './main-screen.css'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { renderStars } from '../../components/modal-review/star';
import { useAppSelector } from '../../hooks/hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState } from 'react';

export default function MainScreen() {
  const restaurants = useAppSelector((state) => state.dataAllRest);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const filteredRestaurants = restaurants.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="promo">
        <div className="search">
          <form className="search__form">
            <input
              className="search__input"
              type="text"
              placeholder="Поиск"
              onChange={(evt)=>setValue(evt.target.value)}
            />
          </form>
        </div>
      </section>
      <section className="catalog__restaurants-list">
        {
          filteredRestaurants.map((restaurant) => (
            <div className="restaurant-small-card" 
              key={restaurant.id} 
              onClick={() => navigate(`${AppRoute.Restaurant}/${restaurant.id}`)
            }>
              <img className="main-image" src={`data:image/jpeg;base64,${restaurant.photo}`}/>
              <div className="restaurant-small-card-container">
                <h2 className="restaurant-small-card-name">{restaurant.name}</h2>
                <div className="restaurant-small-card-container-star"><div className="star-container">{renderStars(restaurant.grade, 50)}</div></div>
                <p className="restaurant-small-card-info">г. {restaurant.town}</p>
                <p className="restaurant-small-card-info">ул. {restaurant.address}</p>
                <p className="restaurant-small-card-info">{restaurant.phone}</p>
              </div>
            </div>
          ))
        }
      </section>
      <Footer/>
    </>
  )
}
