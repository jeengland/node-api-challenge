import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import Project from './Project';
import { Link } from 'react-router-dom'

const ProjectsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    background-color: green;
    padding: 1%;
    min-height: 100vh;
    h1 {
        text-align: center;
    }
    a {
        text-decoration: none;
    }
`

const Projects = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/projects')
            .then((response) => setData(response.data.projects))
            .catch((error) => console.error(error)) 
    }, [])
    return (
        <ProjectsContainer>
            <h1>Projects</h1>
            {data.map((project) => {
                return (
                    <Link to={`/${project.id}/details`}>
                        <Project project={project}/>
                    </Link>
                )
            })}
        </ProjectsContainer>
    )
}

export default Projects;