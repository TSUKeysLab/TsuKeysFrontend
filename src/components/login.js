import React from "react";
import { Container, Row, Col, Button, Navbar, Image,Dropdown,DropdownButton, Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel    } from 'react-bootstrap';


export default function Login(){
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="col-md-6 shadow">
                <CardBody>
                    <CardTitle className="text-center fs-3">Вход</CardTitle>
                    <Form>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" id='emailInput' placeholder="Введите ваш email" />
                        </FormGroup>
                        <FormGroup className="mt-4">
                            <FormLabel>Пароль</FormLabel>
                            <FormControl type="password" id='PasswordInput' placeholder="Введите ваш пароль" />
                        </FormGroup>
                        <Button id="enterBtn" className="mt-4 text-center w-100">Войти</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}
