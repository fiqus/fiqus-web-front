import React, {useState} from 'react';
import {styles} from '../../content/content.json'
import styled from 'styled-components'
import { useIntl } from "gatsby-plugin-react-intl"
import Lottie from 'lottie-react'
import {Waypoint} from 'react-waypoint'
import labsAnimation from '../../images/animations/labs.json'

import Button from '../../components/common/Button'

const HomepageLabsContainer = styled.div`
    background: ${styles.colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 32px 20px 180px 20px;
    margin-bottom: 0px;
    //margin-top: 200px;
    background: ${styles.colors.white};
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 81px;
        padding-bottom: 255px;
    }
`
const HomepageLabsWrapper = styled.div`
    max-width: 946px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (min-width: ${styles.breakpoints.m}px) {
        flex-direction: row;
        justify-content: center;
        text-align: left;
        max-width: 1140px;
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
        max-width: 559px;
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
        max-width: 532px;
        text-align: right;
        margin-right: 15px;
    }
    
`
const HomepageLabsSubtitle = styled.h3`
    font-size: 1.72em;
    line-height: 37px;
    font-weight: ${styles.fontWeight.bold};
    color: ${styles.colors.greenMain};
    margin-bottom: 10px;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2.38em;
        line-height: 49px;
    }
`
const HomepageLabsTitle = styled.h2`
    font-size: 2.38em;
    line-height: 49px;
    font-weight: ${styles.fontWeight.bold};
    text-align: center;
    color: ${styles.colors.darkMainBg};
    margin-bottom: 35px;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 3.33em;
        line-height: 64px;
        text-align: left;
        margin-bottom: 33px;
    }
`
const HomepageLabsDescription = styled.p`
    font-size: 1em;
    line-height: 26px;
    font-weight: ${styles.fontWeight.regular};
    color: ${styles.colors.darkMainBg};
    margin-bottom: 40px;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 30px;
        font-size: 1.44em;
        line-height: 34px;
    }
`
const DescriptionBold = styled.span`
    font-weight: ${styles.fontWeight.bold};
`

const HomepageLabsImg = styled.div`
    margin-top: 98px;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 400px;
        width: 100%;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 532px;
    }
`
const HomepageLabsImgMobile = styled.img`
    width: 100%;
    max-width: 270px;
    margin-bottom: 40px;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
    }
    
`
const Btn = styled(Button)`
  margin: 0px auto 15px auto;
  @media (min-width: ${styles.breakpoints.m}px) {
    margin: 0px auto 0 0;
  }
`

const HomepageLabs = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)
    const intl = useIntl();

    return (
        <HomepageLabsContainer>
            <HomepageLabsWrapper>
                <InfoContainer>
                    <HomepageLabsTitle>{intl.formatMessage({id: "homepageLabs.title"})}</HomepageLabsTitle>
                    <HomepageLabsImgMobile
                        src={require('../../images/illustrations/' + intl.formatMessage({id: "homepageLabs.image"})).default}
                        alt={intl.formatMessage({id: "homepageLabs.imageAltMobile"})}
                    />
                    <HomepageLabsSubtitle>{intl.formatMessage({id: "homepageLabs.subtitle"})}</HomepageLabsSubtitle>
                    <HomepageLabsDescription>
                        {intl.formatMessage({id: "homepageLabs.descriptionLine1"})}
                        <DescriptionBold>{intl.formatMessage({id: "homepageLabs.descriptionBold1"})}</DescriptionBold>
                        {intl.formatMessage({id: "homepageLabs.descriptionComma"})}
                        {intl.formatMessage({id: "homepageLabs.descriptionLine2"})}
                        <DescriptionBold>{intl.formatMessage({id: "homepageLabs.descriptionBold2"})}</DescriptionBold>
                        {intl.formatMessage({id: "homepageLabs.descriptionComma"})}
                        <DescriptionBold>{intl.formatMessage({id: "homepageLabs.descriptionBold3"})}</DescriptionBold>
                        {intl.formatMessage({id: "homepageLabs.descriptionLine4"})}
                        <DescriptionBold>{intl.formatMessage({id: "homepageLabs.descriptionBold4"})}</DescriptionBold>
                        {intl.formatMessage({id: "homepageLabs.descriptionDot"})}
                    </HomepageLabsDescription>
                    <Btn 
                      type='btnPrimaryWhite' 
                      theme={styles} 
                      href="labs" 
                      isLink
                      btnText={intl.formatMessage({id: "homepageLabs.btnText"})}
                    />
                </InfoContainer>
                <ImageContainer>
                    <HomepageLabsImg> 
                        <Waypoint onEnter={()=>setRenderLottie(true)}/>
                        { renderLottie && <Lottie
                            animationData={labsAnimation}
                            loop={false}
                            autoPlay
                            style={{width: '100%'}}
                        /> 
                        }
                    </HomepageLabsImg>
                </ImageContainer>
            </HomepageLabsWrapper>
        </HomepageLabsContainer>
    );
};

export default HomepageLabs;