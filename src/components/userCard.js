import React from "react";
import { Container, Row, Col, Button, Navbar, Image,Dropdown,DropdownButton, CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect    } from 'react-bootstrap';
import { BsPencilFill } from "react-icons/bs";

export default function UserCard(props){
    const { name, role } = props;

    const roleClass = role === 'Студент' ? 'bg-success' : 'bg-info';


    return(
        <div className="mt-1">
            <Card className={roleClass} >
                <CardBody className="d-flex align-items-center">
                    
                    <Image
                        src="https://www.taksa48.ru/images/user.png"
                        width="70"
                        height="70"
                        className="me-3 ms-3"
                    />
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <div className="row">
                            <span className="fw-bold">
                                {role} 
                                <BsPencilFill id="editRole" className="ms-2"/>
                            </span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
        
        
    );
}