import React from 'react';
import styled from 'styled-components'
import Wrapper from '../components/common/PageWrapper'

const Culture = () => {

    const PageContent = () => {
        return (
            <h1>Culture</h1>
        )
    }

    return (
        <Wrapper children={PageContent} background="green"></Wrapper>
    );
};

export default Culture;