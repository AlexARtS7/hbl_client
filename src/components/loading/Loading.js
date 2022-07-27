import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:180}}><Spinner animation="border"/></div>
  )
}

export default Loading