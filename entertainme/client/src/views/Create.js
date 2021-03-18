import { TagInput } from 'reactjs-tag-input'
import { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, ADD_SERIE, GET_ENTERTAIN } from '../queries'
import Swal from 'sweetalert2'


export default function Create() {
  const [tags, setTags] = useState([])
  const { pathname } = useLocation()
  const loc = pathname.split('/')[2]
  const [title, setTitle] = useState('')
  const [poster_path, setPoster_path] = useState('')
  const [popularity, setPopularity] = useState('')
  const [overview, setOverview] = useState('')
  const [addMovie] = useMutation(ADD_MOVIE, { refetchQueries: [{ query: GET_ENTERTAIN }], awaitRefetchQueries: true })
  const [addSeries] = useMutation(ADD_SERIE, { refetchQueries: [{ query: GET_ENTERTAIN }], awaitRefetchQueries: true })
  const history = useHistory()

  function addTags(tag) {
    setTags(tag)
  }
  async function createSerie() {
    try {
      const tagStrings = tags.map(tag => tag.displayValue)
      if (!title || !overview || !popularity || !poster_path || tagStrings.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please fill all fields',
          text: 'Cannot be empty',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
      } else if (popularity > 10) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Popularity cannot more than 10',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
      } else {
        await addSeries({
          variables: {
            input: {
              title, poster_path, popularity: +popularity, overview, tags: tagStrings
            }
          }

        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success create a Tv Series',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })

        history.push('/')

      }
    } catch (err) {
      console.log(err);
    }
  }
  async function createMovie() {
    try {
      const tagStrings = tags.map(tag => tag.displayValue)
      if (!title || !overview || !popularity || !poster_path || tagStrings.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please fill all fields',
          text: 'Cannot be empty',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
      } else if (popularity > 10) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Popularity cannot more than 10',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })

      } else {
        await addMovie({
          variables: {
            input: {
              title, poster_path, popularity: +popularity, overview, tags: tagStrings
            }
          }
        })

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success create a Movies',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
        history.push('/')
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="col">
      <div className="row" style={{ paddingTop: '50px' }}>
        <div className="col-2"></div>
        <div className="col-8" style={{ border: '2px solid black' }}>
          <h1 className="text-center text-light">{loc === 'movies' ? 'Create a Movie' : "Create a Tv Series"}</h1>
          <div className="mb-3">
            <label className="form-label text-light">Title</label>
            <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Poster Path</label>
            <input type="text" className="form-control" onChange={(e) => setPoster_path(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Popularity</label>
            <input type="number" className="form-control" min="1" max="10" step="0.1" onChange={(e) => setPopularity(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Overview</label>
            <input type="text" className="form-control" onChange={(e) => setOverview(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Tags</label>
            <TagInput tags={tags} onTagsChanged={addTags} wrapperStyle={`position: relative`} placeholder="Input Tags...." hideInputPlaceholderTextIfTagsPresent={false} />
          </div>
          <div className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" onClick={() => loc === 'movies' ? createMovie() : createSerie()}>Submit</button>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}