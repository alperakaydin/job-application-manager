// jop apply component 
// inputs name, email, phone, coverLetter, resume, photo
// submit button
// check if all inputs are filled
// send data to api
// if success redirect to job detail page
// if error show error message
// write component
import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography, Grid, Paper, Container } from '@mui/material';

function JobApply() {
    const {jobId} = useParams(); // URL'den jobId parametresini alır
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        // Örneğin, resume için dosyayı state'e kaydet
        console.log(typeof event.target.files[0])
        setResume(event.target.files[0]);
    };
    const handlePhotoChange = (event) => {
        // Örneğin, photo için dosyayı state'e kaydet
        console.log(typeof event.target.files[0])
        setPhoto(event.target.files[0]);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('coverLetter', coverLetter);
        if (resume) formData.append('resume', resume);
        if (photo) formData.append('photo', photo);

        axios.post(`http://localhost:8080/api/candidate/${jobId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {

                console.log(response);
                setLoading(false);
                // redirect to job detail page
                window.location.href = `/job/${jobId}`;
                alert('Job application was successful');
                console.log(formData);
            })
            .catch(error => {
                // Hata yönetimi
                setError(true);
                setLoading(false);
                console.log('There was an error applying to the job', error);
            });
    }


    // function handleFileChange(event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = function () {
    //             setResume(reader.result.split(',')[1]); // base64 encoded string olarak alır
    //         };
    //     }
    // }
    // function handlePhotoChange(event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = function () {
    //             setPhoto(reader.result.split(',')[1]); // base64 encoded string olarak alır
    //         };
    //     }
    // }

    if (error) {
        return <div>There was an error applying to the job</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container component="main" maxWidth="sm">
                <Paper style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Apply to Job
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    required

                                    fullWidth
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    required
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    fullWidth
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Cover Letter"
                                    name="coverLetter"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={coverLetter}
                                    onChange={event => setCoverLetter(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Resume
                                    <input
                                        type="file"
                                        hidden
                                        name="resume"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Photo
                                    <input
                                        type="file"
                                        hidden
                                        name="photo"
                                        onChange={handlePhotoChange}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>);
    }
}

export default JobApply;
