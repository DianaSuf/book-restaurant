import { useState } from 'react';
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

    const [status, setStatus] = useState('singIn');

    return (
        <>
            {isOpen && (
                <form action="#" className="modal">
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
                                        name="name"
                                        id="user-name"
                                        required
                                    />
                                    {status === 'register' && (    
                                        <>
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
                                                name="email"
                                                id="user-email"
                                                required 
                                            />
                                        </>
                                    )}
                                    {status === 'register' && (
                                        <>
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
                                                id="user-phone"
                                                name="phone"
                                                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                required
                                            />
                                        </>
                                    )}
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
                                    <button className="sign-in__btn" type="submit" onClick={() => setStatus('singIn')}></button>
                                    <button className="register__btn" type="submit" onClick={() => setStatus('register')}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}
