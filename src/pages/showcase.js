import React from "react"
import styled from 'styled-components'
import {styles} from '../content/content.json'


const Showcase = ({path}) => {
  let cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;

  const pdfUrl = "/showcase.pdf"; 
  if (typeof window !== `undefined`) {
    // redirect if is window is available (client)
    window.location.href = window.location.href.replace(cleanPath, pdfUrl)
  }

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