import { Counter } from './Counter';
import { Todo } from './Todo';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

function App() {
    return (
        <Container>
            <Row>
                <Col xl={6}>
                    <Counter />
                </Col>
                <Col xl={6}>
                    <Todo />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
