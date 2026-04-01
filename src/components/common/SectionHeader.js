import React, {useState} from 'react';
import {styles} from '../../content/content.json'
import styled from 'styled-components'

import {Waypoint} from 'react-waypoint'
import Lottie from 'lottie-react'

import cultureAnimation from '../../images/animations/cultura.json'
import labsAnimation from '../../images/animations/labs.json'

const iluLabs = require('../../images/illustrations/labs.svg');
const iluCultura = require('../../images/illustrations/cultura.svg');




const setSharedStyles = (type) => {
    return `
        font-size: ${type.fontSize};
        font-weight: ${type.fontWeight};
        color: ${type.color };
        background-color: ${type.background};
        border-color: ${type.borderColor};
        box-shadow:  0px 4px 0px ${type.boxShadow};
    `
} 
const HeaderContainer = styled.div`
    background: ${styles.colors.greenLight};
    padding-bottom: 80px;
    display: flex; 
    justify-content: center;
    padding: 40px 20px 50px 20px;
    margin-bottom: 0px;
    background: ${props => props.type.background};
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 55px;
        padding-bottom: 79px;
        ${props => {
            if (props.section === 'cultura') {
                return  `max-width: 429px;
                margin-right: 17px;
                padding-bottom: 45px;`
            }
        }}
    }
`
const HeaderWrapper = styled.div`
    max-width: 946px;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media (min-width: ${styles.breakpoints.m}px) {
        flex-direction: row;
        justify-content: center;        
    }

`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
    margin: auto;
    @media (min-width: ${styles.breakpoints.m}px) {
        flex-basis: 50%;
        max-width: 463px;
        align-items: flex-start;
        margin: 0;
        margin-right: auto;
    }
`
const ImageContainer = styled.div`
    display: none;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 463px;
        text-align: right;
        ${props => {
            if (props.section === 'cultura') {
                return  `max-width: 429px;
                margin-right: 17px;`
            }
        }}
        ${props => {
            if (props.section === 'labs') {
                return  `
                svg {
                    width: 100%!important;
                    height: auto!important;
                }
                `
            }
        }}
    }
    @media (min-width: ${styles.breakpoints.m}px) and (max-width: ${styles.breakpoints.l}px){
        ${props => {
            if (props.section === 'cultura') {
                return  `
                svg {
                    width: 100%!important;
                    height: auto!important;
                }
                `
            }
        }}
    }
    
`
const SectionHeaderSubtitle = styled.h2`
    font-size: 1.44em;
    font-weight: ${styles.fontWeight.medium};
    line-height: 34px;
    color: ${props => props.type.color};
    margin-bottom: 25px;
    ${props => {
        if (props.section === 'cultura') {
            return  `font-weight: ${styles.fontWeight.regular};`
        }
    }}
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 35px;
        ${props => {
            if (props.section === 'cultura') {
                return  `margin-bottom: 25px;`
            }
        }}
    }
`
const SectionHeaderTitle = styled.h1`
    font-size: 2.38em;
    font-weight: ${styles.fontWeight.bold};
    text-align: center;
    color: ${props => props.type.color};
    margin-bottom: 25px;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 3em;
        text-align: left;
        margin-bottom: 30px;
        
    ${props => {
        if (props.section === 'cultura') {
            return  `margin-bottom: 8px;`
        }
    }}
    }
`
const SectionHeaderDescription = styled.p`
    font-size: 1em;
    line-height: 26px;
    font-weight: ${styles.fontWeight.regular};
    color: ${props => props.type.color};
    
`

const SectionHeaderImg = styled.img`
    margin-top: 83px;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 350px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 463px;
    }
    ${props => {
        if (props.section === 'cultura') {
            return  `margin-top: 0;
            @media (min-width: ${styles.breakpoints.m}px) {
                max-width: 350px;
            }
            @media (min-width: ${styles.breakpoints.l}px) {
                max-width: 429px;
            }
            `
        }
    }}
`
const SectionHeaderImgMobile = styled.img`
    width: 100%;
    max-width: 307px;
    margin-bottom: 27px;
    ${props => {
        if (props.section === 'cultura') {
            return  `max-width: 320px;`
        }
    }}
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
    }
    
`

const SectionHeader = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)

    const getSectionAnimation = (section) => {
        switch (section) {
          case "labs":
            return labsAnimation
            break
          case "cultura":
            return cultureAnimation
            break
        }
      } 
    
    const getHeadStyles = (type) =>{
        switch (type) {
            case "cultura" : 
                return {
                    background : styles.colors.purpleLight,
                    color : styles.colors.purplePrimary,
                    image: iluCultura,
                 }
            break
            case "labs" : 
                return {
                    background : styles.colors.greenLight,
                    color : styles.colors.darkMainBg,
                    image : iluLabs
                 }
            break
            default : 
                return {
                    background : styles.colors.greenLight,
                    color : styles.colors.darkMainBg,
                    image : iluLabs
                }
        }   
    }

    return (
        <HeaderContainer type={getHeadStyles(props.section)}>
            <HeaderWrapper>
                <InfoContainer>
                    <SectionHeaderTitle type={getHeadStyles(props.section)}>{props.title}</SectionHeaderTitle>
                    <SectionHeaderImgMobile src={getHeadStyles(props.section).image.default}></SectionHeaderImgMobile>
                    <SectionHeaderSubtitle section={props.section} type={getHeadStyles(props.section)}>{props.subtitle}</SectionHeaderSubtitle>
                    <SectionHeaderDescription type={getHeadStyles(props.section)}> {props.description} </SectionHeaderDescription>
                </InfoContainer>
                <ImageContainer section={props.section}>
                    <Waypoint onEnter={()=>setRenderLottie(true)}/>
                    { renderLottie && <Lottie
                        animationData={getSectionAnimation(props.section)}
                        loop={false}
                        autoPlay
                        style={{width: '100%'}}
                    /> 
                    }
                </ImageContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default SectionHeader;