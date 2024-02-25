import React, {useState} from "react";
import { Form, ModalHeader,ModalTitle,ModalBody, ModalFooter, Container, Row, Col, Button, Navbar, Image,Modal,CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect    } from 'react-bootstrap';
import { BsFillPersonFill  } from "react-icons/bs";

export default function UserCard(props){
    const { name, role, email } = props;

    let roleClass;
    if(role==='Student'){
        roleClass='bg-success'
    }
    if(role==='Teacher' || role==='Dean' || role==='DeanTeacher'){
        roleClass='bg-info'
    }
    if(role==='User' ){
        roleClass='bg-secondary'
    }
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(role);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <Container className="mt-1">
            <Card className="">
                <CardBody className="row">
                    
                    <div className="fw-bold fs-5 col-md-2 text-start">{name}</div>
                    <div className="fw-bold fs-5 col-md-4">
                        {email}
                    </div>
                    
                    
                    
                    <Button className={`ms-auto me-2 col-md-2 fw-bold fs-5 text-black ${roleClass} rounded-4 border border-dark`}  onClick={handleShow}>{role}</Button>
                    <Modal centered show={showModal} onHide={handleClose}>
                        <ModalHeader closeButton>
                            <ModalTitle>Назначить роль</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup controlId="roleSelect">
                                    <FormLabel>Выберите роль:</FormLabel>
                                    <FormControl as="select" value={selectedRole} onChange={handleRoleChange}>
                                        <option value="Студент">Студент</option>
                                        <option value="Преподаватель">Преподаватель</option>
                                    </FormControl>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleClose}>
                                Закрыть
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Сохранить
                            </Button>
                        </ModalFooter>
                    </Modal>

                </CardBody>
            </Card>
        </Container>
        
    );
}