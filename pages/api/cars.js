import { MongoClient } from 'mongodb'

async function meetups(req, res) {

    if(req.method === 'GET'){
        try {
            const client = await MongoClient.connect(process.env.MONGO_STRING)
            const db = client.db();
            const carCollection = db.collection('meetup');
            const cars = await carCollection.find().toArray();
            client.close();
            res.status(200).json(cars)
            
        } catch (error) {
            res.status(500).json({message: 'Fetch data failed'})
        }
    }else{
        res.status(305).json({message: 'Wrong request type. Method not allowed'})
    }
}
export default meetups