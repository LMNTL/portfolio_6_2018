import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import LandingPage from './components/landingpage.js';
import Projects from './components/projects.js';
import AboutMe from './components/aboutme.js';
import Contact from './components/contact.js';
import './App.css';
import LazyLoad from 'react-lazyload';

const header = require('./images/earth.JPG');
const headerMiddle = require('./images/moon2.jpg');

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			parallaxOffsets: [],
			parallaxFactors: [],
			starPositions: [],
			width: 0,
			height: 0,
			headerLoaded: '',
			activePage: 'LandingPage',
			stars: 20
		}
		this.lastPosition = 0;
		this.ticking = false;
	}

	

	componentDidMount(){
		this.makeStars();
		this.setWindowDimensions();
		window.addEventListener('resize', this.setWindowDimensions);
		window.addEventListener('scroll', this.parallax);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.setWindowDimensions);
		window.removeEventListener('scroll', this.parallax);
	}
	
	setWindowDimensions = () => {
		this.setState( {
			width: window.innerWidth,
			height: window.innerHeight
		} );
	}

	parallax = (event) => {
		const lastPosition = window.scrollY;
		if (!this.ticking) {
			window.requestAnimationFrame( () => {
			  this.updateParallax(lastPosition);
			  this.ticking = false;
			});
			this.ticking = true;
		  }
	}

	updateParallax = (lastPosition) => {
		const newOffsets = [];
		for(let i = 0; i < this.state.parallaxFactors.length; i++){
			newOffsets.push(lastPosition*this.state.parallaxFactors[i]);
		}
		this.setState({parallaxOffsets: newOffsets});
	}

	makeStars = () => {
		const starOffsets = [0];
		const starFactors = [0.1];
		const starPositions = [];
		for(let i = 0; i < this.state.stars; i++){
			starOffsets.push(0);
			starFactors.push(Math.random()/4);
			starPositions.push(this.randomSkyPoint())
		}
		this.setState({
			parallaxOffsets: starOffsets,
			parallaxFactors: starFactors,
			starPositions
		});
	}

	randomSkyPoint = () => {
		const x = Math.random() * 70;
		const y = Math.random() * (80-x);
		return [x.toString() + 'vw', y.toString() + 'vh'];
	}
	
  render() {
	const pTransforms = this.state.parallaxOffsets.map((el, i) => {
		return `translate(0px, -${this.state.parallaxOffsets[i]}px) scale(${this.state.parallaxFactors[i]*2}, ${this.state.parallaxFactors[i]*2})`;
	});
    return this.state.width ? (
				<div className="fullpage">
					<div  className='topbox'>
						<img
							src={header}
							className="front"
							alt='View of earth from the space'
						/>
						<img
							src={headerMiddle}
							className="moon"
							alt='The moon'
							style={{
								transform: pTransforms[0]
							}}
						/>
						{this.state.parallaxOffsets.slice(1).map( (offset, index) => {
							return (
								<div
									className='star'
									key={index}
									style={{
										transform: pTransforms[index+1],
										right: this.state.starPositions[index][0],
										top: this.state.starPositions[index][1],
										animationDelay: offset
									}}
								/>
							);
						})}
						<h1 className="topbox--name">Jessica Thomas. </h1>
					</div>
					<div className='navbar'>
						<p className='navbar--item'><Link to='/'>Home</Link></p>
						<p className='navbar--item'><Link to='/projects'>Projects</Link></p>
						<p className='navbar--item'><Link to='/aboutme'>About Me</Link></p>
						<p className='navbar--item'><Link to='/contact'>Contact</Link></p>
					</div>
					<div className='divider'>
							<a href='https://github.com/fairlight-excalibur/' className='divider--element'>
								<img src='./GitHub_Logo.png' className='divider--image' alt='Github'/>
							</a>
					</div>
					<div className='content'>
						<Route exact path="/" component={LandingPage} />
						<Route path="/projects" component={Projects} />
						<Route path="/contact" component={Contact} />
						<Route path="/aboutme" component={AboutMe} />
					</div>
					<div className='footer'>
						Built in React/Node.js, hosted on an Amazon EC2 instance. Thank you for reading this footer; it pays to be thorough.
					</div>
				</div>
		) : <div className='loader'></div>;
  }
}

export default App;