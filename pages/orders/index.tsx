import React from 'react'
import { MongoClient } from 'mongodb'

interface Car {
    id: string,
    brand: string,
    model: string,
    description: string,
    image: string,
    hp: string,
    transmition: string
}

export default function Orders({cars}: {cars:Car[]}) {

  return (
    <div>
        <ul>
            {cars.map((element) => (<li key={element.id.toString()}>{element.id} {element.brand} {element.model}</li>))}
        </ul>
    </div>
  )
}

export async function getServerSideProps(){

    const connectionString = process.env.MONGO_STRING as string;
    const client = await MongoClient.connect(connectionString);
    const db = client.db();
    const collection = db.collection("cars");
    const carsArray = await collection.find().toArray();
    client.close();

    const cars = carsArray.map((element) => (
        {
            id: element._id,
            brand: element.brand,
            model: element.model,
            description: element.description,
            image: element.image,
            hp: element.hp,
            transmition: element.transmition
        }
    ));

    return {
        props:{
            cars,
        },
    };
}
