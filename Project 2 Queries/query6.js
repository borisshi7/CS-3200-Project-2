import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017");

const photos = client.db("photoStock").collection("photos");

//Query 6: Updates the authentication status of an artist based on their authentication ID

const authenticationPlatform = "Unsplash";
const newAuthenticationStatus = true;

const updateResult = await photos.updateMany(
  {
    "artist.artistAccount.authentication.authenticationPlatform": authenticationPlatform
  },
  {
    $set: {
      "artist.artistAccount.authentication.authenticationStatus": newAuthenticationStatus
    }
  }
);

console.log(`${updateResult.modifiedCount} document(s) updated.`);


await client.close();