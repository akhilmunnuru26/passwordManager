import {Component} from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid'

const PasswordItem = props => {
  const {passwordDetails, isChecked, deletePasswordDetails} = props
  const {websiteUrl, username, password, id, className} = passwordDetails
  const initial = username.slice(0, 1)

  const revealORHidePassword = isChecked ? (
    <p className="password">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )

  const onClickDeleteIcon = () => {
    deletePasswordDetails(id)
  }
  return (
    <li className="password-item">
      <div className="password-details-box">
        <div className={`initial-bg-box ${className}`}>
          <h1 className="initial">{initial}</h1>
        </div>
        <div>
          <p className="website-url">{websiteUrl}</p>
          <p className="user-name">{username}</p>
          {revealORHidePassword}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onClickDeleteIcon}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="icons"
        />
      </button>
    </li>
  )
}

const bgColorsList = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

class App extends Component {
  state = {
    usersList: [],
    websiteUrl: '',
    username: '',
    password: '',
    checked: false,
    searchInput: '',
  }

  getRandomBgColor = () => {
    const index = Math.ceil(Math.random() * bgColorsList.length - 1)
    return index
  }

  deletePasswordDetails = id => {
    const {usersList} = this.state
    const updatedUsersList = usersList.filter(eachItem => eachItem.id !== id)
    this.setState({usersList: updatedUsersList})
  }

  getFilteredUsersList = () => {
    const {searchInput, usersList} = this.state
    const filteredUsersList = usersList.filter(eachUser =>
      eachUser.websiteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return filteredUsersList
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderUserDetailsForm = () => {
    const {websiteUrl, username, password} = this.state
    return (
      <form onSubmit={this.onSubmitUserDetails} className="form">
        <h1 className="form-label">Add New Password</h1>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="icons"
          />
          <input
            placeholder="Enter Website"
            className="input"
            type="text"
            value={websiteUrl}
            onChange={this.getUserWebsiteUrl}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="icons"
          />
          <input
            placeholder="Enter Username"
            className="input"
            type="text"
            value={username}
            onChange={this.getUserName}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="icons"
          />
          <input
            placeholder="Enter Password"
            className="input"
            type="password"
            onChange={this.getUserPassword}
            value={password}
          />
        </div>
        <button className="submit-button" type="submit">
          Add
        </button>
      </form>
    )
  }

  onSubmitUserDetails = event => {
    event.preventDefault()
    const {websiteUrl, username, password} = this.state
    const index = this.getRandomBgColor()

    const addUser = {
      id: uuidv4(),
      websiteUrl,
      username,
      password,
      className: bgColorsList[index],
    }

    if (websiteUrl !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        usersList: [...prevState.usersList, addUser],
        websiteUrl: '',
        username: '',
        password: '',
      }))
    }
  }

  getUserWebsiteUrl = event => {
    if (event.target.value !== ' ') {
      this.setState({websiteUrl: event.target.value})
    }
  }

  getUserName = event => {
    if (event.target.value !== ' ') {
      this.setState({username: event.target.value})
    }
  }

  getUserPassword = event => {
    if (event.target.value !== ' ') {
      this.setState({password: event.target.value})
    }
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  render() {
    const {usersList, checked} = this.state

    const filteredUsersList = this.getFilteredUsersList()
    const toShowPasswordList = usersList.length > 0

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="user-details-container">
          <div className="website-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="website-image"
            />
          </div>
          <div className="website-form-container">
            {this.renderUserDetailsForm()}
          </div>
        </div>
        <div className="password-details-container">
          <div className="nav-bar">
            <div className="header-box">
              <h1 className="password-header">Your Passwords</h1>
              <p className="password-count">{filteredUsersList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="icons"
              />
              <input
                placeholder="Search"
                className="search-input"
                type="search"
                onChange={this.onSearch}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-container">
            <input
              onChange={this.toggleCheckbox}
              className="check-box"
              id="checkbox"
              type="checkbox"
              checked={checked}
            />
            <label className="check-box-label" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>

          {filteredUsersList.length === 0 ? (
            <div className="no-password-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-passwords-label">No Passwords</p>
            </div>
          ) : (
            <div>
              {toShowPasswordList ? (
                <ul className="users-password-details-list">
                  {filteredUsersList.map(eachItem => (
                    <PasswordItem
                      key={eachItem.id}
                      passwordDetails={eachItem}
                      isChecked={checked}
                      deletePasswordDetails={this.deletePasswordDetails}
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-password-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-password-image"
                  />
                  <p className="no-passwords-label">No Passwords</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
