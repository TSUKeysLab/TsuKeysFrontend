import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Navbar, Image, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutFetch } from "../requests/requestsMetods";

function Header() {
    const location = useLocation();
    const [headerText, setHeaderText] = useState("");

    useEffect(() => {
        
        switch (location.pathname) {
            case "/users":
                setHeaderText("Пользователи");
                break;
            case "/login":
                setHeaderText("Вход");
                break;
            case "/keys":
                setHeaderText("Ключи");
                break;
            case "/requests":
                setHeaderText("Заявки");
                break;
            
            default:
                setHeaderText("");
                break;
        }
    }, [location]);

    const token=localStorage.getItem('token')
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault()
        const response=await LogoutFetch(token)
        if (response){
            localStorage.clear()
            navigate('/login')
        }
    };

    return (
        <Navbar className="bg-dark shadow">
            <div className="py-1 d-flex align-items-center ms-5 flex-grow-1">
                <Link to="/" className="text-decoration-none">
                    <Image
                        src="https://facultetus.ru/images/universities/fe528b970af8e7a11ee44374ecd12e24.png"
                        width="35"
                        height="35"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        className="mb-2"
                    />
                    <span className="text-white fs-5 ms-1">TSU.Ключи</span>
                </Link>

                {/* <Link to='' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                    {headerText === "Заявки" ? <span className='text-primary'>Заявки</span> : "Заявки"}

                </Link>
                <Link to='/users' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                    {headerText === "Пользователи" ? <span className='text-primary'>Пользователи</span> : "Пользователи"}
                </Link>
                <Link to='' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                    {headerText === "Ключи" ? <span className='text-primary'>Ключи</span> : "Ключи"}

                </Link> */}
                {
                    token ? (
                        <div className="py-1 d-flex align-items-center ms-5 flex-grow-1">
                            <Link to='' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                {headerText === "Заявки" ? <span className='text-primary'>Заявки</span> : "Заявки"}

                            </Link>
                            <Link to='/users' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                {headerText === "Пользователи" ? <span className='text-primary'>Пользователи</span> : "Пользователи"}
                            </Link>
                            <Link to='' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                {headerText === "Ключи" ? <span className='text-primary'>Ключи</span> : "Ключи"}

                            </Link>
                            <span className="text-white ms-auto me-5 text-decoration-none" style={{ opacity: 0.7, cursor: 'pointer' }} onClick={handleLogout}>Выход</span>

                        </div>
                        // <Link to="/login" className="text-white ms-auto me-5 text-decoration-none" style={{ opacity: 0.7 }} onClick={handleLogout}>
                        //     Выход
                        // </Link>
                    ) : <Link to="/login" className="text-white ms-auto me-5 text-decoration-none" style={{ opacity: 0.7 }}>
                            {headerText === "Вход" ? <span className='text-primary'>Вход</span> : "Вход"}
                        </Link>
                }
                        
            </div>
        </Navbar>
    );
}

export default Header;
