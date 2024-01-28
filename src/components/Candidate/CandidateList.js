// create CandidateList component to display candidate list
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';


function CandidateList() {
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API'den iş ilanının detaylarını al
        axios.get(`http://localhost:8080/api/candidate`)
            .then(response => {
                console.log(response);
                setCandidates(response.data);
                setLoading(false);
            })
            .catch(error => {
                // Hata yönetimi
                setError(true);
                setLoading(false);
                console.log('There was an error fetching the candidate list', error);
            });
    }, []);

    if (error) {
        return <div>There was an error fetching the candidate list</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (<Paper style={{ padding: 20, marginTop: 30, marginBottom: 30 }}>
            <Typography variant="h4" gutterBottom>Candidate List</Typography>
            <Grid container spacing={3}>
                {candidates.map((candidate) => (
                    <Grid item xs={12} md={6} lg={4} key={candidate.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                {...(candidate.photo ? { src: `data:image/jpeg;base64,${candidate.photo}` } : { src: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg' })}

                                alt={`${candidate.name}'s photo`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {candidate.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {candidate.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {candidate.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {candidate.coverLetter}
                                </Typography>
                                <Button
                                    size="small"
                                    href={`data:application/pdf;base64,${candidate.resume}`}
                                    download={`${candidate.name}_Resume.pdf`}
                                >
                                    Download Resume
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>);
    }
}
export default CandidateList;