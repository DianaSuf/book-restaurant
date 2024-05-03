import { Helmet } from 'react-helmet-async';
import './rest-card-screen.css'
import Header from '../../../components/header/header';
import promo from '/promo.jpg'
import w from '/w.jpg'
import { useState } from 'react';
import ModalPhoto from '../../../components/modal-photo/modal-photo';

export default function RestCardScreen () {
  const images = [promo, promo, w,];
  const [mainImage, setMainImage] = useState(images[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [modalPhotoIsOpen, setModalPhotoIsOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <div className="restaurant-card">
        <h1 className="restaurant-name">TableTime</h1>
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
          </section>
          <section className="description">
            <h2 className="restaurant-description">Описание</h2>
            <div className="restaurant-description-wrapper">
              <p className="restaurant-description__text">Бла бла бла</p>
            </div>
          </section>
        </div>
        <div className="popun__btns">
          <section className="menu-popun">
            <button className="menu__btn" onClick={() => {setModalPhoto(w); setModalPhotoIsOpen(true)}}></button>
            <button className="plan__btn" onClick={() => {setModalPhoto(promo); setModalPhotoIsOpen(true)}}></button>
            <ModalPhoto
            isOpen={modalPhotoIsOpen}
            onClose={() => setModalPhotoIsOpen(false)}
            photo={modalPhoto}/>
          </section>
        </div>
      </div>
    </>
  )
}
