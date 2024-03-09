import React, { useState, useEffect } from "react";
import {Modal, ModalBody,ModalFooter,  Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap';
import { DeleteKeyFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

export default  function KeyCard(props) {
    const { owner, classroomNumber} = props;
    
    const [flag,setFlag]=useState(false)
    const [showModal, setShowModal] = useState(false);


    let url='http://89.111.174.112:8181/key/delete/'+classroomNumber

    const handleDeleteKey=async ()=>{
        const response=await DeleteKeyFetch(url,localStorage.getItem('token'))
        if(response.status==200){
            setFlag(true)
        }
        else{
            setFlag(false)
        }
    }

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        !flag &&(
            <>
                <Container className="mt-2">
                    <Card>
                        <CardBody className="row">
                            <div className="col-md-3 text-start">Ключ от аудитории: {classroomNumber}</div>
                            {owner==='Dean' ? (
                                <div className="col-md-5 text-center">В деканате</div>
                            ) :(
                                <div className="col-md-5">На руках у {owner}</div>
                            )}
                            <div className="col-md-4 text-end"><BsFillTrashFill style={{cursor: 'pointer'}} onClick={handleModalShow}/></div>
                            
                        </CardBody>
                    </Card>
                </Container>
                <Modal show={showModal} onHide={handleModalClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение удаления</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        Вы уверены, что хотите удалить ключ от аудитории {classroomNumber}?
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleModalClose}>Отмена</Button>
                        <Button variant="danger" onClick={handleDeleteKey}>Удалить</Button>
                    </ModalFooter>
                </Modal>
            </>
            
            
        )
        

        
    );
}
