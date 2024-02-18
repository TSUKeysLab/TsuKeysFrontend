import React, {useState} from "react";
import { Form, ModalHeader,ModalTitle,ModalBody, ModalFooter, Container, Row, Col, Button, Navbar, Image,Modal,CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect    } from 'react-bootstrap';
import { BsPencilFill } from "react-icons/bs";

export default function UserCard(props){
    const { name, role, email } = props;

    let roleClass;
    if(role==='Студент'){
        roleClass='bg-success'
    }
    if(role==='Преподаватель'){
        roleClass='bg-info'
    }
    if(role==='Пользователь'){
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
        <div className="mt-1">
            <Card>
                <CardBody className="d-flex">
                    <Image
                        src="https://www.taksa48.ru/images/user.png"
                        width="70"
                        height="70"
                        className="me-3 ms-3 mt-3"
                    />
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <div className="fw-bold">
                            {email}
                        </div>
                        <Button className={`mt-2 fw-bold btn btn-sm text-black ${roleClass} rounded-pill border border-dark`} style={{ width: '100%' }} onClick={handleShow}>{role}</Button>
                        <Modal show={showModal} onHide={handleClose}>
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
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}