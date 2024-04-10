import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017");

const photos = client.db("photoStock").collection("photos");

//Query 1: Choose all the photos shot during 2024, uploaded at the same year and has the 'Cityscape' tags for batch uploading

const eventPhotos2024 = await photos.find({
  dateAndTime: {
    $gte: new Date("2024-01-01T00:00:00.000Z"),
    $lte: new Date("2024-12-31T23:59:59.999Z"),
  },
  "timePosts.timePosting": {
    $gte: new Date("2024-01-01T00:00:00.000Z"),
    $lte: new Date("2024-12-31T23:59:59.999Z"),
  },
  "tags.tagName": "Cityscape",
});

for await (const photo of eventPhotos2024) {
  console.log(photo);
}

await client.close();
