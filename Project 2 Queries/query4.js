import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017");

const photos = client.db("photoStock").collection("photos");

//Query 4: Rank the photographers from lowest to highest by the amount of photos they've uploaded so far to a website (in this testing case, Unsplash)

const photoCountSort = [
  {
    $group: {
      _id: "$artist.artistName",
      photoCount: { $sum: 1 },
    },
  },
  {
    $sort: {
      photoCount: 1,
    },
  },
];

const rankedPhotographers = await photos.aggregate(photoCountSort).toArray();
console.log(rankedPhotographers);

await client.close();
