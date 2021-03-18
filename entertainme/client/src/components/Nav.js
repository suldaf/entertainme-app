import { NavLink } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'


export default function Nav() {



  return (
    <div className="row" >
      <div className="col-5" >
        <NavLink to="/">
          <button className="btn btn-outline-success">
            <i className="fas fa-home"> Home</i>
          </button>
        </NavLink>
      </div>
      <div className="col-4" style={{ paddingLeft: '100px' }}>
        <NavLink to="/favorites" >
          <button className="btn btn-outline-warning" >
            <i className="far fa-star text-primary">Favorites</i>
          </button>
        </NavLink>

      </div>
      <div className="col-3" style={{ justifyContent: 'flex-end', display: 'flex' }}>
        <DropdownButton title={<i className="far fa-plus-square" style={{ fontSize: '25px' }}></i>} variant="btn btn-outline-success">
          <Dropdown.Item as="button"><NavLink to="/add/movies" style={{ marginRight: "15px" }}>
            <p className="btn btn-outline-success" >
              <i className="fas fa-film"> Create Movies</i>
            </p>
          </NavLink></Dropdown.Item>
          <Dropdown.Item as="button"><NavLink to="/add/series">
            <p className="btn btn-outline-success" >
              <i className="fas fa-tv"> Create TvSeries</i>
            </p>
          </NavLink></Dropdown.Item>
        </DropdownButton>


      </div>
    </div>
  )
}