import React, {useState} from 'react';
import {styles} from '../../content/content.json'
import styled from 'styled-components'
import { useIntl } from "gatsby-plugin-react-intl"
import Lottie from 'lottie-react'
import {Waypoint} from 'react-waypoint'
import cultureAnimation from '../../images/animations/cultura.json'

import Button from '../../components/common/Button'

const HomepageCultureContainer = styled.div`
    position: relative;
    background: ${styles.colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 0px 20px 35px 20px;
    margin-bottom: 0px;
    background: ${styles.colors.purplePrimary};
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 0px;
        padding-bottom: 90px;
    }
`
const HomepageCultureWrapper = styled.div`
    max-width: 946px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (min-width: ${styles.breakpoints.m}px) {
        text-align: left;
        max-width: 959px;
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
        align-items: flex-start;
        flex-basis: 100%;
        max-width: 657px;
        margin-left: auto;
        margin-right:0;
        margin-top: 10px;
        text-align: left;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        margin-top: -22px;
    }
`
const HomepageCultureTitle = styled.h2`
    font-size: 2.38em;
    line-height: 49px;
    font-weight: ${styles.fontWeight.bold};
    text-align: center;
    color: ${styles.colors.white};
    margin-bottom: 23px;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 3.33em;
        line-height: 64px;
        text-align: left;
        margin-bottom: 18px;
    }
`
const HomepageCultureDescription = styled.p`
    font-size: 1em;
    line-height: 26px;
    font-weight: ${styles.fontWeight.regular};
    color: ${styles.colors.white};
    margin-bottom: 40px;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 26px;
        font-size: 1.44em;
        line-height: 34px;
    }
`
const DescriptionUnderline = styled.span`
    @media (min-width: ${styles.breakpoints.m}px) {
        position: relative;
        &::before {
            position: absolute; 
            content: url("${require('../../images/orange_underline_culture.svg').default}");
            left: 3px;
            bottom: -12.5px;
        }
    }
`
const ImageContainer = styled.div`
    margin: -105px auto 8px auto;
    max-width: 314px;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 400px;
        flex-basis: 100%;
        margin: unset;
        margin-top: -220px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 548px;
    }
    
`
const HomepageCultureBird = styled.img`
    display: none;
    @media (min-width: ${styles.breakpoints.m}px) {
        position: absolute;
        display: block;
        top: -52px;
        right: 50px;
        width: 47.45px;
    }
`
const HomepageCultureImg = styled.div`
    width: 100%;
`
const Btn = styled(Button)`
  margin: 0px auto 15px auto;
  @media (min-width: ${styles.breakpoints.m}px) {
    margin: 0px auto 0 0;
  }
`

const HomepageCulture = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)
    const intl = useIntl();


    return (
        <HomepageCultureContainer>
            <HomepageCultureBird
                src={require('../../images/illustrations/bird.svg').default}
                alt={intl.formatMessage({id: "homepageCulture.birdImageAlt"})}
            />
            <HomepageCultureWrapper>
                <ImageContainer>
                    <HomepageCultureImg>
                        <Waypoint onEnter={()=>setRenderLottie(true)}/>
                        { renderLottie && <Lottie
                            animationData={cultureAnimation}
                            loop={false}
                            autoPlay
                            style={{width: '100%'}}
                        /> 
                        }
                    </HomepageCultureImg>
                </ImageContainer>
                <InfoContainer>
                    <HomepageCultureTitle>{intl.formatMessage({id: "homepageCulture.title"})}</HomepageCultureTitle>
                    <HomepageCultureDescription>
                        {intl.formatMessage({id: "homepageCulture.descriptionLine1"})}
                        <DescriptionUnderline>{intl.formatMessage({id: "homepageCulture.underlinedText"})}</DescriptionUnderline>
                        {intl.formatMessage({id: "homepageCulture.descriptionLine2"})}
                    </HomepageCultureDescription>
                    <Btn 
                      type='btnPrimaryWhite' 
                      theme={styles} 
                      href="cultura"
                      isLink
                      btnText={intl.formatMessage({id: "homepageCulture.btnText"})}
                    />
                </InfoContainer>
            </HomepageCultureWrapper>
        </HomepageCultureContainer>
    );
};

export default HomepageCulture;