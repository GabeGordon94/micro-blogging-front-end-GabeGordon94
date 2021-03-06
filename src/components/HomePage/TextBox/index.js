import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import firebase from 'firebase'

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        //this.userName = localStorage.getItem('username');
        this.state = {
            name: firebase.auth().currentUser.displayName,
            text: '',
            btnState: true,
            errorClass:'d-none'
        }
    }

    componentDidMount() {

    }

    validator(event) {
        this.setState({errorClass:'d-none'})
        const input = event.target.value;
        if (input.length === 0) {
            this.setState({ btnState: true })
        } else if (input.length === 140) {
            this.setState({errorClass:''})
        } else {
            this.setState({ btnState: false, text: input })
        }

    }

    getDate() {
        var d = new Date();
        return d.toISOString();
    }


    render() {
        const { name, text,errorClass,btnState } = this.state;

        return (
            <div className="w-100 justify-content-center d-flex">
                {name &&
                    <div className="w-100 justify-content-center d-flex mb-3">
                        <textarea type='text' id="newTweetBox" placeholder="What you have in mind..." maxLength='140'
                            onChange={(event) => { this.validator(event) }} value={text}/>
                        <div className="d-flex">
                            <button id="tweetButton" className="btn" onClick={() => {
                                this.props.onClick(name, text, this.getDate());
                                this.setState({ btnState: true,text:'' })
                            }}
                                disabled={btnState}
                            >Tweet</button>
                            <span id="exceedingLength" className={errorClass}>The tweet can't contain more then 140 chars.</span>
                        </div>
                    </div>
                }
                {!name &&
                    <>
                        <Link to="/profile" className="text-danger"> <h1>Set Your Username</h1></Link>
                        <button id="tweetButton" className="btn" onClick={() =>
                            this.props.onClick(name, text, this.getDate())} disabled
                        >Tweet</button>
                    </>
                }
            </div>
        );
    }
}

export default TextBox;