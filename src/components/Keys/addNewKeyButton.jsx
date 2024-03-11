import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const AddNewKeyButton = ({ setUpdated }) => {
    const [show, setShow] = useState(false);
    const [keyValue, setKeyValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
        setShow(false);
        setKeyValue('');
    }
    const handleShow = () => setShow(true);

    const token = localStorage.token;

    async function createKeyAPI(keyNumber){

        const response = await fetch("http://89.111.174.112:8181/key/create", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "classroomNumber": keyNumber
            })
        });

        if (!response.ok) {
            const data = await response.json();
            setErrorMessage(data.Message);
        } else {
            setErrorMessage('');
        }
    }

    function checkFormat(keyNumber) {
        const regex = /^\d{1,4}[a-zA-Z]{0,2}$/;
        if (regex.test(keyNumber)) {
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
        }
    }

    function submitKey() {
        const create = async () => {
            await createKeyAPI(keyValue)
        }
        create();

        setKeyValue('');
        handleClose();
        setUpdated(true);
        setIsCorrect(false)
    }

    return (
        <>
            <Button variant="success" onClick={handleShow} className="mb-3 mt-3 col-lg-2 col-md-12 col-sm-12">
                Создать ключ
            </Button>

            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание ключа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Номер ключа</Form.Label>
                            <Form.Control type="text" placeholder="Введите номер ключа" value={keyValue}
                                          onChange={(e) => {
                                              setKeyValue(e.target.value)
                                              checkFormat(e.target.value)
                                          }
                            } />
                            <Form.Text>
                                Номер ключа должен содержать от 1 до 4 цифр.<br/>
                                При необходимости в конец можно добавить до 2 букв.
                            </Form.Text>

                            {errorMessage && errorMessage && <Form.Text>Насрали</Form.Text>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitKey} disabled={!isCorrect}>
                        Добавить ключ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddNewKeyButton;