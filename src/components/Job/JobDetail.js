import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import { Paper, Typography, Button, Grid, Avatar } from '@mui/material';

//create JobDetail component to display job details
function JobDetail() {
    const {jobId} = useParams(); // URL'den jobId parametresini alır
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API'den iş ilanının detaylarını al
        axios.get(`http://localhost:8080/api/job/${jobId}`)
            .then(response => {
                console.log(response);
                setJob(response);
                setLoading(false);
            })
            .catch(error => {
                // Hata yönetimi
                setError(true);
                setLoading(false);
                console.log('There was an error fetching the job details', error);
            });
    }, [jobId]);
    
    if (error) {
        return <div>There was an error fetching the job details</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else  {
        return ( <Paper style={{ padding: 20, marginTop: 30, marginBottom: 30 }}>
            <Typography variant="h4" gutterBottom>
                {job.data.title}
            </Typography>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                    {job.data.company.logo ? (
                        <Avatar alt={job.data.company.name} src={job.data.company.logo} style={{ width: 60, height: 60 }} />
                    ) : (
                        <Avatar style={{ backgroundColor: '#1976d2', width: 60, height: 60 }}>
                            {job.data.company.name.charAt(0)}
                        </Avatar>
                    )}
                    <Typography variant="h6">{job.data.company.name}</Typography>
                    <Typography variant="body2">{job.data.company.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><strong>Description:</strong> {job.data.description}</Typography>
                    <Typography variant="body1"><strong>Deadline:</strong> {new Date(job.data.deadline).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><strong>Requirements:</strong> {job.data.requirements || "Not specified"}</Typography>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={handleApply}
            >
                Apply
            </Button>
        </Paper>);
    }
    // write handleApply function
    function handleApply() {
        window.location.href = `/job/${jobId}/apply`;
        
    }

}
export default JobDetail;