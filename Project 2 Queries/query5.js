import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017");

const photos = client.db("photoStock").collection("photos");

//Query 5: Find the Top 3 Most Popular Tags for Each Artist
const topTagsPerArtist = await photos.aggregate([
  {
    $unwind: "$tags"
  },
  {
    $group: {
      _id: {
        artistName: "$artist.artistName",
        tagName: "$tags.tagName"
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      "_id.artistName": 1,
      count: -1
    }
  },
  {
    $group: {
      _id: "$_id.artistName",
      tags: {
        $push: {
          tagName: "$_id.tagName",
          count: "$count"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      artistName: "$_id",
      topTags: { $slice: ["$tags.tagName", 3] }
    }
  }
]).toArray();

console.log(topTagsPerArtist);


await client.close();
