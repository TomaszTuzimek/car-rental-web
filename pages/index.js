import { MongoClient } from 'mongodb'
import CarList from '../components/cars/CarList'
import Head from 'next/head';

export default function HomePage(props) {
  return (
    <>
            <Head>
                <title>Car Rental</title>
                <meta 
                    name='description' 
                    content='Car rental'></meta>
                <meta name='key'></meta>
            </Head>
            <CarList cars={props.cars} />
   
    </>
  )
}

export async function getStaticProps(){
  
    const client = await MongoClient.connect(process.env.MONGO_STRING);
    const db = client.db();
    const mongoCollection = db.collection('cars')
    const carsFromMongo = await mongoCollection.find().toArray();
    client.close();

    const  cars = carsFromMongo.map( (car) =>{
 
        return {
            id : car._id,
            brand : car.brand,
            model : car.model,
            image : car.image,
            hp: car.hp,
            transmition: car.transmition,
            description : car.description,
        }
    })

    return{
      props:{
        cars: cars,
        
      },
      revalidate: 1
    }
}
