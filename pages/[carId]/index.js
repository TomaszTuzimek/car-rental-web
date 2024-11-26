import React from 'react'
import CarDetails from '../../components/cars/CarDetails'
import { MongoClient} from 'mongodb'
import Head from 'next/head'

function CarDetailPage(props) {

  return (

      <>
          <Head>
            <title>{props.brand}</title>
            <meta name='description' content={props.description} />
          </Head>
          <CarDetails 
            id={props.id}
            brand={props.brand}
            model={props.model}
            image={props.image}
            hp={props.hp}
            transmition={props.transmition}
            description={props.description}
          />
      </>    
  )
}

export async function getStaticPaths(){

  const client = await MongoClient.connect(process.env.MONGO_STRING);
  const db = client.db();
  const carCollection = db.collection('cars');
  const cars = await carCollection.find({}, {projection:{_id : 1}}).toArray();


  return  {paths: cars.map((car) =>({
                                            params: {carId : car._id.toString()}
                                          })
                              ),
                              fallback:false,
  }
}

export async function getStaticProps(context){
  const carId = context.params.carId;

  const connection = await MongoClient.connect(process.env.MONGO_STRING);
  const db = connection.db();
  const carCollection = db.collection('cars');
  const car = await carCollection.findOne({_id: carId})

  return(
    {
      props:{
        id: car._id,
        ...car
      }
    }
  )
}
export default CarDetailPage