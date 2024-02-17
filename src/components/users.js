import React from "react";
import { Container, Row, Col, Button, Navbar, Image,Dropdown,DropdownButton, CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect    } from 'react-bootstrap';
import UserCard from '../components/userCard'
// import { BsPencilFill } from "react-icons/bs";

export default function UsersPage(){
    const data=[
        {
            name: 'Иванов Иван',
            role: 'Студент'

        },
        {   
            name: 'Чел Человский',
            role: 'Преподаватель'
        }
    ]
    return(
        <Container  className="mt-5">
            <Card>
                <CardHeader>
                    
                    Фильтры
                </CardHeader>
                <CardBody className="row">
                    <FormGroup className="col-md-3">
                        <FormLabel for='NameSearch'>Поиск по имени пользователя</FormLabel>
                        <FormControl id='NameSearch'></FormControl>
                    </FormGroup>
                    <FormGroup className="col-md-3 ms-5">
                        <FormLabel for='RoleSort'>Сортировка по роли</FormLabel>
                        <FormSelect id='RoleSort'>
                            <option>Выбрать роль</option>
                            <option value="Student">Студент</option>
                            <option value="Prepod">Преподаватель</option>  
                        </FormSelect>
                    </FormGroup>
                    <Button className="col-md-2 ms-auto me-3 mt-auto">Применить</Button>
                </CardBody>
            </Card>
            <div className="mt-2">
                {data.map((user)=>(
                    <UserCard
                        name={user.name}
                        role={user.role}
                    />
                ))}
            </div>
            
        </Container>
    );
}