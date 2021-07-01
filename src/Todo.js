import { useState } from "react";

import { v4 } from 'uuid';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import "./Todo.css";

export const Todo = () => {
    const [newTodo, setNewTodo] = useState('');
    const [editingTodoId, setEditingTodoId] = useState('');
    const [todos, setTodos] = useState([
        {
            text: 'some',
            id: v4()
        },
        {
            text: 'some some',
            id: v4()
        },
        {
            text: 'another todo',
            id: v4()
        }
    ]);

    const handleChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedTodos = [];
        if (editingTodoId) {
            updatedTodos = todos.map(todo => {
                if (todo.id === editingTodoId) {
                    return { ...todo, text: newTodo }
                }
                return todo;
            });
            setEditingTodoId('');
        } else {
            const todo = {
                text: newTodo,
                id: v4()
            }
            updatedTodos = [...todos, todo];
        }
        setNewTodo('');
        setTodos(updatedTodos);

    }

    const handleEdit = (id) => {
        const foundTodo = todos.find(todo => todo.id === id);
        setNewTodo(foundTodo.text);
        setEditingTodoId(id);
    }

    const handleCancelEdit = () => {
        setNewTodo('');
        setEditingTodoId('');
    }

    const handleDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmationResult = confirm('Are you sure to delete this todo');
        if (confirmationResult) {
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
        }
    }

    return (
        <>
            <h1>To do app</h1>
            <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Form.Control type="text" placeholder="enter a todo" className="custom-input" onChange={handleChange} value={newTodo} />
                    <Button type="submit" style={{ flex: 1, whiteSpace: 'nowrap', marginLeft: '16px' }} disabled={!newTodo}>
                        {editingTodoId ? "Save" : "Add todo"}
                    </Button>
                    {editingTodoId && (
                        <Button variant="secondary" style={{ flex: 1, whiteSpace: 'nowrap', marginLeft: '16px' }} onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                    )}
                </form>
            </div>
            <div style={{ marginTop: '16px' }}>
                <ListGroup>
                    {todos.map((todo, index) => {
                        return (
                            <ListGroupItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {todo.text}
                                <div>
                                    <Button variant="warning" style={{ marginRight: '16px' }} onClick={() => {
                                        handleEdit(todo.id)
                                    }}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
                                </div>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        </>
    )
}