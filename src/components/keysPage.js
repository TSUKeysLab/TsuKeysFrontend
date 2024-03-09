import React, { useState, useEffect } from "react";
import {Alert, Container,ModalHeader, ModalBody,Card,ModalFooter, CardBody, Modal, CardHeader, FormGroup, FormLabel, FormControl,Button } from 'react-bootstrap';
import { KeysFeedFetch,CreateKeyFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";
import KeyCard from "./keysCard";

export default  function KeysPage() {

    const baseUrl = 'http://89.111.174.112:8181/key?gettingStatus=AllKeys';


    const [keys, setKeys] = useState([]);
    const [flag, setFlag]=useState(true)
    const [flagKey, setFlagKey]=useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [data,setData]=useState({
        classroomNumber: ''
    })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [flagKey]);

    
    
    const fetchData = async () => {
        let url = baseUrl;
        
        
        const data = await KeysFeedFetch(url, localStorage.getItem('token'));
        
        if(Array.isArray(data)){
            setFlag(true)
        }
        else{
            setFlag(false)
        }
        // debugger
        setKeys(data);
        
    };
    
    
    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleCreateKey=async ()=>{
        if(data.classroomNumber!=''){
            const response=await CreateKeyFetch(data,localStorage.getItem('token'))
            
            if(response.status==200){
                setFlagKey(true)
                setErrorMessage('')
            }
            else{
                setErrorMessage('Такой ключ уже существует!')
                setFlagKey(false)
            }
        }
    }

    

    const handleKeyChange=(e)=>{
        setData({
            ...data,
            classroomNumber: e.target.value
        })
    }
    return (
        <Container className="" style={{ marginTop: '110px' }}>
           <Button className="mb-2 border-0" onClick={handleModalShow} style={{backgroundColor: '#77DD77'}} >Создать ключ</Button>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <ModalHeader closeButton>
                    <Modal.Title>Создание нового ключа</Modal.Title>
                </ModalHeader>
                <ModalBody>
                    <FormControl placeholder="Введите номер аудитории" value={data.classroomNumber} onChange={handleKeyChange}></FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleModalClose}>Закрыть</Button>
                    <Button className="border-0" style={{ backgroundColor: '#77DD77' }} onClick={handleCreateKey}>
                        Создать
                    </Button>
                    {flagKey === false ? (
                        <Alert className="w-100" variant="danger">{errorMessage}</Alert>
                    ) : (
                        <></>
                    )}
                </ModalFooter>
            </Modal>
           <Card className="">
                <CardBody className="text-center">
                    <div className="me-3 ms-3">
                        {flag===true  ? (
                            keys.map(keyItem => (
                                <KeyCard
                                    key={keyItem.classroomNumber}
                                    owner={keyItem.owner}
                                    classroomNumber={keyItem.classroomNumber}
                                />
                            ))
                        ) : (
                            <span className="text-danger fw-bold fs-3">Ключи отсутсвуют</span>
                        )}
                    </div>
                </CardBody>
            </Card> 
        </Container>
    );
}
