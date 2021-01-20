import React from 'react';

function About({ sectionTitle, sectionSubtitle, sectionContent, underlineTitle }) {

  return (
    <section className="about my-20 pb-20">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <span className="mb-8 text-xl lg:text-2xl block" dangerouslySetInnerHTML={{ __html: sectionSubtitle }} />
          <h1 className={`text-black text-3xl sm:text-5xl font-bold mb-5 whitespace-no-wrap ${underlineTitle ? "heading-underline" : null}`}><span dangerouslySetInnerHTML={{ __html: sectionTitle }} /></h1>
        </div>
        <div className="flex-1 md:pt-8">
          <div className="about-content" dangerouslySetInnerHTML={{ __html: sectionContent }} />
        </div>
      </div>
    </section>
  );
}


export default About;
