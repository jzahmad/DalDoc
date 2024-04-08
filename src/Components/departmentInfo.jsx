import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import axios from "axios";
import DiscussionBoard from './DiscussionBoard';
import { useAuth } from "./context";
import { Button, TextField, Grid } from '@mui/material';
import Logout from './logout';

export default function DepartmentInfo() {
    const auth = useAuth();
    const { department } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [courses, setCourses] = useState([]);
    const [sendcourse, setSendCourse] = useState("");
    const [sendcode, setSendCode] = useState("");
    const url = "http://localhost:2000";

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.post(`${url}/courses`, { department: department });
                setCourses(response.data.map(course => course.code));
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [department]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    function goto(course) {
        navigate(`/${department}/${course}`);
    }

    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Course Code:', sendcode);
        console.log('Course Name:', sendcourse);
        setSendCourse("");
        setSendCode("");
    };

    return (
        <div style={styles.departmentInfoContainer}>
            <Logout />
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={styles.tabs}>
                <Tab label="Q&A" style={styles.tab} />
                <Tab label="Courses" style={styles.tab} />
            </Tabs>
            {value === 1 && (
                <div style={styles.coursesContainer}>
                    <h1>{department}</h1>
                    <h3>Number of courses: {courses.length}</h3>
                    <br />
                    <h1>All Courses</h1>
                    <input
                        className="search-input"
                        placeholder="Find your course"
                        value={searchInput}
                        onChange={handleInputChange}
                        style={styles.searchInput}
                    />
                    <Card className="card" style={styles.card}>
                        <CardContent>
                            {filteredCourses.map((course, index) => (
                                <Typography key={index} onClick={() => goto(course)} style={styles.courseItem}>
                                    {course}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                    <br />
                    <br />
                    <h3>Any Course Missing?</h3>
                    <form className="form" onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    className="form-input"
                                    name="department"
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Course name'
                                    style={{ backgroundColor: 'white' }} // Add background color style
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className="form-input"
                                    name="department"
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Course Code'
                                    style={{ backgroundColor: 'white' }} // Add background color style
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            )}
            {value === 0 && <DiscussionBoard />}
        </div>
    );
}

const styles = {
    departmentInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    logoutBtn: {
        marginBottom: '20px',
    },
    tabs: {
        width: '100%',
    },
    tab: {
        fontWeight: 'bold',
    },
    coursesContainer: {
        width: '100%',
        marginTop: '20px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    card: {
        width: '80%',
        marginTop: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    courseItem: {
        cursor: 'pointer',
        padding: '10px',
        margin: '5px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    form: {
        marginTop: '20px',
    },
    formInput: {
        marginBottom: '10px',
    },
    submitBtn: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};
