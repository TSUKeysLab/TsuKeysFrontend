import React from 'react';
import {Card, Container} from 'react-bootstrap';

const RequestCard = (props) => {
    const {id, dateOfBooking, startTime, endTime, status, ownerRole, classroomNumber } = props;

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

    const fullname = "Русик, добавь в апишку имя"

    let backgroundType = '';
    switch (status) {
        case 'Pending':
            backgroundType = 'secondary-subtle';
            break;
        case 'Approved':
            backgroundType = 'success-subtle';
            break;
        case 'Rejected':
            backgroundType = 'danger-subtle';
            break;
    }


    return (
        <div>
            <Container className="mt-2">
                <Card bg={backgroundType}>
                    <Card.Body>
                        <Card.Title>Заявка на бронирование кабинета №{classroomNumber}</Card.Title>
                        <Card.Text>
                            <p className="mb-1">Дата бронирования: {dateOfBooking}</p>
                            <p className="mb-1">Время бронирования: {startTime} - {endTime}</p>
                            <p className="mb-1">Автор: {roleType} {fullname}</p>
                            <p className="mb-1">Статус: {status}</p>

                        </Card.Text>

                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default RequestCard;