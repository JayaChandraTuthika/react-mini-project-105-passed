// import {withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Header extends Component {
  state = {
    headerStatus: statusConstants.initial,
    originalsMoviesList: [],
  }

  componentDidMount() {
    this.getOriginalMovies()
    console.log('mounted Header')
  }

  onRetryHeader = () => {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({headerStatus: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const getOriginalsMoviesApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(getOriginalsMoviesApiUrl, options)
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        originalsMoviesList: updatedData,
        headerStatus: statusConstants.success,
      })
    } catch (e) {
      this.setState({headerStatus: statusConstants.failure})
    }
  }

  getHeader = () => {
    const {originalsMoviesList} = this.state
    const posterMovieDetails =
      originalsMoviesList[
        Math.floor(Math.random() * originalsMoviesList.length)
      ]
    const {name, overview} = posterMovieDetails

    return (
      <div className="header-info-text-container">
        <h1 className="header-movie-heading">{name}</h1>
        <p className="header-movie-description">{overview}</p>
        <button type="button" className="play-btn-header">
          Play
        </button>
      </div>
    )
  }

  getFailureHeader = () => (
    <div className="failure-container-fetching-header">
      <img
        src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676988437/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Home%20page/Error-fetch-icon_ndhs8l.svg"
        alt="error"
        className="fetch-failure-image-slick"
      />
      <p className="fetch-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="fetch-failure-try-again-btn"
        onClick={this.onRetryHeader}
      >
        Try Again
      </button>
    </div>
  )

  getLoaderView = () => (
    <div className="header-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
    </div>
  )

  render() {
    const {headerStatus} = this.state
    let header
    switch (headerStatus) {
      case statusConstants.success:
        header = this.getHeader()
        break
      case statusConstants.failure:
        header = this.getFailureHeader()
        break
      case statusConstants.inProgress:
        header = this.getLoaderView()
        break

      default:
        header = null
        break
    }

    return (
      <div className="header-container">
        <Navbar />
        {header}
      </div>
    )
  }

  // console.log(posterMovieDetails)

  //   style={{
  //         background: `linear-gradient(to right,rgba(0, 0, 0, 0.801) ,transparent),url(${backdropPath})`,
  //       }}
}

export default Header
