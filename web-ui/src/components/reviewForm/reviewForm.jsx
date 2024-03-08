import { Box, Container, Typography, Input, Slider, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { post } from 'aws-amplify/api';

function ReviewForm({id}) {

  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [text, setText] = useState('')

  const navigate = useNavigate()
  const viewReviews = (id) => {
      navigate(`/reviews/${id}`)
  }

  const submitForm = () => {
    //TODO: figure out how amplifys post works 
    // also figure out how to get reviewer ID / name with whatever auth wrapper we end up settling on
    // post(`https://theon32sn0.execute-api.us-east-2.amazonaws.com/staging/menu/reviews/${id}`)
    // const restOperation = post({
    //   apiName: 'menu',
    //   path: '/reviews',
    //   options: {
    //     body: {
    //       reviewer_id: ,
    //       review_text: text,
    //       star_score: score
    //       item_id: id
    //       created_at: date
    //       edited_at: 
    //       reviewer_name: 
    //     }
    //   }
    // });
    setName('')
    setScore(0)
    setText('')
    viewReviews(id)
  }

  return (
    <Container disableGutters maxWidth="false">
      <Typography textAlign="center" variant="h4" pt={2}>
        Leave Review: {id}
      </Typography>
      <Box sx={{
        padding: '2em',
        height: '50dvh',
        display: 'flex',
        flexWrap: 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Input sx={{width: '50%'}} placeholder="Your name" value={name} onChange={(e) => (setName(e.target.value))}/>
        {/* TODO: figure out valueLabel: SliderValueLabel to display slider state on hover / drag*/}
        <Slider sx={{width: '50%'}}marks={true} step={1} min={0} max={5} value={score} onChange={(e) => (setScore(e.target.value))}/>
        <Input sx={{width: '50%'}} multiline placeholder="How was your meal?" value={text} onChange={(e) => (setText(e.target.value))}/>
        <Button disabled={text == ""} onClick={() => submitForm()}> Submit </Button>
      </Box>
  </Container>
   
  )

} export default ReviewForm