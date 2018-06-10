import React from 'react';

const AboutMe = () => (
	<div className='aboutme content'>
		<img
            src='./facepic.jpg'
            alt='My face'
            style={{
                width: '40vw',
                float: 'right',
                paddingLeft: '1em',
                filter: 'drop-shadow(-0.5em 0.5em 0.2em #505050)',
                textAlign: 'justify'
            }}
        />
		<h1>About Jessica</h1>
		<p>I've been creating and modifying applications and websites since I was 9. My first programming exposure was endless hours making
        {' '}<a href='https://blog.archive.org/2017/08/11/hypercard-on-the-archive-celebrating-30-years-of-hypercard/'>HyperCard</a>{' '}
        stacks as a junior admin in my elementary school's computer lab. I learned in MAPLE, C++, and Dreamweaver (RIP) while earning a computation-focused STEM degree.
        Nowadays, I do most of my work in React, JS/HTML/CSS, C#, and SQL.</p>
        <p>Facing greater and greater challenges excites me. I feel fulfillment in learning new things, asking different questions, trying different approaches.</p>
        <p>If I'm not finishing my latest project or honing my skills, you'll probably find me watching Steven Universe with my roommates, mentoring street-based and at-risk youth,
		or powerlifting.</p>
	</div>
);

export default AboutMe;