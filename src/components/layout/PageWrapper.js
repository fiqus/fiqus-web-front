import React, {useState, useEffect} from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { styles } from '../../content/content.json'
import Seo from '../common/Seo'


require('../../styles/styles.css')

const Wrapper = styled.div`
    position: relative;
    margin:0;
    padding:0;
    width:100%;
    min-height:100%;
    background: ${styles.colors.white};      
`
const PageContainer = styled.section `
    width:100%;
    margin: 0 auto;
    padding-top: 62px;
    @media (min-width: ${styles.breakpoints.xl}px) {
        padding-top: 76px;
    }
`
const PageWrapper = (props) => {
    const [ishomepage, setIsHomepage] = useState("true")

    // hay que cambiar los homepaths cuando se deploye al server final
    const homePathsGHpages = ["/", "/es", "/en"]

    useEffect(()=>{

        if(homePathsGHpages.includes(props.location.pathname) === true){
            setIsHomepage("true")
        } else {
            setIsHomepage("false")
        }

    }, [props.location])

    // Hack to redirect /showcase to the showcase.pdf
    let path = props.location.pathname
    if (path.includes('/showcase')) {
        let cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;

        const pdfUrl = "/showcase.pdf"; 
        if (typeof window !== `undefined`) {
          // redirect if is window is available (client)
          window.location.href = window.location.href.replace(cleanPath, pdfUrl)
        }
        return (<div></div>)
    }

    return (
        <StaticQuery 
        query = { graphql`
            query MyQuery {
                site {
                    siteMetadata {
                        menuLinks{
                            name
                            link
                        }
                    }
                }
            }
        `
        }
        render = { data => (
                <Wrapper>
                    <Seo></Seo>
                    <Header menuLinks = {data.site.siteMetadata.menuLinks} location={props.location} ishomepage={ishomepage}></Header>
                    <PageContainer> {props.children}</PageContainer>
                    <Footer></Footer>
                </Wrapper>
        )}>
            
        </StaticQuery>
    );
};

export default PageWrapper;