// write a login register component
import React, {useState} from 'react';
import axios from 'axios';
import { Paper, Typography, TextField, Button, Container } from '@mui/material';

function Register() {
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('name', companyName);
        formData.append('email', email);
        formData.append('password', password);
        axios.post(`http://localhost:8080/api/company`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }  } )
            .then(response => {
                console.log(response);
                setLoading(false);
                // redirect to job detail page
                window.location.href = `/login`;
                alert('Registration was successful');
                console.log(formData);
            })
            .catch(error => {
                // Hata yönetimi
                setError(true);
                setLoading(false);
                console.log('There was an error registering', error);
            });
    }
    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 30, marginBottom: 30 }}>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        id="email"
                        type="text"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={event => setCompanyName(event.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        id="password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 15 }}>
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
export default Register;
//