import { Helmet } from 'react-helmet-async';
import './rest-card-screen.css'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import { useState, useEffect } from 'react';
import ModalPhoto from '../../../components/modal-photo/modal-photo';
import { renderStars } from '../../../components/modal-review/star';
import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hooks/hook';
import { useNavigate } from "react-router-dom";
import useRestById from '../../../hooks/rest-by-id';
import { AppRoute } from '../../../const';
import ModalRegister from '../../../components/modal-register/modal-register';
import stub from '/stub.jpg'

export default function RestCardScreen () {
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const stubImages = [stub, stub, stub];
  const restaurant = useRestById();
  const images = restaurant.photosRest && restaurant.photosRest.length > 0 && restaurant.photosRest[0] !== null ? restaurant.photosRest.map(photo => `data:image/jpeg;base64,${photo}`) : stubImages;
  const [mainImage, setMainImage] = useState(images[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [modalPhotoIsOpen, setModalPhotoIsOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (mainImage === stub) {
        setMainImage(images[0]);
    }
  }, [images, mainImage]);

  return (
    <>
      <Helmet>
        <title>{restaurant.name}</title>
      </Helmet>
      <Header/>
      <section className="restaurant-card">
        <h1 className="restaurant-name">{restaurant.name}<div className="restaurant-star-container"> {renderStars(restaurant.avgRating, 50)}</div></h1>
        <div className="restaurant-card-content">
          <section className="description">
            <div className="gallery">
              <div className="gallery-wrapper">
                <img className="active-img" src={mainImage}/>
                <ul className="gallery-preview">
                  {images.map((image, index) => (
                    <li className={`preview-item ${index === activeImage ? 'active' : ''}`} key={index}>
                      <a href="#" onClick={(e) => { e.preventDefault(); setMainImage(image); setActiveImage(index);}}>
                        <img className="preview-img" src={image} alt={`Thumbnail ${index + 1}`} />
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
            </div>
            {restaurant.length !== 0 && restaurant.reviewData.length !== 0 &&
              <div className="restaurant-description">
                {restaurant.length !== 0 && restaurant.reviewData.length === 0 && <h2 className="restaurant-review">Описание</h2>}
                <div className="restaurant-description-wrapper" /*contentEditable="true"*/>
                  <p className="restaurant__text">{restaurant.description}</p>
                  <div className="restaurant-description-info">
                    <p className="restaurant__text">Адрес: г. {restaurant.town}, ул. {restaurant.address}</p>
                    <p className="restaurant__text">Контактные данные: {restaurant.phone}</p>
                    <p className="restaurant__text">Время работы: {restaurant.opening} - {restaurant.ending}</p>
                  </div>
                </div>
              </div>
            }
          </section>
          {restaurant.length !== 0 && restaurant.reviewData.length !== 0 &&
            <section className="review">
              <h2 className="restaurant-review">Отзывы посетителей</h2>
              {restaurant.reviewData.map((review) => (
                <div className="review-card"  key={review.id}>
                  <div className="restaurant-description-wrapper">
                    <div className="restaurant-card-container">
                      <h3 className="review-card-name">{review.login}</h3>
                      <div className="review-star">{renderStars(review.grade, 30)}</div>
                    </div>
                    <p className="restaurant__text">{review.text}</p>
                  </div>
                </div>
              ))}
            </section>
          }
          {restaurant.length !== 0 && restaurant.reviewData.length === 0 &&
            <section className="restaurant-description">
              {restaurant.length !== 0 && restaurant.reviewData.length === 0 && <h2 className="restaurant-review">Описание</h2>}
              <div className="restaurant-description-wrapper" /*contentEditable="true"*/>
                <p className="restaurant__text">{restaurant.description}</p>
                <div className="restaurant-description-info">
                  <p className="restaurant__text">Адрес: г. {restaurant.town}, ул. {restaurant.address}</p>
                  <p className="restaurant__text">Контактные данные: {restaurant.phone}</p>
                  <p className="restaurant__text">Время работы: {restaurant.opening} - {restaurant.ending}</p>
                </div>
              </div>
            </section>
          }
        </div>
        <div className="restaurant-card-container">
            {authorizationStatus === AuthorizationStatus.ADMIN_REST && <button className="edit__btn" onClick={() => navigate(AppRoute.Edit)}></button>}
            {authorizationStatus !== AuthorizationStatus.NoAuth 
            ? authorizationStatus === AuthorizationStatus.ADMIN_REST 
            ? <button className="book__btn" onClick={() => navigate(AppRoute.Reserval)}></button> 
            : <button className="book__btn" onClick={() => navigate(`${AppRoute.Reserval}/${restaurant.id}`)}></button> 
            : <button className="book__btn" onClick={() => setModalRegisterIsOpen(true)}></button>
            }
            <ModalRegister
            isOpen={modalRegisterIsOpen}
            onClose={() => setModalRegisterIsOpen(false)}/>
        </div>
      </section>
      <Footer/>
    </>
  )
}
