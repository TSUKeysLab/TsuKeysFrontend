import React, { useState, useEffect } from "react";
import { Container,NavbarToggle, Row, Col, Button, Navbar, Image, Dropdown, DropdownButton, NavbarCollapse, NavbarBrand, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutFetch } from "../requests/requestsMetods";
import {observer} from "mobx-react-lite";

export const Header=observer(()=>{
    const location = useLocation();
    const [headerText, setHeaderText] = useState("");
    const navigate = useNavigate();



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


    const handleLogout = async (e) => {
        e.preventDefault()
        const response=await LogoutFetch(token)
        if (response){
            localStorage.clear()
            navigate('/login')
        }
    };
        

    return (
        <Navbar className="bg-dark shadow fixed-top " expand='lg'>
            <Container fluid className="me-3">
                <Link to="/" className="text-decoration-none ms-2">
                    <Image
                        src="https://facultetus.ru/images/universities/fe528b970af8e7a11ee44374ecd12e24.png"
                        width="35"
                        height="35"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        className="mb-2"
                    />
                    <NavbarBrand className="ms-2 text-white">
                        TSU.Ключи
                    </NavbarBrand>
                </Link>
                
                <NavbarToggle className="bg-light"/>
                <NavbarCollapse >
                    <Nav className="w-100">
                    {
                        token ? (
                            <>
                                <Link to='' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                    {headerText === "Заявки" ? <span className='text-primary'>Заявки</span> : "Заявки"}

                                </Link>
                                <Link to='/users' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                    {headerText === "Пользователи" ? <span className='text-primary'>Пользователи</span> : "Пользователи"}
                                </Link>
                                <Link to='' className="text-white ms-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                    {headerText === "Ключи" ? <span className='text-primary'>Ключи</span> : "Ключи"}

                                </Link>
                                <span className="text-white  ms-lg-auto ms-5 mt-lg-0 mt-3" style={{ opacity: 0.7, cursor: 'pointer' }} onClick={handleLogout}>Выход</span>

                            </>
                            
                        ) : <Link to="/login" className="text-white ms-auto me-lg-5 text-decoration-none" style={{ opacity: 0.7 }}>
                                {headerText === "Вход" ? <span className='text-primary'>Вход</span> : "Вход"}
                            </Link>
                    }
                    </Nav>
                </NavbarCollapse>
            </Container>
            
        </Navbar>
    );
})

// export default Header;
