import React, { useState } from "react";
import { Container, Row, Col, Button, Alert,Navbar, Image,Dropdown,DropdownButton, Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel    } from 'react-bootstrap';
import { LoginFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";
import { LineWave  as Loader} from "react-loader-spinner";

export default function Login(){

    const navigate = useNavigate();
    const [data, setData]=useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')

    const handleEmailChange=(e)=>{
        setData({
            ...data,
            email: e.target.value
        })
    }
    const handlePasswordChange=(e)=>{
        setData({
            ...data,
            password: e.target.value
        })
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setLoading(true);
        const response=await LoginFetch(data)
        const responseData=await response.json()
        // console.log(response)
        setTimeout(() => {
            setLoading(false);
            if (response.status === 200) {
                localStorage.setItem('token', responseData.token)
                navigate('/users');
                // console.log(responseData);
            } 
            else {
                setErrorMessage('Неправильный пароль или email');
            }
        }, 1000);
        
    }
    
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="col-md-6 shadow">
                <CardBody>
                    <CardTitle className="text-center fs-3">Вход</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="email" value={data.email} onChange={handleEmailChange} placeholder="Введите ваш email" />
                        </FormGroup>
                        <FormGroup className="mt-4 ">
                            <FormLabel>Пароль</FormLabel>
                            <FormControl type="password" value={data.password} onChange={handlePasswordChange} placeholder="Введите ваш пароль" />
                        </FormGroup>
                        {loading ? (
                            <div className="d-flex ms-4 justify-content-center align-items-center">
                                <Loader
                                    color="#43c4ca"
                                    height={80}
                                    width={80}
                                />
                            </div>
                        ) :<Button type="submit" className="mt-4 mb-3 text-center w-100">Войти</Button>}

                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}
