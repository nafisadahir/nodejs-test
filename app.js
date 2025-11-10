const{MongoClient}=require('mongodb');
const client=new MongoClient('mongodb://localhost:27017');
// client.connect()
// .then(() =>{
//     console.log('connect to mongoDB');
// })
// .catch(err => {
//     console.error('error connecting to mongoDB',error);
// })
// .finally(() =>{
//     client.close();
// });

async function main() {
  try {
    await client.connect();
    console.log('Connected to  the MongoDB');

    // Database name
    const db = client.db('jamhuuriya_university');

    // Collection name
    const students = db.collection('students');

    // Insert one
    const insertOneResult = await students.insertOne({
      name: 'Sacdiyo Cabdi',
      age: 23,
      department: 'Software Engneering'
    });
    console.log('Inserted one with _id:', insertOneResult.insertedId);

    // Insert many
    const insertManyResult = await students.insertMany([
      { name: 'qadra mohamed', age: 20, department: 'Medicine' },
      { name: 'Xasan abdi', age: 19, department: 'Business Management' },
      { name: 'Ramlo Cabdi', age: 18, department: 'Cyber Security' }
    ]);
    console.log('Inserted many count:', insertManyResult.insertedCount);

    // Update one
    const updateOneResult = await students.updateOne(
      { name: 'qadro mohamed' },
      { $set: { department: 'AI' } }
    );
    console.log('Updated one count:', updateOneResult.modifiedCount);

    // Update many
    const updateManyResult = await students.updateMany(
      { department: 'Data Science' },
      { $set: { department: 'AI' } }
    );
    console.log('Updated many count:', updateManyResult.modifiedCount);

    // Delete one
    const deleteOneResult = await students.deleteOne({ name: 'Xasan abdi' });
    console.log('Deleted one count:', deleteOneResult.deletedCount);

    // Delete many
    const deleteManyResult = await students.deleteMany({ age: { $gt: 30 } });
    console.log('Deleted many count:', deleteManyResult.deletedCount);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    await client.close();
  }
}

main();