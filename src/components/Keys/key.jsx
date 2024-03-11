import React, {useState} from 'react';
import {Button, Card, CloseButton, Col} from "react-bootstrap";
import deanImage from './kd.png';
import ownerImage from './ko.png';

const Key = (props) => {

    const token = localStorage.token;

    const {owner, classroomNumber} = props;

    const [isClosed, setIsClosed] = useState(false);

    async function DeleteKeyAPI(){

        const response = await fetch(`http://89.111.174.112:8181/key/delete/${classroomNumber}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    }

    function deleteKey() {
        DeleteKeyAPI();
        setIsClosed(true)
    }


    if (!isClosed) {
        return (

                <Card>
                    <CloseButton className="position-absolute top-0 end-0 m-2" onClick={deleteKey} disabled={owner !== "Dean"}/>
                    <Card.Img
                        variant="top"
                        src={owner === "Dean" ? deanImage : ownerImage}
                        alt="Card image"
                        className="mx-auto d-block mt-2" // Этот класс выравнивает изображение по центру
                        style={{width: '100px', height: '100px'}}
                    />
                    <Card.Body>
                        <Card.Title className="text-center"><b>№{classroomNumber}</b></Card.Title>
                        <Card.Text className="text-center">
                            {owner === "Dean" ? "Ключ в деканате" : `Ключ находится у ${owner}`}
                        </Card.Text>
                    </Card.Body>
                </Card>
        );
    }
};

export default Key;