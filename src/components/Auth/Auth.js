import React from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../helpers/data/authRequests';
import smashRequests from '../../helpers/data/smashRequests';

const defaultUser = {
  email: 'zoeames@gmail.com',
  password: '123456',
  bungieId: '13444526',
  membershipType: '1',
};

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  state = {
    newUser: defaultUser,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  emailChange = e => this.formFieldStringState('email', e);

  passwordChange = e => this.formFieldStringState('password', e);

  bungieIdChange = e => this.formFieldStringState('bungieId', e);

  membershipTypeChange = e => this.formFieldStringState('membershipType', e);

  registerUser = (e) => {
    const { newUser } = this.state;
    e.preventDefault();
    authRequests.registerUser(newUser).then((user) => {
      const { uid } = user.user;
      smashRequests.registerBungieUser(uid, newUser).then(() => {
        this.props.isAuthenticated();
      });
    }).catch(err => console.error('error in auth', err));
  }

  loginUser = (e) => {
    const { newUser } = this.state;
    e.preventDefault();
    authRequests.loginUser(newUser).then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    const { newUser } = this.state;
    return (
      <div className='Auth'>
        <div className="col-4 offset-4">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                aria-describedby="titleHelp"
                placeholder="johnsmith@gmail.com"
                value={newUser.email}
                onChange={this.emailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                aria-describedby="passwordHelp"
                placeholder=""
                value={newUser.password}
                onChange={this.passwordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bungieId">Bungie Id:</label>
              <input
                type="text"
                className="form-control"
                id="bungieId"
                aria-describedby="bungieIdHelp"
                placeholder="1234567"
                value={newUser.bungieId}
                onChange={this.bungieIdChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="membership">Select your membership type:</label>
              <select onChange={this.membershipTypeChange}>
                <option value="1">Xbox Live</option>
                <option value="2">PlayStation Network</option>
                <option value="254">Bungie.net</option>
              </select>
            </div>
            <button className='btn btn-danger' onClick={this.registerUser}>Register</button>
            <button className='btn btn-info' onClick={this.loginUser}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
