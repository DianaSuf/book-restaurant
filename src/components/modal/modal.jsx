import './modal.css';
import PropTypes from 'prop-types';

ModalRegister.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default function ModalRegister ({ isOpen, onClose }) {
    const onWrapperClick = (event) => {
        if (event.target.classList.contains("modal-wrapper")) onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-wrapper" onClick={onWrapperClick}>
                        <div className="modal-content">
                            <form action="#" className="register__form">
                                <div className="register__fields">
                                    <div className="register__field">
                                        <label
                                            className="register__label"
                                            htmlFor="user-name"
                                        >
                                                    Имя пользователя
                                        </label>
                                    </div>
                                    <input
                                        className="register__input"
                                        type="text"
                                        name="user-name"
                                        id="user-name"
                                        required
                                    />
                                    <div className="register__field">
                                        <label
                                            className="register__label"
                                            htmlFor="user-email"
                                        >
                                                    Почта
                                        </label>
                                    </div>
                                    <input
                                        className="register__input"
                                        type="email"
                                        name="user-email"
                                        id="user-email"
                                        required
                                    />
                                    <div className="register__field">
                                        <label
                                            className="register__label"
                                            htmlFor="user-phone"
                                        >
                                                    Номер телефона
                                        </label>
                                    </div>
                                    <input
                                        className="register__input"
                                        type="tel"
                                        name="user-phone"
                                        id="user-phone"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        required
                                    />
                                    <div className="register__field">
                                        <label
                                            className="register__label"
                                            htmlFor="user-password"
                                        >
                                                    Пароль
                                        </label>
                                    </div>
                                    <input
                                        className="register__input"
                                        type="password"
                                        // placeholder="Password"
                                        name="user-password"
                                        id="user-password"
                                        required
                                    />
                                </div>
                                <div className="sign-in__submit">
                                    <button className="register__btn" type="submit"></button>
                                    <button className="sign-in__btn" type="submit"></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}