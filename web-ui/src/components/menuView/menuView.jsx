import { useState, useEffect } from 'react';
import { Container, Typography } from "@mui/material"
import MenuTable from "../../components/menuTable";

function MenuView({ date }) {
  const [rows, setRows] = useState(undefined)

  const testRows = [
    createRow('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createRow('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createRow('Eclair', 262, 16.0, 24, 6.0),
    createRow('Cupcake', 305, 3.7, 67, 4.3),
    createRow('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  useEffect(() => {
    fetch(`https://theon32sn0.execute-api.us-east-2.amazonaws.com/staging/menu/${date}`)
      .then((response) => response.json())
      .then((object) => {
        if (object.success) {
          let updatedRows = [];
          object.data.forEach((element) => {
            updatedRows.push(createRow(element.cafe_name, element.itemname, element.kcal, element.stationname, element.servicename));
          })
          setRows(updatedRows)
        } else {
          throw new Error(object.failure)
        }
      })
  }, []);

  function createRow(cafename, itemname, kcal, stationname, servicename) {
    return { cafename, itemname, kcal, stationname, servicename };
  }

  return (
    <Container disableGutters maxWidth="false">
      <Typography textAlign="center" variant="h2" pt={2}>
        MenuView: {date}
      </Typography>
      <Container>
        <MenuTable rows={rows} />
      </Container>
    </Container>
  )
} export default MenuView;