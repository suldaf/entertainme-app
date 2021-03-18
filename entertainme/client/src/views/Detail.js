import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_MOVIE, GET_SERIE } from '../queries'
import { favoritesVar } from '../localstate'
import { useEffect } from 'react';

export default function Detail() {
  const param = useParams()
  const history = useHistory()
  const favorites = useReactiveVar(favoritesVar)

  const { loading: movieLoading, error: movieError, data: movieData, refetch: movieRefetch } = useQuery(GET_MOVIE, {
    variables: { id: param.id }
  })
  const { loading: serieLoading, error: serieError, data: serieData, refetch: serieRefetch } = useQuery(GET_SERIE, {
    variables: { id: param.id }
  })

  useEffect(() => {
    if (movieData) {
      movieRefetch()
    } else {
      serieRefetch()
    }

  }, [movieData, movieRefetch, serieRefetch])

  if (movieLoading || serieLoading) {
    return <h1 className="text-center">Loding....</h1>
  }
  if (movieError || serieError) {
    return <h1 className="text-center">Error....</h1>
  }

  function addFav(movie) {
    if (favorites.some((fav) => fav._id === movie._id)) {
      const oldData = favoritesVar()
      const newData = oldData.filter((el) => el._id !== movie._id)
      favoritesVar(newData)
    } else {
      const oldData = favoritesVar()
      const newData = movie
      favoritesVar([newData, ...oldData])
    }
  }

  return (
    <div className="col">
      <h1 className="text-center">{movieData.movie ? "DETAIL MOVIE" : "DETAIL TV SERIE"}</h1>
      <div className="row">
        <div className="col" style={{ justifyContent: 'center', display: 'flex' }}>
          <div className="card bg-info" style={{ width: '25rem', margin: '10px' }}>
            <img src={movieData.movie ? movieData.movie.poster_path : serieData.serie.poster_path} className="card-img-top" alt="" height="450px" style={{ objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">{movieData.movie ? movieData.movie.title : serieData.serie.title}</h5>
              <p className="card-text" >{movieData.movie ? movieData.movie.overview : serieData.serie.overview}</p>
              <p className="card-text" >Popularity {movieData.movie ? movieData.movie.popularity : serieData.serie.popularity}</p>
              <p className="card-text">Tags:</p>
              <ul className="list-group list-group-flush" style={{ marginBottom: '10px' }}>
                {
                  movieData.movie ? movieData.movie.tags.map(el => <li className="list-group-item bg-info" key={el}>{el}</li>) : serieData.serie.tags.map(el => <li className="bg-info list-group-item" key={el}>{el}</li>)
                }
              </ul>
              <div className="row" style={{ marginTop: "50px" }}>
                <div className="col-12" style={{ justifyContent: 'space-between', display: 'flex' }}>
                  <button className="btn btn-primary" onClick={() => history.push(`/edit/${param.id}`)}>Edit</button>
                  {
                    movieData.movie ? <button className="btn btn-outline-primary " onClick={() => addFav(movieData.movie)}><i className="fas fa-heart" style={{ color: favorites.some((fav) => fav._id === movieData.movie._id) ? '#FF88DC' : 'grey' }}></i></button> : <span></span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}