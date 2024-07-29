import './modal-review.css'
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { reviewAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hook';

ModalReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idReserval: PropTypes.number.isRequired
};

export default function ModalReview ({ isOpen, onClose, idReserval }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const dispatch = useAppDispatch();
  const reviewRef = useRef(null);
  
  const handleSubmitReview = (evt) => {
    evt.preventDefault();
    if (rating != null) {
      dispatch(reviewAction({
        idReserval: idReserval,
        text: reviewRef.current.value,
        grade: rating,
      }))
    }
    onClose();
  };

  const handleClose = () => {
    setRating(null); // Сброс значения рейтинга
    setHover(null); // Сброс значения hover
    onClose(); // Закрытие модального окна
  };
  
  return (
    <>
      {isOpen && (
        <div className="modal-review">
          <div className="modal-review-wrapper">
            <div className="modal-review-content">
              <form action="" className="review__form" onSubmit={handleSubmitReview}>
                <div className="review__fields">
                  <p className="review-text">ВАША ОЦЕНКА:</p>
                  <div className="review-stars-container">
                    {[...Array(3)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <label key={currentRating}>
                          <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                          />
                          <div className="review-star-container">
                            <FaStar 
                              className="star" 
                              size={60}
                              color={currentRating <= (hover || rating) ? "F5FA00" : "ECECEC"}
                              onMouseEnter={() => setHover(currentRating)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <p className="review-text">ВАШ ОТЗЫВ:</p>
                <textarea
                  ref={reviewRef}
                  className="review__textarea"
                  type="text"
                  name="review"
                  id="review"
                  maxLength={350}
                  required
                />
                <div className="review-button__fields">
                  <div className="review__fields"><button className="cancel-review__btn" onClick={handleClose}></button></div>
                  <div className="review__fields"><button className="save-review__btn" type="submit"></button></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
