import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017");

const photos = client.db("photoStock").collection("photos");

//Query 3: Counting the number of photos uploaded by a specific user (e.g. Tyler Carter in this case)
const photographerName = "Tyler Carter";

const photographerPhotoCount = await photos.aggregate([
  {
    $match: {
      "artist.artistName": photographerName
    }
  },
  {
    $group: {
      _id: "$artist.artistName",
      photoCount: { $sum: 1 }
    }
  }
]).toArray();

console.log(`Photographer "${photographerName}" has ${photographerPhotoCount[0].photoCount} photo(s).`);

await client.close();
