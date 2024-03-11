import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";

const KeyBackRequest = ({props}) => {

    const token = localStorage.token

    const { requestId, keyOwnerFullName, keyOwnerEmail, keyRecipientFullName, keyRecipientEmail, classroomNumber, endOfRequest, status } = props;

    const [statusType, setStatusType] = useState("");

    useEffect(() => {

            setStatusType("Ожидает подтверждения");

    }, [status]);

    async function acceptRequestAPI() {
        const response = await fetch(`http://89.111.174.112:8181/key/accept/request/${requestId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async function confirmRequestAPI() {
        const response = await fetch(`http://89.111.174.112:8181/key/confirm/getting/${requestId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    function confirmRequest() {
        acceptRequestAPI();
        confirmRequestAPI();
        setStatusType("Approved")
    }

    if (statusType === "Ожидает подтверждения") {
        return (
            <Card bg="secondary-subtle" className="mt-3">
                <Card.Header as="h5">Возврат ключа №{classroomNumber}</Card.Header>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={9}>
                            <Card.Text>
                                <b>От пользователя</b>: {keyOwnerFullName} <br/>
                                <b>Email для связи</b>: {keyOwnerEmail} <br/>
                                <b>Статус</b>: {statusType}
                            </Card.Text>
                        </Col>

                        <Col md={3}>
                            <Button onClick={confirmRequest}>Подтвердить получение</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }

    return null; // Возвращаем null, если статус не "Ожидает подтверждения"
};

export default KeyBackRequest;
