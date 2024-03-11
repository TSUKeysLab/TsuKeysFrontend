import React from 'react';
import Key from "./key";
import {Col, Container, Row} from "react-bootstrap";

const KeysList = ({keys}) => {
    if (keys.length === 0) {
        return <h4 className="text-success text-center">Ничего не найдено</h4>;
    }

    return (
        <Container className="">
            <Row xs={1} sm={3} md={4} lg={6} className="g-2">
                {keys.map((keyy, index) => (
                        <Key owner={keyy.owner} classroomNumber={keyy.classroomNumber}/>
                ))}
            </Row>
        </Container>
    );
};

export default KeysList;