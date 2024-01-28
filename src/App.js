import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router, Routes, // v6'da Switch yerine Routes kullanılıyor
    Route, Link, useParams
} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Paper, Box, Grid} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

import './App.css';
import Job from "./components/Job/Job";
import JobDetail from "./components/Job/JobDetail";
import JobApply from "./components/Job/JobApply";
import Register from "./components/Company/Register";
import Login from "./components/Company/Login";
import JobAdd from "./components/Company/JobAdd";
import CandidateList from "./components/Candidate/CandidateList";
import {AuthProvider, useAuth} from "./components/Company/AuthContext";

function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1565c0', // Mavi ton
            }, secondary: {
                main: '#03a9f4', // Açık mavi
            }, error: {
                main: '#f44336',
            }, background: {
                default: '#f4f5fd',
            }, text: {
                primary: '#333996', secondary: '#767676',
            },
        }, typography: {
            fontFamily: ['"Open Sans"', 'sans-serif'].join(','), h1: {
                fontWeight: 700, fontSize: '2.5rem',
            }, h2: {
                fontWeight: 700, fontSize: '2rem',
            }, h3: {
                fontWeight: 700, fontSize: '1.75rem',
            }, h4: {
                fontWeight: 700, fontSize: '1.5rem',
            }, h5: {
                fontWeight: 700, fontSize: '1.25rem',
            }, h6: {
                fontWeight: 700, fontSize: '1rem',
            }, subtitle1: {
                fontSize: '1rem', fontWeight: 500,
            }, subtitle2: {
                fontSize: '0.875rem', fontWeight: 400,
            }, body1: {
                fontSize: '1rem',
            }, body2: {
                fontSize: '0.875rem',
            }, button: {
                textTransform: 'none',
            },
        }, overrides: {
            MuiAppBar: {
                root: {
                    transform: 'translateZ(0)',
                },
            }, // Diğer özelleştirmeler
        }, props: {
            MuiButton: {
                disableRipple: true,
            }, // Diğer varsayılan özellikler
        },
    });
    return (<ThemeProvider theme={theme}>
        <AuthProvider>
            <CssBaseline/>
            <MyComponent/>

        </AuthProvider>
    </ThemeProvider>);
}



function MyComponent() {
    const {currentUser, logout} = useAuth(); // useAuth burada çağrılmalı

    return (<Router>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Job Application Manager
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>

                <Button color="inherit" component={Link} to="/job">Jobs</Button>
                {currentUser ? (<>
                        <Button color="inherit" component={Link} to="/jobAdd">Post New Job !</Button>
                        <Button color="inherit" component={Link} to="/candidateList">Candidate List</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>

                    </>

                    // Oturum açılmışsa, Logout butonunu göster

                ) : (// Oturum açılmamışsa, Login ve Register butonlarını göster
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>)}

            </Toolbar>
        </AppBar>
        <Container>
            <Routes>
                <Route path="/job/:jobId" element={<JobDetail/>}/>
                <Route path="/job" element={<Job/>}/>
                <Route path="/jobAdd" element={<JobAdd/>}/>
                <Route path="job/:jobId/apply" element={<JobApply/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/candidateList" element={<CandidateList/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Container>
    </Router>);
}


function Home() {
    return (<Container>
        <Paper elevation={3} style={{padding: '20px', marginTop: '20px'}}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Job Application Manager
            </Typography>
            <Typography variant="body1" paragraph>
                Discover your next opportunity and the people who can help you get there. Our job application
                manager simplifies the process of finding and applying for new positions. Whether you're looking to
                advance in your current field or embark on a new career path, we're here to support you every step
                of the way.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        src="https://blog.hubspot.com/hs-fs/hubfs/62_Update%20on%20a%20Job%20Application.png?width=595&height=400&name=62_Update%20on%20a%20Job%20Application.png"
                        alt="Job Search" style={{width: '100%', height: 'auto'}}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Utilize a range of tools to make your job search more efficient and effective. From creating
                        alerts for specific roles to accessing personalized job recommendations, your next career
                        move is just a few clicks away. Join our community to connect with professionals and
                        industry leaders who can provide insights and guidance as you navigate your career journey.
                    </Typography>
                </Grid>
            </Grid>
        </Paper>

        <Box textAlign="center" marginTop="40px">
            <Typography variant="h6">Follow us on social media</Typography>
            <Box display="flex" justifyContent="center" marginTop="10px">
                <a href="https://www.facebook.com/YourFacebookPage" target="_blank" rel="noopener noreferrer"
                   style={{marginRight: '10px'}}>
                    <FacebookIcon fontSize="large"/>
                </a>
                <a href="https://www.twitter.com/YourTwitterHandle" target="_blank" rel="noopener noreferrer"
                   style={{marginRight: '10px'}}>
                    <TwitterIcon fontSize="large"/>
                </a>
                <a href="https://www.linkedin.com/YourLinkedInProfile" target="_blank" rel="noopener noreferrer"
                   style={{marginRight: '10px'}}>
                    <LinkedInIcon fontSize="large"/>
                </a>
                <a href="https://www.instagram.com/YourInstagram" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon fontSize="large"/>
                </a>
            </Box>
        </Box>
    </Container>);
}

export default App;
