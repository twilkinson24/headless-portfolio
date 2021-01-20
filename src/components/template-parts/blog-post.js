import React from "react"
import { useGlobal } from 'reactn';
import Img from "gatsby-image"
import { Link } from "gatsby"

import {FastCommentsCommentWidget} from 'fastcomments-react';

import { normalizePath } from "../../utils/get-url-path"
import Layout from '../../layouts/index'
import SEOPosts from '../seoPosts'
import Share from '../../components/share'

import HomeIcon from '../../assets/images/icons/home-icon.svg'
import ChevronRightIcon from '../../assets/images/icons/chevron-right.svg'

function BlogPost({ data }) {

  const [darkMode] = useGlobal('darkMode');

  const { nextPage, previousPage, page, allSite } = data
  const { title, content, date, excerpt, featuredImage, slug, seo, author, categories } = page,
        siteTitle = allSite.nodes[0].siteMetadata.title,
        siteUrl = allSite.nodes[0].siteMetadata.siteUrl,
        SEOPressCanonical = seo.canonicalUrl


  const structuredData = page.structured_data
  let imagePath, isFtImgSVG

  if(featuredImage) {
   if(featuredImage.node.localFile.childImageSharp) {
      isFtImgSVG = false
      imagePath = featuredImage.node.localFile.childImageSharp.fluid
   } else {
    isFtImgSVG = true
    imagePath = featuredImage.node.sourceUrl
   } 
  }

  let twitterUsername = '@stevenorechow'

  return (
      <Layout style={{ opacity: '0'}}>
        <SEOPosts 
            author={author}
            seoData={seo} 
            twitterHandle={twitterUsername} 
            postTitle={title} 
            postExcerpt={excerpt}
            siteTitle={siteTitle}
            structuredData={structuredData}
            canonicalUrl={seo.canonicalUrl ? SEOPressCanonical : siteUrl + '/' + slug + '/'}
        />
        <main className="container my-20 px-4 md:px-0">
          <article className="blog-post">
            <header>
              <h1 className="text-black text-center text-3xl sm:text-5xl font-bold mb-5">{title}</h1>
            </header>
            <div>
              {isFtImgSVG ?
                <img src={imagePath} alt={title} />
              :
                <Img fluid={imagePath} 
                objectFit="cover" 
                objectPosition="50% 50%" 
                alt={title} 
                className="w-full object-cover h-64 rounded-md"
                />
              }
            </div>
            <div className="breadcrumbs flex flex-wrap sm:flex-no-wrap text-xs sm:text-sm mt-8">
                <Link to={'https://stevenorechow.me'} className="mr-4">
                  <span className="sr-only">Homepage</span><HomeIcon />
                </Link>
                <p className="mr-4 flex items-center">
                  <span className="block w-4 h-4">
                    <ChevronRightIcon />
                  </span>  
                </p>
                <p>
                  <Link to={'https://stevenorechow.me/blog'} className="mr-4 no-underline text-gray">Blog</Link>
                </p>
                <p className="mr-4 flex items-center">
                  <span className="block w-4 h-4">
                    <ChevronRightIcon />
                  </span>
                </p>
                <p className="w-full sm:w-auto mt-3 sm:m-0">
                  {title}
                </p>
            </div>
            <div className="mb-20 post-content">
              <div className="flex flex-col lg:flex-row">
                <div className="mt-4 mb-0 lg:mt-8 date">
                  <p>
                    <Link to="/about">
                      {`${author.node.firstName} ${author.node.lastName}`}
                    </Link>
                  </p>
                  <p className="text-black">Last Updated: <time className="inline lg:block">{date}</time></p>
                    {categories.nodes.map((cat, key) => {

                      return (
                        <Link className={`inline-flex text-blue items-center pl-0 mr-3 mb-4 px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 px-0 py-1 no-underline`}                        
                            key={cat.slug+key} 
                            to={'/' + cat.slug}>
                          {cat.name}
                        </Link>
                      );
                    })}
            
                </div>
                <Share socialConfig={{ twitterUsername, config: {
                  url: `https://stevenorechow.me/${slug}`
                  }}} />                  
                <div className="my-4 lg:my-8 text-content pr-0 lg:pr-48" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          
          </article>
        </main>

        <nav className="container pagination px-4 lg:px-0 flex justify-between mb-20">
          {!!previousPage && (
            <Link to={normalizePath(previousPage.uri)} className="flex">
              <span className="flex items-center justify-center w-8">
                <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" />
                </svg>  
              </span>
              <span className="hidden lg:inline-block">{previousPage.title}</span>
            </Link>
          )}
          {!!nextPage && (
            <Link to={normalizePath(nextPage.uri)} className="flex">
              <span className="hidden lg:block">{nextPage.title}</span>
              <span className="flex items-center justify-center w-8">
                <svg className="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
              </span>
            </Link>
          )}
        </nav>

        <div className="comments-wrap container pagination px-4 lg:px-0">
          <FastCommentsCommentWidget tenantId="2OZdTfOpk"  hasDarkBackground={darkMode} />
        </div>
      </Layout>
  )
}

export default BlogPost