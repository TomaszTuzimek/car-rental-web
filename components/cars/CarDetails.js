import classes from './CarDetails.module.css'
import React from 'react'

function CarDetails(props) {
  return (
        <section className={classes.detail}>
            <div>
                <h1>carId: {props.id}</h1>
            </div>
            <div>
                <img src={props.image} alt={props.brand} />
            </div>
            <div>
                <h1>{props.model}</h1>
            </div>
            <div>
                <p>{props.hp}</p>
            </div>
        </section>
  )
}

export default CarDetails