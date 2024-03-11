import React, {useState} from 'react';
import {Nav} from "react-bootstrap";
import KeysPage from "./keysPage";
import DeanRequests from "./deanRequests";

const KeyContent = () => {

    const [activeTab, setActiveTab] = useState('keys');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

    return (
        <div>
            <Nav justify variant="tabs" activeKey={activeTab} onSelect={handleSelect} style={{ backgroundColor: '#f0f0f0' }}>
                <Nav.Item>
                    <Nav.Link eventKey="keys">Ключи</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="requests">Заявки на возврат</Nav.Link>
                </Nav.Item>
            </Nav>
            <div>
                {activeTab === 'keys' && <KeysPage/>} {KeysPage}
                {activeTab === 'requests' && <DeanRequests/>} {DeanRequests}

            </div>
        </div>
    );
};

export default KeyContent;