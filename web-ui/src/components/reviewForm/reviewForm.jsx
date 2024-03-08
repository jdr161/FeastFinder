import { Box, Container, Typography, Input, Slider, Button } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types';

function ReviewForm({id}) {

  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [text, setText] = useState('')

  const submitForm = () => {
    //TODO: post review
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
        <Button disabled={text == ""} onClick={submitForm()}> Submit </Button>
      </Box>
  </Container>
   
  )

} export default ReviewForm