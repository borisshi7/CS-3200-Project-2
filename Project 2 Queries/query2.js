import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017");

const photos = client.db("photoStock").collection("photos");

//Query 2: Choose all the photos uploaded during 2023, sorted by the artist identification
const photos2023 = await photos
  .find({
    "timePosts.timePosting": {
      $gte: new Date("2023-01-01T00:00:00.000Z"),
      $lte: new Date("2023-12-31T23:59:59.999Z"),
    },
  })
  .sort({ "artist.artistName": 1 })
  .toArray();

console.log(photos2023);

await client.close();
