import { Container, Typography, Box, CircularProgress } from "@mui/material"

function Review({reviewdata}) { 
    return(
        <Box sx={{
            border: 1,
            borderRadius: '1em',
            width: '50dvw',
            minWidth: '16em',
            margin: '1em',
            padding: '0.5em'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                placeContent: 'space-between'
            }}>
                <Typography variant="h5" pt={2} sx={{}}>{reviewdata.reviewer_name}</Typography>
                <Typography variant="h5" pt={2} sx={{}}>{Array(reviewdata.star_score + 1).join("⭐")}</Typography> 
            </Box>
            
            <Typography variant="h7" pt={2} sx={{}}>{reviewdata.review_text}</Typography> 
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                placeContent: 'space-between'
            }}>
                <Typography variant="h7" pt={2} sx={{}}>Posted: {new Date(reviewdata.created_at).toLocaleDateString()}</Typography> 
                <Typography variant="h7" pt={2} sx={{}}>Last Edit: {new Date(reviewdata.edited_at).toLocaleDateString()}</Typography> 
            </Box>
        </Box>
    )
}

export default Review