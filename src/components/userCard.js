import React, {useState} from "react";
import { Form, ModalHeader,ModalTitle,ModalBody, ModalFooter, Container, Row, Col, Button, Navbar, Image,Modal,CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect    } from 'react-bootstrap';
// import { BsFillPersonFill  } from "react-icons/bs";
import { GiveRoleFetch } from "../requests/requestsMetods";

export default function UserCard(props){
    const roleTranslations = {
        Student: 'Студент',
        Administrator: 'Администратор',
        Dean: 'Деканат',
        DeanTeacher: 'Деканат',
        Teacher: 'Преподаватель',
        User: 'Пользователь'
    };
    
    const { id, name, role, email } = props;
    const [selectedRole, setSelectedRole] = useState(role);
    const [roleText, setRoleText] = useState(roleTranslations[role]);
    
    
    let url='http://89.111.174.112:8181/GrantRole?Id='+id+'&Role='
    
    let roleClass;

    if(selectedRole==='Student'){
        roleClass='bg-success'
    }
    if(selectedRole==='Dean' || role==='DeanTeacher'){
        roleClass='bg-info'
    }
    if(selectedRole==='Teacher'){
        roleClass='bg-warning '
    }
    if(selectedRole==='User' ){
        roleClass='bg-secondary'
    }
    const [showModal, setShowModal] = useState(false);
    


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleRoleChange = async (e) => {
        const value=e.target.value
        setSelectedRole(value);
        url+=value
        debugger
        const response=await GiveRoleFetch(url,localStorage.getItem('token'))

    };
    const handleRoleTextChange = (e) => {
        setRoleText(e.target.value);
    };

    return (
        <Container className="mt-1">
            <Card className="">
                <CardBody className="row">
                    
                    <div className="fw-bold fs-5 col-md-3 text-start">{name}</div>
                    <div className="fw-bold fs-5 col-md-3 text-start ">
                        {email}
                    </div>
                    
                    
                    
                    <Button className={`ms-auto me-3  col-md-2 fw-bold fs-5 text-black ${roleClass} rounded-4 border border-dark`}  onClick={handleShow}>{roleText}</Button>
                    <Modal centered show={showModal} onHide={handleClose}>
                        <ModalHeader closeButton>
                            <ModalTitle>Назначить роль</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup controlId="roleSelect">
                                    <FormLabel>Выберите роль:</FormLabel>
                                    <FormControl as="select" value={selectedRole} onChange={(e)=>{
                                            
                                            handleRoleChange(e)
                                            handleRoleTextChange(e)
                                            setRoleText(roleTranslations[e.target.value])
                                        }}>
                                        <option value="Student">Студент</option>
                                        <option value="Teacher">Преподаватель</option>
                                        <option value="Dean">Деканат</option>
                                        <option value="Administrator">Администратор</option>
                                        <option value="User">Пользователь</option>
                                        {/* <option value="Teacher">Преподаватель</option> */}
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