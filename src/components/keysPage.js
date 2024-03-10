import React, { useState, useEffect } from "react";
import {Alert,FormCheck,  Container,ModalHeader, ModalBody,Card,ModalFooter, CardBody, Modal, CardHeader, FormGroup, FormLabel, FormControl,Button } from 'react-bootstrap';
import { KeysFeedFetch,CreateKeyFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";
import KeyCard from "./keysCard";

export default  function KeysPage() {

    const baseUrl = 'http://89.111.174.112:8181/key';


    const [keys, setKeys] = useState([]);
    const [keyNum, setKeyNum] = useState('');
    const [flag, setFlag]=useState(true)
    const [flagKey, setFlagKey]=useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [data,setData]=useState({
        classroomNumber: ''
    })
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('showAll');


    useEffect(() => {
        fetchData();
    }, [flagKey, keyNum,selectedOption]);

    
    const fetchData = async () => {
        let url = baseUrl;
        // if(keyNum!=''){
        //     url+='classroomNumber'
        // }
        if(selectedOption==="showAll"){
            url=baseUrl
        }
        if(selectedOption==="dean"){
            url+='?owned=false'
        }
        if(selectedOption==="onHands"){
            url+='?owned=true'
        }
        if(keyNum!=''){
            if(selectedOption==="showAll"){
                url+='?classroomNumber='+keyNum
            }
            else{
                url+='&classroomNumber='+keyNum
            }
            
        }

        const data = await KeysFeedFetch(url, localStorage.getItem('token'));
        
        if(data.length>0){
            setFlag(true)
        }
        else{
            setFlag(false)
        }
        // debugger
        setKeys(data);
        
    };
    
    const handleKeyNumChange = (e) => {
        setKeyNum(e.target.value)
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

    
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };

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
            <Card>
                <CardHeader>Фильтры</CardHeader>
                <CardBody className="row">
                    <FormGroup  className="col-md-3">
                        <FormControl placeholder="Номер аудитории" value={keyNum} onChange={handleKeyNumChange}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-md-8 d-flex align-items-center ">
                        <div>
                        <FormCheck
                            inline
                            type="radio"
                            label="Показать все"
                            name="filter"
                            value="showAll"
                            checked={selectedOption === 'showAll'}
                            onChange={handleOptionChange}
                        />
                        <FormCheck
                            inline
                            type="radio"
                            label="В деканате"
                            name="filter"
                            value="dean"
                            checked={selectedOption === 'dean'}
                            onChange={handleOptionChange}
                        />
                            <FormCheck
                            inline
                            type="radio"
                            label="На руках"
                            name="filter"
                            value="onHands"
                            checked={selectedOption === 'onHands'}
                            onChange={handleOptionChange}
                        />
                        </div>
                    </FormGroup>
                </CardBody>
            </Card>
           <Card className="mt-2">
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
