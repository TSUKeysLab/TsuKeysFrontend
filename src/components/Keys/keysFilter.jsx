import React, {useState} from 'react';
import {Card, Col, Container, Form, Row} from "react-bootstrap";

const KeysFilter = ({searchParams, setSearchParams, setUpdated}) => {

    const updateOwned = (newValue) => {
        setSearchParams(prevState => ({ ...prevState, owned: newValue }));
        setUpdated(true)
    };

    const updateClassroomNumber= (newValue) => {
        setSearchParams(prevState => ({ ...prevState, classroomNumber: newValue }));
        setUpdated(true)
    };

    const handleChange = () => {
        updateOwned(!searchParams.owned);
    };
    return (
        <>
            <Card className="mb-3">
                <Card.Header>
                    Фильтры
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Поиск по номеру</Form.Label>
                                <Form.Control type="text" placeholder="Введите номер ключа" onChange={event => {updateClassroomNumber(event.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Row className="align-items-center justify-content-center">
                                    <Col xs="auto">
                                        <Form.Label>Все ключи</Form.Label>
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label=""
                                            checked={searchParams.owned}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Label>На руках</Form.Label>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Container>
                </Card.Body>
            </Card>
        </>
    );
};

export default KeysFilter;