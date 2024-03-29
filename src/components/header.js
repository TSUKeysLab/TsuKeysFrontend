import React from "react";
import { Container, Row, Col, Button, Navbar, Image,Dropdown,DropdownButton    } from 'react-bootstrap';
import { Link } from "react-router-dom";



function Header(){
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
                
                <span className="text-white ms-5" style={{opacity: 0.7}}>Заявки</span>
                <span className="text-white ms-5" style={{opacity: 0.7}}>Пользователи</span>
                <span className="text-white ms-5" style={{opacity: 0.7}}>Ключи</span>
                <Link to="/login" className="text-white ms-auto me-5 text-decoration-none">
                    <span  style={{opacity: 0.7}}>Вход</span>
                </Link>
                
            </div>
        </Navbar>
    );
}

export default Header