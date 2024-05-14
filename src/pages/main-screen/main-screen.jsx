import { Helmet } from 'react-helmet-async';
import './main-screen.css'
import Header from '../../components/header/header';
import { useAppSelector } from '../../hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function MainScreen() {
  const restaurants = useAppSelector((state) => state.dataAllRest);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="promo"></section>
      <section className="catalog__restaurants-list">
        {
          restaurants.map((restaurant) => (
            <div className="restaurant-small-card" 
              key={restaurant.id} 
              onClick={() => navigate(`${AppRoute.Restaurant}/${restaurant.id}`)
            }>
              <img className="main-image" src={`data:image/jpeg;base64,${restaurant.photo}`}/>
              <div className="restaurant-small-card-container">
                <h2 className="restaurant-small-card-name">{restaurant.name}</h2>
                <p className="restaurant-small-card-info">г. {restaurant.town}</p>
                <p className="restaurant-small-card-info">ул. {restaurant.address}</p>
                <p className="restaurant-small-card-info">{restaurant.phone}</p>
              </div>
            </div>
          ))
        }
      </section>
    </>
  )
}
