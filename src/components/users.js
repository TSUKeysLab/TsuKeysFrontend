import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap';
import UserCard from '../components/userCard';
import { UsersFeedFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
    const baseUrl = 'http://89.111.174.112:8181/GetUserInformation?';
    const [fullname, setFullName] = useState('');
    const [users, setUsers] = useState([]);
    const [role,setRole]=useState('')
    const [flag, setFlag]=useState(true)
    // const navigate=useNavigate

    useEffect(() => {
        fetchData();
    }, [fullname,role]);

    const fetchData = async () => {
        let url = baseUrl;
        if (fullname !== '') {
            url += 'fullname=' + fullname + '&';
        }
        if (role !== '') {
            url += 'role=' + role + '&';
        }
        url += 'size=100&page=1';



        const data = await UsersFeedFetch(url, localStorage.getItem('token'));
        
        if(!data.users){
            setFlag(false)
        }
        else{
            setFlag(true)
        }
        setUsers(data.users);
    
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <Container className="" style={{marginTop: '110px'}}>
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
                        <FormSelect value={role} onChange={handleRoleChange}>
                            <option value=''>--</option>
                            <option value="Administrator">Администратор</option>
                            <option value="Teacher">Преподаватель</option>
                            <option value="Dean">Деканат</option>
                            <option value="DeanTeacher">Преподаватель-Деканат</option>
                            <option value="Student">Студент</option>
                            <option value="User">Неопределенные пользователи</option>
                        </FormSelect>
                    </FormGroup>
                </CardBody>
            </Card>
            <Card className="mt-3">
                <CardBody className="text-center">
                    <div className="me-3 ms-3">
                        {flag===true  ? (
                            users.map(user => (
                                <UserCard
                                    key={user.userId}
                                    id={user.userId}
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
