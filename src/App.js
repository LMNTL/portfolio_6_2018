import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import LandingPage from './components/landingpage.js';
import Projects from './components/projects.js';
import AboutMe from './components/aboutme.js';
import Contact from './components/contact.js';
import NotFound from './components/notfound.js';
import './App.css';

const header = require('./images/earth.JPG');
const github = require('./images/github.png');

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			width: 0,
			height: 0,
			headerLoaded: '',
			activePage: 'LandingPage',
			navbar: 'navbar navbar--collapse'
		}
	}


	componentDidMount(){
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

	toggleNavbar = () => {
		if(this.state.width < 850){
			this.setState({navbar: this.state.navbar == 'navbar' ? "navbar navbar--collapse" : "navbar" })
		}
	}
	
  render() {
    return this.state.width ? (
				<div
					className="fullpage" 
				>						
					<div  className='topbox'>
						<img
							src={header}
							className="front"
							alt='View of earth from the space'
						/>
						<h1 className="topbox--name">Jessica Thomas. </h1>
					</div>
					<div className={this.state.navbar} onClick={this.toggleNavbar}>
						<p className='navbar--item'><Link to='/'>Home</Link></p>
						<p className='navbar--item'><Link to='/projects'>Projects</Link></p>
						<p className='navbar--item'><Link to='/aboutme'>About Me</Link></p>
						<p className='navbar--item'><Link to='/contact'>Contact</Link></p>
						<a href='https://github.com/LMNTL/' className='navbar--item navbar--item--github'>
							<img src={github} className='navbar--github--image' alt='Github'/>
						</a>
					</div>
					<div>
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route path="/projects" component={Projects} />
							<Route path="/contact" component={Contact} />
							<Route path="/aboutme" component={AboutMe} />
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
					<div className='footer'>
						Built in React/Node.js, hosted on an Amazon EC2 instance. <a href='https://github.com/LMNTL/eb-portfolio'>Source here.</a> Thank you for reading this footer; it pays to be thorough.
					</div>
				</div>
		) : <div className='loader'></div>;
  }
}

export default App;