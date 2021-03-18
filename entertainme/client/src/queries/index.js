import { gql } from '@apollo/client'

export const GET_ENTERTAIN = gql`
  query GET_ENTERTAIN{
    entertain{
      movies{
        _id
        title
        popularity
        overview
        tags
        poster_path
      }
      series{
        _id
        title
        popularity
        overview
        tags
        poster_path
      }
    }
  }
`

export const GET_MOVIE = gql`
  query GET_MOVIE($id: ID){
    movie(_id: $id){
      _id
      title
      popularity
      overview
      tags
      poster_path
    }
  }
`

export const GET_SERIE = gql`
  query GET_SERIE($id: ID){
    serie(_id: $id){
      _id
      title
      popularity
      overview
      tags
      poster_path
    }
  }
`

export const ADD_MOVIE = gql`
  mutation ADD_MOVIE($input: MovieInput){
    addMovie(input: $input){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const ADD_SERIE = gql`
  mutation ADD_SERIE($input: SerieInput){
    addSeries(input: $input){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation DELETE_MOVIE($id: ID){
    deleteMovie(_id: $id){
      message
    }
  }
`
export const DELETE_SERIE = gql`
  mutation DELETE_SERIE($id: ID) {
    deleteSerie(_id: $id){
      message
    }
  }
`

export const EDIT_MOVIE = gql`
  mutation EDIT_MOVIE($input: MovieInput, $id: ID) {
    editMovie(_id: $id, input: $input) {
      message
    }
  }
`
export const EDIT_SERIE = gql`
  mutation EDIT_SERIE($input: SerieInput, $id: ID) {
    editSerie(_id: $id, input: $input) {
      message
    }
  }
`