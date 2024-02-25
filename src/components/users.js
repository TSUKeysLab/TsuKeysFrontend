import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap';
import UserCard from '../components/userCard';
import { UsersFeedFetch } from "../requests/requestsMetods";

export default function UsersPage() {
    const baseUrl = 'http://89.111.174.112:8181/GetUserInformation?';
    const [fullname, setFullName] = useState('');
    const [users, setUsers] = useState([]);
    const [flag, setFlag]=useState(true)
    // let flag=false
    useEffect(() => {
        fetchData();
    }, [fullname]);

    const fetchData = async () => {
        let role = '';
        let url = baseUrl;
        if (fullname !== '') {
            url += 'fullname=' + fullname + '&';
        }
        if (role !== '') {
            url += 'role=' + role + '&';
        }
        url += 'size=5&page=1';

        //debugger
        const data = await UsersFeedFetch(url, localStorage.getItem('token'));
        debugger
        if(!data.users){
            setFlag(false)
            // debugger
        }
        else{
            setFlag(true)
        }
        setUsers(data.users);
    
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <Container className="mt-5">
            <Card>
                <CardHeader>
                    Фильтры
                </CardHeader>
                <CardBody className="row">
                    <FormGroup className="col-md-3">
                        <FormLabel>Поиск по имени пользователя</FormLabel>
                        <FormControl value={fullname} onChange={handleFullNameChange}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-md-3">
                        <FormLabel >Сортировка по роли</FormLabel>
                        <FormSelect id='RoleSort'>
                            <option>Выбрать роль</option>
                            <option value="Student">Студент</option>
                            <option value="Prepod">Преподаватель</option>
                        </FormSelect>
                    </FormGroup>
                    <Button className="col-md-2 ms-auto me-3 mt-auto" onClick={handleSubmit}>Применить</Button>
                </CardBody>
            </Card>
            <Card className="mt-3">
                <CardBody className="text-center">
                    <div className="me-3 ms-3">
                        {flag===true  ? (
                            users.map(user => (
                                <UserCard
                                    key={user.userId}
                                    name={user.fullname}
                                    role={user.role}
                                    email={user.email}
                                />
                            ))
                        ) : (
                            <span className="text-danger fw-bold fs-3">Пользователи не найдены</span>
                        )}
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}
