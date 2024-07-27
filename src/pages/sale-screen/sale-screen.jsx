import { Helmet } from 'react-helmet-async';
import './sale-screen.css'
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { AuthorizationStatus, AppRoute } from '../../const';
import useRestById from '../../hooks/rest-by-id';
import { saleDeleteAction } from '../../store/api-actions';

export default function SaleScreen () {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  const restaurant = useRestById();
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    if (restaurant) {
      setPromotions(restaurant.promotions);
    }
  }, [restaurant]);

  const handleCancelSale = async (id) => {
    dispatch(saleDeleteAction({id}));
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="sale-main">
        <h1 className="sale">Акции и предложения</h1>
        <div className="catalog__sales-list">
          {
            promotions.map((promotion) => (
              <div className="sale-card"
              key={promotion.id}
              style={{ backgroundImage: `url(data:image/jpeg;base64,${promotion.photo})` }}>
                {authorizationStatus === AuthorizationStatus.ADMIN_REST && <button className="cancelSale__btn" onClick={() => handleCancelSale(promotion.id)}></button>}
                {authorizationStatus === AuthorizationStatus.ADMIN_REST && <button className="editSale__btn" onClick={() => navigate(`${AppRoute.SaleEdit}/${promotion.id}`)}></button>}
                <h2 className="sale-name">{promotion.name}</h2>
                <div className="sale-description-wrapper"><p className="sale-description">{promotion.text}</p></div>
              </div>
            ))
          }
          {authorizationStatus === AuthorizationStatus.ADMIN_REST && <button className="addSale__btn" onClick={() => navigate(AppRoute.SaleCreate)}></button>}
        </div>
      </section>
      <Footer/>
    </>
  )
}
