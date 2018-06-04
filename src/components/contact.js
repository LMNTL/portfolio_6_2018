import React, { Component } from 'react';
import './contact.css';

class Contact extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            message: '',
            submitted: false
        }
    }

    name = (event) => {
        this.setState({name: event.value});
    }

    emailChange = (event) => {
        this.setState({email: event.value});
    }

    messageChange = (event) => {
        this.setState({message: event.value});
    }

    submit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({submitted: true})
    }

    render(){
        return (
            <div>
                {this.state.submitted ?
                    <div className='submitted'>
                        <h1>Thank you for reaching out.</h1>
                        <h1>I'll be in contact shortly.</h1>
                    </div>
                : null}
                <form className='contact' onSubmit={this.submit}>
                    <h1>Get in touch</h1>
                    <input
                        className='nameField textField'
                        type='text'
                        name='name'
                        placeholder='Your name...'
                        onChange={this.nameChange}
                    />
                    <input
                        className='emailField textField'
                        type='text'
                        name='email'
                        placeholder='Your email address...'
                        onChange={this.emailChange}
                    />
                    <input
                        className='messageField textField'
                        type='text'
                        name='message'
                        placeholder='What can I do for you?'
                        onChange={this.messageChange}
                    />
                    <input
                        className='submitButton'
                        type='submit'
                        name='Submit'
                    />
                </form>
            </div>
    )};
};

export default Contact;