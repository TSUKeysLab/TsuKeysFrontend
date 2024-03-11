import React from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";

const RequestFilter = ({searchParams, setSearchParams, setUpdated}) => {

    const updateStatus = (newValue) => {
        setSearchParams(prevState => ({ ...prevState, status: newValue }));
        setUpdated(true)
    };

    const updateSorting = (newValue) => {
        setSearchParams(prevState => ({ ...prevState, sorting: newValue }));
        setUpdated(true)
    };

    const updateTimeId = (newValue) => {
        console.log(newValue)
        setSearchParams(prevState => ({ ...prevState, timeId: newValue }));
        setUpdated(true)
    };

    const updateClassroomNumber= (newValue) => {
        setSearchParams(prevState => ({ ...prevState, classroomNumber: newValue }));
        setUpdated(true)
    };

    return (
        <div>
            <Card className="mt-3 mb-3">
                <Card.Header>Фильтры</Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-2">
                            <Col md={6}>
                                <Form.Select onChange={(event) => updateStatus(event.target.value)}>
                                    <option value="">Выберите статус</option>
                                    <option value="Pending">Обрабатывается</option>
                                    <option value="Rejected">Подтверждена</option>
                                    <option value="Approved">Отклонена</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Select onChange={(event) => updateSorting(event.target.value)}>
                                    <option value="">Сортировать</option>
                                    <option value="CreateDesc">Сначала новые</option>
                                    <option value="CreateAsc">Сначала старые</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={9}>
                                <Form.Control type="text" placeholder="Введите номер кабинета" onChange={event => {updateClassroomNumber(event.target.value)}}/>
                            </Col>
                            <Col md={3}>
                                <Form.Select onChange={(event) => updateTimeId(event.target.value)}>
                                    <option value="">Выберите номер пары</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </Form.Select>
                            </Col>

                        </Row>
                    </Form>
                </Card.Body>

            </Card>
        </div>
    );
};

export default RequestFilter;