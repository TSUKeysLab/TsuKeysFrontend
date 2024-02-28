import React, { useState } from "react";
import { Container, Row, Col, Button, Alert,Navbar, Image,Dropdown,DropdownButton, Card, CardBody, CardTitle,Form, FormGroup, FormControl, FormLabel    } from 'react-bootstrap';
import { LoginFetch, ProfileFetch } from "../requests/requestsMetods";
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
        
        setTimeout(async () => {
            setLoading(false);
            if (response.token) {
                const responseProfile=await ProfileFetch(response.token)
                console.log('role',responseProfile.role)
                if (responseProfile.role==='DeanTeacher' || responseProfile.role==='Dean' || responseProfile.role==='Administrator'){
                    localStorage.setItem('token', response.token)
                    navigate('/users');
                }
                else{
                    setErrorMessage('У вас недостаточно прав доступа! Обратитесь к администратору!');
                }
                
                // console.log(responseData);
            } 
            else {
                setErrorMessage('Неправильный пароль или email!');
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

                        {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}
