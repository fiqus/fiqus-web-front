import React from 'react';
import {styles} from '../../content/content.json'
import styled from 'styled-components'
import { useIntl } from "gatsby-plugin-react-intl"
import Lottie from 'lottie-react'
import homepageAnimation from '../../images/animations/homepage.json'

const iluHomepage = require('../../images/illustrations/homepage.svg');




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
    display: flex; 
    justify-content: center;
    padding: 48px 20px 50px 20px;
    background: ${styles.colors.purplePrimary};
    @media (min-width: ${styles.breakpoints.m}px) {
        padding: 75px 20px 80px 20px;
    }
    @media (min-width: ${styles.breakpoints.xl}px) {
        padding: 75px 0 80px 0px;
    }
`
const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1083px;
    @media (min-width: ${styles.breakpoints.m}px) {
        flex-direction: row;        
        align-items: center;
        justify-content: space-between;        
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
        align-items: flex-start;
        max-width: 560px;
        margin: 0;
        margin-right: auto;
    }
`
const ImageContainer = styled.div`
    display: none;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 350px;
        margin-left: auto;
        text-align: right;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 411px;
    }
`
const SectionHeaderDescription = styled.p`
    font-size: 1.44em;
    font-weight: ${styles.fontWeight.regular};    
    line-height: 34px;
    text-align: center;
    color: ${styles.colors.white};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2em;
        line-height: 42px;
        text-align: left;
        min-width: 402px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 2.38em;
        line-height: 49px;
        text-align: left;
    }
`
const SectionHeaderUnderlineSpan = styled.span`
    font-size: 1.44rem;
    position: relative;
    &::before {
        content: url("${require('../../images/orange_underline.svg').default}");
        position: absolute; 
        left: 3px;
        bottom: -9px;
    }
    @media (max-width: ${styles.breakpoints.xs}px) {
        border-bottom: 2px solid ${styles.colors.orangeMain};
        &::before {
            content: none;
        }
    }
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2rem;
        &::before {
            content: url("${require('../../images/orange_underline_desktop.svg').default}");
            left: unset;
            right: 0px;
            bottom: -11px;
            max-width: 100%;
            overflow: hidden;
        }
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 2.38rem;
        &::before {
            left: unset;
            right: -1px;
            bottom: -11px;
            max-width: unset;
            overflow: visible;
        }
    }
`
const SectionHeaderSpan = styled.span`
    font-weight: ${styles.fontWeight.bold};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2rem;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 2.38rem;
    }
`
const SectionHeaderImg = styled.div`

    width: 100%;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 320px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 411px;
    }
`
const SectionHeaderImgMobile = styled.img`
    width: 100%;
    max-width: 249px;
    margin-bottom: 25px;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
    }
`

const HomepageHeader = (props) => {
    const intl = useIntl();

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <InfoContainer>
                    <SectionHeaderImgMobile
                        src={iluHomepage.default}
                        alt={intl.formatMessage({id: "homepage.imageAltMobile"})}
                    />
                    <SectionHeaderDescription>
                        {intl.formatMessage({id: "homepage.leadLine1"})}
                        <SectionHeaderUnderlineSpan>{intl.formatMessage({id: "homepage.leadUnderlined"})}</SectionHeaderUnderlineSpan>
                        {intl.formatMessage({id: "homepage.leadLine2"})}
                        <SectionHeaderSpan>{intl.formatMessage({id: "homepage.leadBold"})}</SectionHeaderSpan>
                        {intl.formatMessage({id: "homepage.leadLine3"})}
                    </SectionHeaderDescription>

                </InfoContainer>
                <ImageContainer>
                    <SectionHeaderImg> 
                        <Lottie
                            animationData={homepageAnimation}
                            loop={false}
                            autoPlay
                            style={{width: '100%'}}
                        />
                    </SectionHeaderImg>
                </ImageContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default HomepageHeader;