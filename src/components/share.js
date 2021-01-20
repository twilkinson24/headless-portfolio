import React from 'react';

import {
	FacebookShareButton,
	EmailShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	EmailIcon,
	RedditIcon,
} from 'react-share';

import {
    FacebookShareCount,
	RedditShareCount
} from 'react-share';

import '../assets/share.css';


const Share = ({ socialConfig, tags }) =>  {
	const twitterUsername = '@stevenorechow'
return (
	<>
	<div className="post-social-share">
		<FacebookShareButton url={socialConfig.config.url} className="button is-outlined is-rounded facebook" >
			<span className="icon">
				<FacebookIcon size={52} />
			</span>
			<span className="text">Facebook</span>
		</FacebookShareButton>
		<TwitterShareButton url={socialConfig.config.url} className="button is-outlined is-rounded twitter" title={socialConfig.config.title} via={twitterUsername.split('@').join('')} hashtags={tags} >
			<span className="icon">
				<TwitterIcon size={52} />
			</span>
			<span className="text">Twitter</span>
		</TwitterShareButton>
		<LinkedinShareButton url={socialConfig.config.url} className="button is-outlined is-rounded linkedin" title={socialConfig.config.title} >
			<span className="icon">
				<LinkedinIcon size={52} />
			</span>
			<span className="text">LinkedIn</span>
		</LinkedinShareButton>
		<EmailShareButton url={socialConfig.config.url} className="button is-outlined is-rounded email" title={socialConfig.config.title} >
			<span className="icon">
				<EmailIcon size={52} />
			</span>
			<span className="text">LinkedIn</span>
		</EmailShareButton>
		<RedditShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
			<span className="icon">
				<RedditIcon size={52} />
			</span>
			<span className="text">Reddit</span>
		</RedditShareButton>
		
	</div>
    <div className="social-share-counts">
        <FacebookShareCount url={socialConfig.config.url}>
        {shareCount => (
            <span className="block myShareCountWrapper">{shareCount.toString()}</span>
        )}
        </FacebookShareCount>

        <RedditShareCount url={socialConfig.config.url} />
    </div>
    </>
);
		}


export default Share;