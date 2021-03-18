import { useQuery } from '@apollo/client';
import { GET_ENTERTAIN } from '../queries'
import Card from '../components/Card'
import { useEffect } from 'react';

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_ENTERTAIN)

  useEffect(() => {
    let mount = true
    if (mount) {
      refetch()
    }
    return () => {
      mount = false
    }
  }, [refetch])


  if (loading) {
    return <h1 className="text-center">LOADING.....</h1>
  }
  if (error) {
    return <h1 className="text-center">ERROR.....</h1>
  }
  return (
    <div>
      <h1 className="text-center">HomePage</h1>
      <div className="row">
        <div className="col-6" >
          <h1 className="text-center">MOVIES</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {
              data.entertain.movies.map(movie => <Card movie={movie} buttonFav={true} key={movie._id} />)
            }
          </div>
          {/* {JSON.stringify(data.entertain.movies)} */}
        </div>
        <div className="col-6" >
          <h1 className="text-center">TV SERIES</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {
              data.entertain.series.map(serie => <Card serie={serie} buttonFav={false} key={serie._id} />)
            }
          </div>
          {/* {JSON.stringify(data.entertain.series)} */}
        </div>
      </div>
    </div>
  )
}
