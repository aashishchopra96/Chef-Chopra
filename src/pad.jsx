import React from 'react'



const pad = ({info}) => {

  const styles = {
        backgroundColor : info.color
    }

    
const buttonElements = info.map(pad => (
        <button style={styles}   key={pad.id}></button>
    ))

  return (
    <div>{buttonElements}</div>
  )
}

export default pad



