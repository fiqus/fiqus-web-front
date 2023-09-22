import React from "react"
import styled from 'styled-components'
import {styles} from '../content/content.json'


const Showcase = ({path}) => {
  // This should not load (hack applied to PageWrapper)
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
      <div></div>
  );
}

export default Showcase;