import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const ShowAlert = ({ message, title }) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading style={{ color: "red", fontSize: "30px" }}>{title}</Alert.Heading>
                <p style={{ color: "red", fontSize: "20px" }}>
                    {message}
                </p>
            </Alert>

        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default ShowAlert;