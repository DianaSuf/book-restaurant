import { Helmet } from 'react-helmet-async';
import './rest-card-screen.css'
import Header from '../../../components/header/header';
import { useState, useEffect, useMemo } from 'react';
import ModalPhoto from '../../../components/modal-photo/modal-photo';
import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hooks/hook';
import { useNavigate } from "react-router-dom";
import useRestById from '../../../hooks/rest-by-id';
import { AppRoute } from '../../../const';
import ModalRegister from '../../../components/modal-register/modal-register';

export default function RestCardScreen () {
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const restaurant = useRestById();
  const images = useMemo(() => { return restaurant.photosRest ? restaurant.photosRest.map(photo => `data:image/jpeg;base64,${photo}`) : [];}, [restaurant.photosRest])
  const [mainImage, setMainImage] = useState(images.length > 0 ? images[0] : '');
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    if (images.length > 0) {
        setMainImage(images[0]);
    }
  }, [images]);
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
              <button className="menu__btn" onClick={() => {setModalPhoto(`data:image/jpeg;base64,${restaurant.menu}`); setModalPhotoIsOpen(true)}}></button>
              <button className="plan__btn" onClick={() => {setModalPhoto(`data:image/jpeg;base64,${restaurant.plan}`); setModalPhotoIsOpen(true)}}></button>
              <ModalPhoto
              isOpen={modalPhotoIsOpen}
              onClose={() => setModalPhotoIsOpen(false)}
              photo={modalPhoto}/>
            </div>
          </section>
          <section className="description">
            <h2 className="restaurant-description">Описание</h2>
            <div className="restaurant-description-wrapper" /*contentEditable="true"*/>
              <p className="restaurant-description__text">{restaurant.description}</p>
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
            {authorizationStatus !== AuthorizationStatus.NoAuth 
            ? <button className="book__btn" onClick={() => navigate(`${AppRoute.Reserval}/${restaurant.id}`)}></button> 
            : <button className="book__btn" onClick={() => setModalRegisterIsOpen(true)}></button>
            }
            <ModalRegister
            isOpen={modalRegisterIsOpen}
            onClose={() => setModalRegisterIsOpen(false)}/>
        </div>
      </div>
    </>
  )
}
