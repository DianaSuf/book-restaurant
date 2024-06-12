import { useState } from 'react';
import './modal-register.css';
import PropTypes from 'prop-types';
import { registerAction, loginAction } from '../../store/api-actions';
import { useRef } from 'react';
import { useAppDispatch } from '../../hooks/hook';

ModalRegister.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function ModalRegister ({ isOpen, onClose }) {
    const usernameRef = useRef(null);
    const realnameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (evt) => {
        evt.preventDefault();
    
        if (usernameRef.current !== null && realnameRef.current !== null && emailRef.current !== null 
            && phoneRef.current !== null && passwordRef.current !== null && status === 'register') {
          dispatch(registerAction({
            username: usernameRef.current.value,
            realname: realnameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            password: passwordRef.current.value
          }));
          onClose();
        }

        if (usernameRef.current !== null && passwordRef.current !== null && status === 'singIn') {
            dispatch(loginAction({
              username: usernameRef.current.value,
              password: passwordRef.current.value
            }));
            onClose();
        }
    };

    const onWrapperClick = (event) => {
        if (event.target.classList.contains("modal-wrapper")) onClose();
    };

    const [status, setStatus] = useState('singIn');

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-wrapper" onClick={onWrapperClick}>
                        <div className="modal-content">
                            <form action="" className="register__form" onSubmit={handleSubmit}>
                                <h1 className="name__form">{status === 'register' ? 'РЕГИСТРАЦИЯ' : 'ВХОД'}</h1>
                                <div className="register__fields">
                                    <div className="register__field">
                                        <label
                                            className="register__label"
                                            htmlFor="user-login"
                                        >
                                            Логин
                                        </label>
                                    </div>
                                    <input
                                        ref={usernameRef}
                                        className="register__input"
                                        type="text"
                                        name="login"
                                        id="user-login"
                                        required 
                                    />
                                    {status === 'register' && (
                                        <>
                                            <div className="register__field">
                                                <label
                                                    className="register__label"
                                                    htmlFor="user-name"
                                                >
                                                    ФИО
                                                </label>
                                            </div>
                                            <input
                                                ref={realnameRef}
                                                className="register__input"
                                                type="text"
                                                name="name"
                                                id="user-name"
                                                required 
                                            />
                                        </>
                                    )}
                                    {status === 'register' && (    
                                        <>
                                            <div className="register__field">
                                                <label
                                                    className="register__label"
                                                    htmlFor="user-email"
                                                >
                                                    Email
                                                </label>
                                            </div>
                                            <input
                                                ref={emailRef}
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
                                                ref={phoneRef}
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
                                        ref={passwordRef}
                                        className="register__input"
                                        type="password"
                                        // placeholder="Password"
                                        name="user-password"
                                        id="user-password"
                                        required
                                    />
                                </div>
                                {status === 'register' &&
                                    <div className="sign-in__submit">
                                        <button className="register__btn" type="submit"></button>
                                        <h2 className="text__btn" onClick={() => setStatus('singIn')}>Уже есть аккаунт? ВОЙТИ</h2>
                                    </div>
                                }
                                {status === 'singIn' &&
                                    <div className="sign-in__submit">
                                        <button className="sign-in__btn" type="submit"></button>
                                        <h2 className="text__btn" onClick={() => setStatus('register')}>Еще нет аккаунта? ЗАРЕГИСТРИРОВАТЬСЯ</h2>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
