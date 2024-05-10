import { Helmet } from 'react-helmet-async';
import './table-screen.css'
import Header from '../../../components/header/header';
import { useAppSelector } from '../../../hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

export default function TableScreen () {
  const restaurant = useAppSelector((state) => state.data);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="main-table">
        <img className="plan__img" src={`data:image/jpeg;base64,${restaurant.plan}`} alt="открытое фото галереи" width="1024" height="635"/>
        <div className="table__field"> 
          <label
            className="table__label"
            htmlFor="table-client"
          >
            ДОСТУПНЫЕ МЕСТА:
          </label>
          <input
            className="table__input"
            type="text"
            name="client"
            id="table-client"
            required
          />
        </div>
        <button className="back__btn" onClick={() => navigate(AppRoute.Reserval)}></button>
        <button className="reserval__btn"></button>
      </section>
    </>
  );
}
