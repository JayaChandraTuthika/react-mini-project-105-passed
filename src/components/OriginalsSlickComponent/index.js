import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SlickComponent from '../SlickComponent'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalsSlickComponent extends Component {
  state = {
    status: statusConstants.initial,
    originalMoviesList: [],
  }

  componentDidMount() {
    console.log('inside original')
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({status: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const getTrendingMoviesApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(getTrendingMoviesApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        originalMoviesList: updatedData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderOriginalSlick = () => {
    const {originalMoviesList} = this.state
    return <SlickComponent moviesList={originalMoviesList} />
  }

  onRetryData = () => {
    this.getOriginalMovies()
  }

  renderLoaderSLickComponent = () => (
    <div className="slick-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureSlickData = () => (
    <div className="failure-container-fetching">
      <img
        src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676988437/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Home%20page/Error-fetch-icon_ndhs8l.svg"
        alt="failure view"
        className="fetch-failure-image-slick"
      />
      <p className="fetch-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="fetch-failure-try-again-btn"
        onClick={this.onRetryData}
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {status} = this.state
    let originals

    switch (status) {
      case statusConstants.success:
        originals = this.renderOriginalSlick()
        break
      case statusConstants.inProgress:
        originals = this.renderLoaderSLickComponent()
        break
      case statusConstants.failure:
        originals = this.renderFailureSlickData()
        break

      default:
        originals = null
        break
    }
    return originals
  }
}

export default OriginalsSlickComponent
