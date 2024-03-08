import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Button } from "@mui/material"
import Review from '../review';
import { useNavigate } from 'react-router-dom';

function ReviewView({id}) { 
    //TODO: remove mock
    let mock = [ 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very bad food. horble",
            star_score: 1,
            item_id: id,
            created_at: new Date().setFullYear(2022, 0, 11),
            edited_at: new Date().setFullYear(2022, 1, 28),
            reviewer_name: "max"
        }, 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very good food. amzingreview text here. very good food. amzingreview text here. very good food. amzingreview text here. very good food. amzingreview text here. very good food. amzing",
            star_score: 4,
            item_id: id,
            created_at: new Date().setFullYear(2023, 2, 18),
            edited_at: new Date().setFullYear(2023, 4, 2),
            reviewer_name: "adam"
        }, 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very good food. amzing",
            star_score: 4,
            item_id: id,
            created_at: new Date().setFullYear(2023, 2, 18),
            edited_at: new Date().setFullYear(2023, 4, 2),
            reviewer_name: "adam"
        }, 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very good food. amzing",
            star_score: 4,
            item_id: id,
            created_at: new Date().setFullYear(2023, 2, 18),
            edited_at: new Date().setFullYear(2023, 4, 2),
            reviewer_name: "adam"
        }, 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very good food. amzing",
            star_score: 4,
            item_id: id,
            created_at: new Date().setFullYear(2023, 2, 18),
            edited_at: new Date().setFullYear(2023, 4, 2),
            reviewer_name: "adam"
        }, 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very good food. amzing",
            star_score: 4,
            item_id: id,
            created_at: new Date().setFullYear(2023, 2, 18),
            edited_at: new Date().setFullYear(2023, 4, 2),
            reviewer_name: "adam"
        }, 
        {
            review_id: 1,
            reviewer_id: 0,
            review_text: "review text here. very good food. amzing",
            star_score: 4,
            item_id: id,
            created_at: new Date().setFullYear(2023, 2, 18),
            edited_at: new Date().setFullYear(2023, 4, 2),
            reviewer_name: "adam"
        }
    ]
    
    const [reviews, setReviews] = useState(mock)

    useEffect(() => {
        fetch(`https://theon32sn0.execute-api.us-east-2.amazonaws.com/staging/menu/reviews/${id}`)
          .then((response) => response.json())
          .then((object) => {
            if (object.success) {
                console.log(object)
                //no reviews in the database...
                setReviews(object.data)
            } else {
              throw new Error(object.failure)
            }
          })
      }, []);

    const getReviewCards = () => {
        //Loading state
        if (reviews == undefined) {
            return (
                <CircularProgress />
            )
        }
        //Empty reviews
        else if (reviews.length == 0) {
            return (
                <Typography textAlign="center" variant="h4">
                    No reviews for this item
                </Typography>
            )
        } 
        // Display reviews
        else {
            return(
                reviews.map((review) => {
                    return <Review reviewdata={review} />    
                })
            )
        }
    }

    const navigate = useNavigate()
    const createReview = () => {
        navigate(`/reviews/${id}/create`)
    }

    return (
        <>
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center'
        }}>
            
            {getReviewCards()}
        </Container>
        <Button sx = {{
            position: 'fixed',
            bottom: '2em',
            left: '2em',
        }} onClick={() => createReview()}>Post a Review</Button>
        </>        
    )
    
} export default ReviewView