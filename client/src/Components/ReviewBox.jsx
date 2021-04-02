import React from "react";
import ReactDOM from "react-dom";

import { Divider, Avatar, Grid, Paper, Card } from "@material-ui/core";

// import "./styles.css";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


export default function ReviewBox(props) {
/*
Reviews: [
  {
    landlordReview: {
      wouldRentAgain: true,
      friendlinessRating: 3.0,
      communicationRating: 4.0, 
      responsivenessRating: 3,
      maintenanceRating: 4,
      transactionIssues: false
    },
    propertyReview: {
      moveInDate: "2/3/19",
      moveOutDate: "9/10/19",
      cleanliness: 3,
      neighborsVibes: ["great, quiet, noisy, everything"],
      propertyIssues: ["squeky floorsss squeek suehfnp9ieo"],
      noiseLevelRating: 1,
      user: "user1",
    },
    reviewBody: 'this place sucks',
    user: 'user123'
  },
  {
    landlordReview: {
      wouldRentAgain: true,
      friendlinessRating: 3,
      communicationRating: 2, 
      responsivenessRating: 3,
      maintenanceRating: 4,
      transactionIssues: true,
    },
    propertyReview: {
      moveInDate: "2/3/20",
      moveOutDate:  "9/10/20",
      cleanliness: 4,
      neighborsVibes: ["great, quiet, noisy, everything"],
      propertyIssues: ["squeky floorsss squeek suehfnp9ieo"],
      noiseLevelRating: 2,
    },
    reviewBody: 'this place rocks!!!',
    user: 'user456'
  },
]
*/
  console.log('Review Box props', props);
  const {reviews} = props;

  

  return (
    <div style={{ padding: 14 }} className="ReviewBox">
      <h1>Reviews</h1>
      {/* <Paper style={{ padding: "40px 20px" }}> */}
      {reviews.map( (review, index) => (
        <Paper style={{ padding: "40px 20px", marginTop: 25 }}>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Avatar alt={review.user} src={imgLink} />
              <h4>{review.user}</h4>
            </Grid>
            <Grid justify="flex-start" item xs={5}>
              {/* <h4 style={{ margin: 0, textAlign: "left" }}>{review.user}</h4> */}
              {Object.keys(review.landlordReview).map(landlordReviewProps => (
                <div>{landlordReviewProps}: {review.landlordReview[landlordReviewProps]}</div>
              ))}
            </Grid>
            <Grid justify="flex-start" item xs={5}>
              {/* <p style={{ textAlign: "left" }}>
                property review
              </p> */}
              {Object.keys(review.propertyReview).map(propertyReviewProps => (
                <div>{propertyReviewProps}: {review.propertyReview[propertyReviewProps]}</div>
              ))}
            </Grid>
            <Grid justify="flex-start" item xs={12}>
              {review.reviewBody}
              <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p>
            </Grid>
          </Grid>
      </Paper>
        ))}
      {/* </Paper> */}
    </div>
  );
}
