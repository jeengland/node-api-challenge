import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { useHistory, useParams} from 'react-router-dom';

const DetailsContainer = styled.section`
    max-width: 800px;
    margin: 0 auto;
    background-color: green;
    padding: 1%;
    min-height: 100vh;
    .project {
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
    }
`

const Details = () => {
    const [data, setData] = useState({});
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/projects/${id}`)
            .then((response) => setData(response.data.project))
            .catch((error) => console.error(error))
    }, [id])
    console.log(id);
    return (
        <DetailsContainer>
            <div className='project'>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <div className='actions'>
                    <h3>Actions</h3>
                    {data.actions && data.actions.map((action) => {
                        return (
                            <div>
                                <h4>{action.description}</h4>
                                <p>{action.notes}</p>
                            </div>
                        )
                    })}
                </div>
                <button type='button' onClick={() => history.push('/')}>Back</button>
            </div>
        </DetailsContainer>
    )
}

export default Details;