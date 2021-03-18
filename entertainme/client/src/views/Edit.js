import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { EDIT_MOVIE, EDIT_SERIE, GET_MOVIE, GET_SERIE, GET_ENTERTAIN } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import { TagInput } from 'reactjs-tag-input'
import Swal from 'sweetalert2'
export default function Edti() {
  const param = useParams()


  const { loading: movieLoading, error: movieError, data: movieData } = useQuery(GET_MOVIE, {
    variables: { id: param.id }
  })
  const { loading: serieLoading, error: serieError, data: serieData } = useQuery(GET_SERIE, {
    variables: { id: param.id }
  })
  let data
  if (movieData.movie) {
    data = movieData.movie
  } else {
    data = serieData.serie
  }
  let newTags = data.tags.map((el, i) => {
    return { index: i + 1, displayValue: el }
  })
  const [tags, setTags] = useState([...newTags])
  const [title, setTitle] = useState(data.title)
  const [poster_path, setPoster_path] = useState(data.poster_path)
  const [popularity, setPopularity] = useState(data.popularity)
  const [overview, setOverview] = useState(data.overview)
  const [editMovie] = useMutation(EDIT_MOVIE)
  const [editSerie] = useMutation(EDIT_SERIE)
  const history = useHistory()

  function addTags(tag) {
    setTags(tag)
  }
  function edit() {
    const tagStrings = tags.map(tag => tag.displayValue)
    if (movieData.movie) {
      editMovie({
        variables: {
          input: {
            title,
            poster_path,
            popularity: +popularity,
            overview,
            tags: tagStrings
          },
          id: movieData.movie._id
        },
        refetchQueries: [{ query: GET_ENTERTAIN }]
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success update a movies',
        showConfirmButton: false,
        timer: 1250,
        timerProgressBar: true
      })
      history.push('/')
    } else {
      editSerie({
        variables: {
          input: {
            title,
            poster_path,
            popularity: +popularity,
            overview,
            tags: tagStrings
          },
          id: serieData.serie._id
        },
        refetchQueries: [{ query: GET_ENTERTAIN }]
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success update a series',
        showConfirmButton: false,
        timer: 1250,
        timerProgressBar: true
      })
      history.push('/')
    }
  }
  if (movieLoading || serieLoading) {
    return <h1 className="text-center">Loding....</h1>
  }
  if (movieError || serieError) {
    return <h1 className="text-center">Error....</h1>
  }
  return (
    <div className="col">
      <div className="row" style={{ paddingTop: '50px' }}>
        <div className="col-2"></div>
        <div className="col-8" style={{ border: '2px solid black' }}>
          <h1 className="text-center text-light">{movieData.movie ? 'Edit a Movie' : "Edit a Tv Series"}</h1>
          <div className="mb-3">
            <label className="form-label text-light">Title</label>
            <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Poster Path</label>
            <input type="text" className="form-control" onChange={(e) => setPoster_path(e.target.value)} value={poster_path} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Popularity</label>
            <input type="number" className="form-control" min="1" max="10" step="0.1" onChange={(e) => setPopularity(e.target.value)} value={popularity} />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Overview</label>
            <input type="text" className="form-control" onChange={(e) => setOverview(e.target.value)} value={overview} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Tags</label>
            <TagInput tags={tags} onTagsChanged={addTags} wrapperStyle={`position: relative`} placeholder="Input Tags...." hideInputPlaceholderTextIfTagsPresent={false} tagStyle={'marginTop: 10px'} />
          </div>
          <div className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" onClick={() => edit()}>Submit</button>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>

  )
}