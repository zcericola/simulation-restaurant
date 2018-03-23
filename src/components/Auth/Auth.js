import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveUser} from '../../ducks/reducer';



class Auth extends Component {
    constructor(){
        super();
        this.handleUser = this.handleUser.bind(this);
    }

    handleUser(){
        //handles user on login

    }

    render(){
        return(<div className = 'auth-container'>
        <h1>Welcome To Good Eats</h1>
        <div className = 'login-info'>
        <span className = 'label'>Username: </span><input className = 'auth-input'/><br/>
        <span className = 'label'>Password: </span><input className = 'auth-input'/><br/>
        <button className = 'auth-btn'>Login</button>
        <button className = 'auth-btn'>Register</button>
        </div>

        </div>);
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {saveUser})(Auth);