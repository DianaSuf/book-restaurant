import { Helmet } from 'react-helmet-async';
import './sale-edit-screen.css'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import { useAppDispatch } from '../../../hooks/hook';
import { useParams } from "react-router-dom";
import { saleCreateAction, saleUpdateAction, fetchSaleAction } from '../../../store/api-actions';
import { useState, useRef, useEffect } from 'react';
import stub from '/stub.jpg'

export default function SaleEditScreen () {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [nameSale, setNameSale] = useState('');
  const [textSale, setTextSale] = useState('');
  const [photoSale, setPhotoSale] = useState(null);
  const [photoURL, setPhotoURL] = useState(stub);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const addSaleRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const saleData = await dispatch(fetchSaleAction({id: id}));
        setNameSale(saleData.payload.name ?? "");
        setTextSale(saleData.payload.text ?? "");
        // setPhotoSale(saleData.payload.photo);
        // setPhotoURL(`data:image/jpeg;base64,${saleData.payload.photo}`);
        let photoData = saleData.payload.photo;
        if (photoData.startsWith("data:image/jpeg;base64,")) {
          photoData = photoData.replace("data:image/jpeg;base64,", "");
        }
        setPhotoSale(photoData);
        setPhotoURL(`data:image/jpeg;base64,${photoData}`);
        setIsImageSelected(true);
      }
    }

    fetchData();

  }, [id, dispatch]);

  const handleChangePhotoSale = (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setPhotoSale(base64String);
      setPhotoURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleSubmitSale = (evt) => {
    evt.preventDefault();
    if (!isImageSelected) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }
    if (id) {
      dispatch(saleUpdateAction({
        id: id,
        name: nameSale,
        text: textSale,
        photo: photoSale,
      }));
    } else if (nameSale != null && textSale != null && photoSale != null) {
      dispatch(saleCreateAction({
        name: nameSale,
        text: textSale,
        photo: photoSale,
      }))
    }
  };
  
  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="sale-edit-main">
        <h1 className="sale-edit">Редактирование</h1>
        <form action="#" className="sale-edit__form" onSubmit={handleSubmitSale}>
          <div className="sale-edit-content">
            <div className="sale-edit-container c1">
              <label
                className="sale__label"
                htmlFor="sale-edit-name"
              >
                Название акции
              </label>
              <input
                className="sale__input"
                type="text"
                name="name"
                id="sale-edit-name"
                value={nameSale}
                maxLength={21}
                onChange={(e) => setNameSale(e.target.value)}
                required
              />
              <div className="sale-edit-images">
                <img className="sale-edit-image" src={photoURL}/>
                <button className="changeSale__btn" onClick={() => addSaleRef.current.click()}></button>
                <input ref={addSaleRef} className="addSale_input" type="file" accept='image/*,.png,.jpg,.gif,.web' onChange={handleChangePhotoSale}/>
              </div>
            </div>
            <div className="sale-edit-container c2">
              <label
                className="sale__label"
                htmlFor="sale-edit-description"
              >
                Условия акции
              </label>
              <textarea
                className="sale-description__textarea"
                type="text"
                name="description"
                id="sale-edit-description"
                maxLength={200}
                value={textSale}
                onChange={(e) => setTextSale(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="sale-save__btn"></button>
        </form>
      </section>
      <Footer/>
    </>
  )
}
