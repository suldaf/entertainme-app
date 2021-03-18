import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../localstate/'
export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar)
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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
      {
        favorites.map((el) => {
          return (
            <div className="card bg-info" style={{ width: '18rem', margin: '10px', minHeight: '50rem', maxHeight: '100rem' }} key={el._id}>
              <img src={el.poster_path} className="card-img-top" alt="" height="320px" style={{ objectFit: 'cover' }} />
              <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <h5 className="card-title">{el.title}</h5>
                <p className="card-text" >{el.overview}</p>
                <p className="card-text" >Popularuty: {el.popularity}</p>
                <p className="card-text">Tags:</p>
                <ul className="list-group list-group-flush" style={{ marginBottom: '10px', paddingLeft: '50px' }}>
                  {
                    el.tags.map((data) => <li key={data}>{data}</li>)
                  }
                </ul>
                <div className="col-12" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'flex-end' }}>
                  <button className="btn btn-outline-primary" onClick={() => addFav(el)}><i className="fas fa-heart" style={{ color: favorites.some((fav) => fav._id === el._id) ? '#FF88DC' : 'grey' }}></i></button> : <span></span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div >
  )
}