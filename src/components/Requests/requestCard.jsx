import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';

const RequestCard = ({ id, dateOfBooking, fullname, startTime, endTime, status, ownerRole, classroomNumber, updated }) => {
    const [bgColor, setBgColor] = useState("");
    const [activeStatus, setActiveStatus] = useState(status);
    const [statusLabel, setStatusLabel] = useState("");

    let roleType = "";
    switch (ownerRole) {
        case 'User':
            roleType = 'Пользователь';
            break;
        case 'Teacher':
            roleType = 'Учитель';
            break;
        case 'DeanTeacher':
            roleType = 'Учитель-работник деканата';
            break;
        case 'Student':
            roleType = 'Студент';
            break;
    }

    useEffect(() => {
        switch (status) {
            case 'Pending':
                setBgColor('secondary-subtle');
                setStatusLabel('Обрабатывается');
                break;
            case 'Approved':
                setBgColor('success-subtle');
                setStatusLabel('Подтверждена');
                break;
            case 'Rejected':
                setBgColor('danger-subtle');
                setStatusLabel('Отклонена');
                break;
            default:
                setBgColor('');
                setStatusLabel('');
                break;
        }
    }, [updated]);

    const token = localStorage.token;

    async function rejectRequest() {
        const response = await fetch(`http://89.111.174.112:8181/request/reject?RequestId=${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    }
    async function approveRequest() {
        const response = await fetch(`http://89.111.174.112:8181/request/approve?RequestId=${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    }


    const handleRadioChange = (event) => {
        const selectedStatus = event.target.value;
        setActiveStatus(selectedStatus);
        switch (selectedStatus) {
            case 'Pending':
                setBgColor('secondary-subtle');
                setStatusLabel('Обрабатывается');
                break;
            case 'Approved':
                setBgColor('success-subtle');
                setStatusLabel('Подтверждена');
                break;
            case 'Rejected':
                setBgColor('danger-subtle');
                setStatusLabel('Отклонена');
                break;
            default:
                setBgColor('');
                setStatusLabel('');
                break;
        }
    };

    return (
        <div>
            <Container className="mt-2">
                <Card bg={bgColor}>
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col md={9}>
                                <Card.Title>Заявка на бронирование кабинета №{classroomNumber}</Card.Title>
                                <Card.Text>
                                    <p className="mb-1">Дата бронирования: {dateOfBooking}</p>
                                    <p className="mb-1">Время бронирования: {startTime} - {endTime}</p>
                                    <p className="mb-1">Автор: {roleType} {fullname}</p>
                                    <p className="mb-1">Статус: {statusLabel}</p>
                                </Card.Text>
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    disabled={!(activeStatus === "Pending")}
                                    value="Pending"
                                    label="Обрабатывается"
                                    name={id}
                                    type="radio"
                                    id={`inline-radio-1`}
                                    checked={activeStatus === "Pending"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    value="Approved"
                                    label="Подтверждена"
                                    name={id}
                                    type="radio"
                                    id={`inline-radio-2`}
                                    checked={activeStatus === "Approved"}
                                    onChange={(event) => {
                                        handleRadioChange(event);
                                        approveRequest();
                                    }}
                                />
                                <Form.Check
                                    value="Rejected"
                                    label="Отклонена"
                                    name={id}
                                    type="radio"
                                    id={`inline-radio-3`}
                                    checked={activeStatus === "Rejected"}
                                    onChange={(event) => {
                                        handleRadioChange(event);
                                        rejectRequest();
                                    }}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default RequestCard;
