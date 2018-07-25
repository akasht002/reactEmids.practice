import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const style = {
  padding: '10px 20px',
  width: 140,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px'
}

 const RemoteSubmitButton = (props) =>{
    const {  submitting,invalid } = props
    return(
        <button type="submit" disabled={submitting||invalid}>Submit</button>
    )
}

export default RemoteSubmitButton