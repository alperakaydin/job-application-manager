import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Paper, Typography, List, ListItem, ListItemText, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
function Job() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [jobListings, setJobListings] = useState([]);

    // write useEffect for joblistings
    useEffect(() => {
        // API'den iş ilanlarını al
        axios.get('http://localhost:8080/api/job')
            .then(response => {
                console.log(response);
                setJobListings(response.data);
                setLoading(false);

            })
            .catch(error => {
                // Hata yönetimi
                setError(true);
                setLoading(false);
                console.log('There was an error fetching the job listings', error);
            });
    }, []);


    if (error) {
        return <div>There was an error fetching the job details</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (<Paper style={{ padding: 20, marginTop: 30, marginBottom: 30 }}>
            <Typography variant="h5" gutterBottom>
                Job Listings
            </Typography>
            <List>
                {jobListings.map(job => (
                    <ListItem key={job.id} button component={Link} to={`/job/${job.id}`}>
                        <ListItemText
                            primary={job.title}
                            secondary={`at ${job.company.name}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>);
    }

}

export default Job;