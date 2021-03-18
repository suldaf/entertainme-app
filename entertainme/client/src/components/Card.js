import { useHistory } from 'react-router-dom'
import { useMutation, useReactiveVar } from '@apollo/client'
import { DELETE_MOVIE, DELETE_SERIE, GET_ENTERTAIN } from '../queries'
import { favoritesVar } from '../localstate'
import Swal from 'sweetalert2'

export default function Card(props) {

  const history = useHistory()
  const { movie, serie, buttonFav } = props
  const [deleteMovie] = useMutation(DELETE_MOVIE)
  const [deleteSerie] = useMutation(DELETE_SERIE)

  const favorites = useReactiveVar(favoritesVar)

  function detailPage() {
    if (movie) {
      history.push(`/details/${movie._id}`)
    } else {
      history.push(`/details/${serie._id}`)
    }
  }

  async function removeData() {
    try {
      if (movie) {
        await deleteMovie({ variables: { id: movie._id }, refetchQueries: [{ query: GET_ENTERTAIN }], awaitRefetchQueries: true })
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Delete movie success',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
      } else {
        await deleteSerie({ variables: { id: serie._id }, refetchQueries: [{ query: GET_ENTERTAIN }], awaitRefetchQueries: true })
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Delete serie success',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  function addFav() {
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
    <div className="card bg-info" style={{ width: '18rem', margin: '10px' }}>
      <img src={movie ? movie.poster_path : serie.poster_path} className="card-img-top" alt={movie ? movie.title : serie.title} height="320px" style={{ objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title text-truncate">{movie ? movie.title : serie.title}</h5>
        <p className="card-text text-truncate" >{movie ? movie.overview : serie.overview}</p>
        <p className="card-text" >Popularity: {movie ? movie.popularity : serie.popularity}</p>
        <div className="row">
          <div className="col-12" style={{ justifyContent: 'space-between', display: 'flex' }}>
            <button className="btn btn-primary" style={{ marginRight: '3px' }} onClick={() => detailPage()}>Detail</button>
            {
              buttonFav ? <button className="btn btn-outline-primary" onClick={() => addFav()}><i className="fas fa-heart" style={{ color: favorites.some((fav) => fav._id === movie._id) ? '#FF88DC' : 'grey' }}></i></button> : <span></span>
            }
            <button className="btn btn-danger" style={{ marginLeft: '3px' }} onClick={() => removeData()}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}