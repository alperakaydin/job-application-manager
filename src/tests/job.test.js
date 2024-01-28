// Job.test.js
import React from 'react';
import axios from 'axios';
import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Job from '../components/Job/Job';

// axios ve useParams mockları
jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Gerçek fonksiyonları koru
    useParams: () => ({
        jobId: '1' // Örnek parametre
    })
}));

describe('Job Component', () => {
    test('loads and displays job listings', async () => {
        // Mock response
        const jobs = [{id: 1, title: 'Software Engineer', company: {name: 'Tech Co.'}}, // Diğer iş ilanları...
        ];
        axios.get.mockResolvedValue({data: jobs});

        render(<BrowserRouter>
            <Job/>
        </BrowserRouter>);

        // Beklenen çıktıları kontrol et
        await waitFor(() => {
            jobs.forEach((job) => {
                expect(screen.getByText(job.title)).toBeInTheDocument();
                expect(screen.getByText(`at ${job.company.name}`)).toBeInTheDocument();
            });
        });
    });

    test('displays an error message if the request fails', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        render(<BrowserRouter>
            <Job/>
        </BrowserRouter>);

        await waitFor(() => {
            expect(screen.getByText('There was an error fetching the job details')).toBeInTheDocument();
        });
    });
});
