import React, { useState } from 'react';
import axios from 'axios';
import { TextField, TextareaAutosize, Button } from '@mui/material';

function JobAdd() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [requirements, setRequirements] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('companyName', companyName);
        formData.append('requirements', requirements);
        formData.append('deadline', deadline);

        try {
            const response = await axios.post('http://localhost:8080/api/job', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // İşlemin başarılı olduğunu belirten bir mesaj veya eylem ekleyebilirsiniz
            alert('Job posted successfully');
            window.location.href = `/job`;
            console.log('Job posted successfully:', response.data);
        } catch (error) {
            // Hata işleme
            console.error('Error posting job:', error);
        }
    };

    return (<form onSubmit={handleSubmit} style={{
        display: 'flex', marginTop: 60, flexDirection: 'column', gap: '1rem' }}>
            <TextField
                label="Title"
                required
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <TextareaAutosize
                minRows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: '1rem' }}
            />
            <TextField
                label="Company"
                variant="outlined"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
                required
            />
            <TextareaAutosize
                minRows={3}
                placeholder="Requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                style={{ padding: '1rem' }}
            />
            <TextField
                label="Deadline"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Post Job
            </Button>
        </form>
    );
}

export default JobAdd;
