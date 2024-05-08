import { Helmet } from 'react-helmet-async';
import './rest-card-screen.css'
import Header from '../../../components/header/header';
import { useState } from 'react';
import ModalPhoto from '../../../components/modal-photo/modal-photo';
import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hook';
import { useNavigate } from "react-router-dom";
import { AppRoute } from '../../../const';
import stub from '/stub.jpg'

export default function RestCardScreen () {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const restaurant = useAppSelector((state) => state.data);
  const stubImages = [stub, stub, stub];
  const images = restaurant.photosRest && restaurant.photosRest.length > 0 && restaurant.photosRest[0] !== null ? restaurant.photosRest.map(photo => `data:image/jpeg;base64,${photo}`) : stubImages;
  const [mainImage, setMainImage] = useState(images[0])
  const [activeImage, setActiveImage] = useState(0);
  const [modalPhotoIsOpen, setModalPhotoIsOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{restaurant.name}</title>
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
              <button className="menu__btn" onClick={() => {setModalPhoto(restaurant.menu === null ? stub : `data:image/jpeg;base64,${restaurant.menu}`); setModalPhotoIsOpen(true)}}></button>
              <button className="plan__btn" onClick={() => {setModalPhoto(restaurant.plan === null ? stub :  `data:image/jpeg;base64,${restaurant.plan}`); setModalPhotoIsOpen(true)}}></button>
              <ModalPhoto
              isOpen={modalPhotoIsOpen}
              onClose={() => setModalPhotoIsOpen(false)}
              photo={modalPhoto}/>
            </div>
          </section>
          <section className="description">
            <h2 className="restaurant-description">Описание</h2>
            <div className="restaurant-description-wrapper">
              <p className="restaurant-description__text">{restaurant.description}</p> {/* ограничение 350 символов */}
              <div className="restaurant-description-info">
                <p className="restaurant-description__text">Адрес: г. {restaurant.town}, ул. {restaurant.address}</p>
                <p className="restaurant-description__text">Контактные данные: {restaurant.phone}</p>
                <p className="restaurant-description__text">Время работы: {restaurant.opening} - {restaurant.ending}</p>
              </div>
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
