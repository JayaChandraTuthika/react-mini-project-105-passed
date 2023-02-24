import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Navbar extends Component {
  state = {
    searchInput: '',
    showNavMedium: false,
  }

  showMediumNavbar = () => {
    this.setState(prev => ({showNavMedium: !prev.showNavMedium}))
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchInputData = () => {
    const {searchInput} = this.state
    const {onSearch} = this.props
    onSearch(searchInput)
  }

  render() {
    const {searchInput, showNavMedium} = this.state
    let activeTab
    const {match} = this.props
    const {path} = match
    switch (path) {
      case '/':
        activeTab = 'home'
        break
      case '/popular':
        activeTab = 'popular'
        break
      case '/search':
        activeTab = 'search'
        break
      case '/account':
        activeTab = 'account'
        break
      default:
        activeTab = ''
        break
    }
    return (
      <div className="navbar-bg">
        <div className="inner-navbar-container-responsive">
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676920782/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/LOGO_ycujjt.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
          </div>
          <ul className="nav-links-list-container-1">
            <Link
              to="/"
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            >
              <li className="nav-links-list-item">Home</li>
            </Link>
            <Link
              to="/popular"
              className={`nav-link ${activeTab === 'popular' ? 'active' : ''}`}
            >
              <li className="nav-links-list-item">Popular</li>
            </Link>
          </ul>
          <div className="profile-search-list-container">
            <li className="nav-links-list-item">
              {activeTab === 'search' ? (
                <div className="search-input-btn-container">
                  <input
                    type="search"
                    className="search-input"
                    onChange={this.onChangeSearch}
                    value={searchInput}
                  />
                  <button
                    type="button"
                    className="search-button search-active"
                    testid="searchButton"
                    onClick={this.onSearchInputData}
                  >
                    <HiOutlineSearch className="search-icon" />
                  </button>
                </div>
              ) : (
                <Link to="/search" className="search-route-link">
                  <button type="button" className="search-button">
                    <HiOutlineSearch className="search-icon" />
                  </button>
                </Link>
              )}
            </li>
            <li className="nav-links-list-item">
              <Link to="/account" className="profile-link">
                <img
                  src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676973451/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Home%20page/Avatar_maai79.svg"
                  alt="profile"
                  className="profile-pic"
                />
              </Link>
              <GiHamburgerMenu
                className="hamburger-icon"
                onClick={this.showMediumNavbar}
              />
            </li>
          </div>
        </div>
        {showNavMedium ? (
          <ul className="nav-links-list-container-2">
            <Link
              to="/"
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            >
              <li className="nav-links-list-item">Home</li>
            </Link>
            <Link
              to="/popular"
              className={`nav-link ${activeTab === 'popular' ? 'active' : ''}`}
            >
              <li className="nav-links-list-item">Popular</li>
            </Link>
            <Link
              to="/account"
              className={`nav-link ${activeTab === 'account' ? 'active' : ''}`}
            >
              <li className="nav-links-list-item">Account</li>
            </Link>
          </ul>
        ) : null}
      </div>
    )
  }
}

export default withRouter(Navbar)
