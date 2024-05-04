import { Helmet } from 'react-helmet-async';
import './rest-card-screen.css'
import Header from '../../../components/header/header';
import promo from '/promo.jpg'
import w from '/w.jpg'
import { useState } from 'react';
import ModalPhoto from '../../../components/modal-photo/modal-photo';
import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hook';
import { useNavigate } from "react-router-dom";
import { AppRoute } from '../../../const';

export default function RestCardScreen () {
  const images = [promo, promo, w,];
  const [mainImage, setMainImage] = useState(images[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [modalPhotoIsOpen, setModalPhotoIsOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const restaurant = useAppSelector((state) => state.data);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <div className="restaurant-card">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <div className="restaurant-card-content">
          <section className="gallery">
            <div className="gallery-wrapper">
              <img className="active-img" src={mainImage} alt="открытое фото галереи" width="616" height="380"/>
              <ul className="gallery-preview">
                {images.map((image, index) => (
                  <li className={`preview-item ${index === activeImage ? 'active' : ''}`} key={index}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setMainImage(image); setActiveImage(index);}}>
                      <img src={image} width="180" height="120" alt={`Thumbnail ${index + 1}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="gallery__bth">
              <button className="menu__btn" onClick={() => {setModalPhoto(w); setModalPhotoIsOpen(true)}}></button>
              <button className="plan__btn" onClick={() => {setModalPhoto(promo); setModalPhotoIsOpen(true)}}></button>
              <ModalPhoto
              isOpen={modalPhotoIsOpen}
              onClose={() => setModalPhotoIsOpen(false)}
              photo={modalPhoto}/>
            </div>
          </section>
          <section className="description">
            <h2 className="restaurant-description">Описание</h2>
            <div className="restaurant-description-wrapper">
              <p className="restaurant-description__text">{restaurant.description}</p>
              <p className="restaurant-description__text">Адрес: г. {restaurant.town}, ул. {restaurant.address}</p>
              <p className="restaurant-description__text">Время работы: {restaurant.opening} - {restaurant.ending}</p>
            </div>
          </section>
        </div>
        <div className="menu-popun">
            {authorizationStatus === AuthorizationStatus.ADMIN_REST && <button className="edit__btn" onClick={() => navigate(AppRoute.Edit)}></button>}
            <button className="book__btn"></button>
        </div>
      </div>
    </>
  )
}
