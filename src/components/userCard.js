import React, {useState, useEffect } from "react";
import { Form, ModalHeader,ModalTitle,ModalBody, ModalFooter, Container, Row, Col, Button, Navbar, Image,Modal,CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Alert    } from 'react-bootstrap';
// import { BsFillPersonFill  } from "react-icons/bs";
import { GiveRoleFetch } from "../requests/requestsMetods";

export default function UserCard(props){
    const roleTranslations = {
        Student: 'Студент',
        Administrator: 'Администратор',
        Dean: 'Деканат',
        DeanTeacher: 'Преподаватель-Деканат',
        Teacher: 'Преподаватель',
        User: 'Пользователь'
    };
    
    const { id, name, role, email } = props;
    const [selectedRole, setSelectedRole] = useState(role);
    const [selectedRoleColor, setSelectedRoleColor] = useState();
    const [flag, setFlag] = useState(true);
    const [roleText, setRoleText] = useState(roleTranslations[role]);
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        if (flag === true) {
            
            setSelectedRoleColor(selectedRole)
            setRoleText(roleTranslations[selectedRole])
            

        }
        else{
            setErrorMessage('У вас недостаточно прав для присвоения этой роли пользователю!')
        }
    }, [flag, selectedRole])

    let url='http://89.111.174.112:8181/GrantRole?Id='+id+'&Role='
    
    let roleClass;
    if(selectedRoleColor==='Administrator'){
        roleClass='bg-dark text-white'
    }
    if(selectedRoleColor==='Student'){
        roleClass='bg-success'
    }
    if(selectedRoleColor==='Dean'){
        roleClass='bg-primary'
    }
    if( selectedRoleColor==='DeanTeacher'){
        roleClass='bg-info'
    }
    if(selectedRoleColor==='Teacher'){
        roleClass='bg-warning '
    }
    if(selectedRoleColor==='User' ){
        roleClass='bg-secondary'
    }
    const [showModal, setShowModal] = useState(false);
    


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleRoleChange = async (e) => {
        const value=e.target.value
        
        url+=value
        const response=await GiveRoleFetch(url,localStorage.getItem('token'))
        if(response.status===200){
            
            handleSetFlag(true)   
        }
        else{
            handleSetFlag(false)
        }
        setSelectedRole(value);
        
    };
    const handleRoleTextChange = (e) => {
        setRoleText(e.target.value);
    };
    const handleSetFlag = (e) => {
        setFlag(e);
    };

    return (
        <Container className="mt-1">
            <Card className="">
                <CardBody className="row">
                    
                    <div className="fw-bold fs-5 col-md-3 text-start">{name}</div>
                    <div className="fw-bold fs-5 col-md-3 text-start ">
                        {email}
                    </div>
                    
                    
                    
                    <Button className={`ms-auto me-3  col-md-2  fs-5 text-black ${roleClass} rounded-4 border border-dark`}  onClick={handleShow}>{roleText}</Button>
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
                                            
                                            
                                            
                                        }}>
                                        <option value="Administrator">Администратор</option>
                                        <option value="Student">Студент</option>
                                        <option value="Teacher">Преподаватель</option>
                                        <option value="Dean">Деканат</option>
                                        <option value="DeanTeacher">Преподаватель-Деканат</option>
                                        <option value="User">Пользователь</option>
                                    </FormControl>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter className="d-flex">
                            <div className="flex-grow-1">
                                {flag===false ? (
                                    <Alert className='' variant="danger">{errorMessage}</Alert>
                                ) : (
                                    <></>
                                )}
                            </div>
                            
                            
                            
                            
                        </ModalFooter>
                    </Modal>

                </CardBody>
            </Card>
        </Container>
        
    );
}