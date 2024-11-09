import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if(req.method === 'POST'){
        const data = req.body;
        console.log('data from request: ' + data);
    
        const client =  await MongoClient.connect(process.env.MONGO_STRING);
        const db = client.db();

        const carsCollection = db.collection('cars')
        await carsCollection.insertOne(data);

        client.close();
    
        res.status(201).json({message: 'Car inserted'})
    }
}

export default handler