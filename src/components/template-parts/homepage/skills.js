import React from 'react';
import Img from "gatsby-image"


function Skills({ sectionContent, sectionTitle, sectionSubtitle }) {

  return (
    <section className="skills my-20 pb-20">
      <header>
        <h2 className="heading-underline whitespace-no-wrap text-3xl sm:text-5xl font-bold mb-5">{sectionTitle}</h2>
        <p className="mb-8 text-xl lg:text-2xl">{sectionSubtitle}</p>
      </header>
      <div className="skills-grid flex flex-wrap">
        {sectionContent.map((val,key) => {

          const icon = val.node.cpt_skills.skillIcon.localFile.childImageSharp.fixed,
                title = val.node.cpt_skills.name,
                textContent = val.node.cpt_skills.content;

          const skillsAddTopMargin = key => {
            switch(key) {
              case 0:
                return "mt-0 xl:mt-40";
              case 1:
                return "mt-0 xl:mt-20";
              case 2: 
                return "mt-0";
              case 3:
                return "mt-0 xl:mt-4";
              case 4:
                return "-mt-custom-19";
              case 5:
                return "-mt-custom-39";
              default:
                return "mt-0";
            }
          }

          return (
            <div className={`skills-box w-full lg:w-1/2 xl:w-1/3 h-full ${skillsAddTopMargin(key)}`} key={`skill-${key}`}>
              <div className="box-content-wrap md:shadow-lg mx-2 p-2 pb-10 sm:p-10 h-full rounded-lg">
                {/* <img src={icon} className="skills-icon mb-6" alt={`skills icon for ${val.node.cpt_skills.name}`}/> */}
                <Img fixed={icon} 
                  alt={val.node.cpt_skills.name} 
                  className={`skills-icon mb-6`}
                />
                <h3 className="font-bold text-xl lg:text-2xl mb-5">{title}</h3>
                <div className="skill-content" dangerouslySetInnerHTML={{ __html: textContent }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


export default Skills;