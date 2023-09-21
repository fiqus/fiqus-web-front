import React from "react"
import styled from 'styled-components'
import {styles} from '../content/content.json'


const Showcase = () => {
  const pdfUrl = "/showcase.pdf"; 

  const ShowcaseMainContainer = styled.div`
    padding-bottom: 151px;
    align-items: center; /* Center vertically */
    display: flex; /* Use flexbox */
    @media (min-width: ${styles.breakpoints.m}px) {
        justify-content: center; /* Center horizontally */
        padding-bottom: 167px;
    }
  `
  return (
      <ShowcaseMainContainer>
        <iframe src={pdfUrl} title="showcase" width="100%" height="600"></iframe>
      </ShowcaseMainContainer>
  );
}

export default Showcase;