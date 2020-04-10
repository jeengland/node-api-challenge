import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import Project from './Project';

const ProjectsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    background-color: grey;
    padding: 1%;
    h1 {
        text-align: center;
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
                    <Project project={project}/>
                )
            })}
        </ProjectsContainer>
    )
}

export default Projects;