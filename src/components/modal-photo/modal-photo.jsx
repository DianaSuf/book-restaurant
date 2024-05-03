import PropTypes from 'prop-types';
import './modal-photo.css'

ModalPhoto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.string.isRequired,
};

export default function ModalPhoto ({ isOpen, onClose, photo }) {
  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modal-photo-wrapper")) onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-photo">
          <div className="modal-photo-wrapper" onClick={onWrapperClick}>
            <div className="modal-photo-content">
              <img className="photo" alt="photo" src={photo}/>
            </div>
          </div>
        </div>
      )}
    </>
  )
}