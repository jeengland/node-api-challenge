import React from 'react';
import styled from '@emotion/styled';

const ProjectContainer = styled.section`
    width: 85%;
    margin: 2% auto;
    padding: 2%;
    border: 1px solid black;
    border-radius: 5px;
    background-color: papayawhip;
    h2 {
        color: black;
    }
    p {
        color: black;
    }
    &:hover {
        background-color: yellow;
    }
`

const Project = ({ project }) => {
    return (
        <ProjectContainer>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </ProjectContainer>
    )
}

export default Project;