/* eslint-disable react/no-danger */

import React from 'react';
import { Link } from 'gatsby' 
import Img from "gatsby-image"

import AnimatedIllustration from '../animated-illustration'

function FlexSections({ sectionData }) {

  return (
    <section className="home-flex-sections px-2 my-20 pb-20">
      <div className="flex flex-col md:flex-row lg:flex-col md:flex-wrap">
        {sectionData.map((val,key) => {

          console.log('hi')

          const sectionTitle=val.sectionTitle,
                sectionSubtitle = val.sectionSubtitle,
                sectionTitleLink=val.sectionTitleLink,
                sectionTextContent = val.sectionText,
                sectionImg = val.sectionImg.localFile.childImageSharp.fluid,
                sectionKey = val.sectionTitle.replace(/ /g,'')


          return (
            <div className={`flex-section section-${sectionKey}`}>
              {sectionTitle && <h3 className="heading-underline whitespace-no-wrap text-3xl sm:text-5xl font-bold mb-5">{sectionTitle}</h3>}
              <div className={`w-full lg:w-full mb-20 mr-0 md:mr-8 lg:mr-0 flex flex-col ${key % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} key={`homeflex-${key}`}>
                <div className={`img-wrap h-auto w-full md:w-full lg:w-2/5 mb-8 lg:mb-0 ${key % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                {val.illustrationOrImage === "Image" ? 
                      <Img fluid={sectionImg} 
                      objectFit="cover" 
                      objectPosition="50% 50%" 
                      alt={sectionTitle} 
                      className={`section-image rounded-md`}
                    />
                  :
                    <AnimatedIllustration 
                        height={val.animationHeight}
                        width={val.animationWidth}
                        isLooping={val.loopAnimation}
                        isAutoPlayOn={val.autoplay}
                        animationData={val.animationData}
                      />
                  }
                  
                </div>
                <div className="w-full lg:w-1/2 lg:flex-auto">
                  <h4 className="whitespace-no-wrap text-2xl sm:text-3xl font-bold mb-3">
                    {sectionTitleLink && sectionTitleLink.length > 0 ? <Link to={sectionTitleLink} className="text-black no-underline">{sectionSubtitle}</Link> : sectionSubtitle}
                  </h4>
                  <div className="text-content" dangerouslySetInnerHTML={{ __html: sectionTextContent }} /> 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FlexSections;
