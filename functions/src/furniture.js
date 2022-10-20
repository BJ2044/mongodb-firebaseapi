import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req, res) {
    // connect to the database
    const db = dbConnect()
    // get the whole furniture collection
    const collection = await db.collection("furniture").find().toArray()
    // catch any errors -> status 500
        .catch(err => {
            res.status(500).send(err);
            return;
        });
    // send back the array of furniture
    res.send(collection)
}

export async function addNewFurniture(req, res) {
    // create new furniture from the body of the request
    const { name, type, color } = req.body
    const newFurniture = { name, type, color }
    // connect to the database
    const db = dbConnect()
    // put this new furniture into our furniture collection in our db
    await db.collection('furniture').insertOne(newFurniture)
    // catch errors and send w/status 500
        .catch(err => {
            res.status(500).send(err)
            return
        })
    // return response with 201 all bueno
    res.status(201).send({ message: 'Furniture added' })
}
