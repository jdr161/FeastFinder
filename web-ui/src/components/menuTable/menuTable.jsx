import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Typography, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"

function MenuTable({ rows }) {

  const navigate = useNavigate()
  const viewReviews = (id) => {
    navigate(`/reviews/${id}/`)
  }
  
  function getTableBody() {
    //loading state
    if (rows == undefined) {
      return (
        [...Array(10)].map((x, i) => (
          <TableRow
            key={"row-" + i}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </TableCell>
          </TableRow>
        )))
      // No data for this date
    } else if (rows.length == 0) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography textAlign="center" variant="h4">
              No data for this date
            </Typography>
          </TableCell>
        </TableRow>
      )
    } else {
      return (
        rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ 
              '&:last-child td, &:last-child th': { border: 0 },
              cursor: 'pointer'
            }}
            onClick={() => (viewReviews(row.itemID))}
          >
            <TableCell component="th" scope="row">
              {row.cafename}
            </TableCell>
            <TableCell align="right">{row.itemname}</TableCell>
            <TableCell align="right">{row.kcal}</TableCell>
            <TableCell align="right">{row.stationname}</TableCell>
            <TableCell align="right">{row.servicename}</TableCell>
          </TableRow>
        ))
      )
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, minHeight: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>cafe name</TableCell>
            <TableCell align="right">item name</TableCell>
            <TableCell align="right">kcal</TableCell>
            <TableCell align="right">station name</TableCell>
            <TableCell align="right">service name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableBody()}
        </TableBody>
      </Table>
    </TableContainer>
  )

} export default MenuTable;