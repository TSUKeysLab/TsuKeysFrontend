import React from "react";
import { Container, Row, Col, Button, Navbar, Image,Dropdown,DropdownButton, CardBody, Card, CardTitle, CardHeader, FormGroup, FormLabel, FormControl, FormSelect    } from 'react-bootstrap';
import UserCard from '../components/userCard'
// import { BsPencilFill } from "react-icons/bs";

export default function UsersPage(){
    const data=[
        {
            key: '1',
            name: 'Иванов Иван',
            role: 'Студент',
            email: 'exemple@gmail.com'

        },
        {   
            key: '2',

            name: 'Чел Человский',
            role: 'Преподаватель',
            email: 'exemple@gmail.com'
        },
        {   
            key: '3',

            name: 'Рандом юзер',
            role: 'Пользователь',
            email: 'exemple@gmail.com'
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
                        <FormLabel>Поиск по имени пользователя</FormLabel>
                        <FormControl id='NameSearch'></FormControl>
                    </FormGroup>
                    <FormGroup className="col-md-3">
                        <FormLabel >Сортировка по роли</FormLabel>
                        <FormSelect id='RoleSort'>
                            <option>Выбрать роль</option>
                            <option value="Student">Студент</option>
                            <option value="Prepod">Преподаватель</option>  
                        </FormSelect>
                    </FormGroup>
                    <Button className="col-md-2 ms-auto me-3 mt-auto">Применить</Button>
                </CardBody>
            </Card>
            <Card className="mt-3">
                <CardBody>
                    <div className="me-3 ms-3">
                        {data.map((user)=>(
                            <UserCard
                                key={user.key}
                                name={user.name}
                                role={user.role}
                                email={user.email}
                            />
                        ))}
                    </div>
                </CardBody>
            </Card>
            
            
        </Container>
    );
}