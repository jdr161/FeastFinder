import { useState, useEffect } from 'react';
import { Container, Typography } from "@mui/material"
import MenuTable from "../../components/menuTable";

function MenuView({ date }) {
  const [rows, setRows] = useState(undefined)

  const testRows = [
    createRow('Leutner', 'Frozen yoghurt', 159, 6.0, 24, 10),
    createRow('Fribley', 'Ice cream sandwich', 237, 9.0, 37, 11),
    createRow('Leutner', 'Eclair', 262, 16.0, 24, 421),
    createRow('Leutner', 'Cupcake', 305, 3.7, 67, 82),
    createRow('Fribley', 'Gingerbread', 356, 16.0, 49, 9821),
  ];

  useEffect(() => {
    fetch(`https://theon32sn0.execute-api.us-east-2.amazonaws.com/staging/menu/${date}`)
      .then((response) => response.json())
      .then((object) => {
        if (object.success) {
          let updatedRows = [];
          object.data.forEach((element) => {
            updatedRows.push(createRow(element.cafe_name, element.itemname, element.kcal, element.stationname, element.servicename, element.itemID));
          })
          setRows(testRows)
        } else {
          throw new Error(object.failure)
        }
      })
  }, []);

  function createRow(cafename, itemname, kcal, stationname, servicename, itemID) {
    return { cafename, itemname, kcal, stationname, servicename, itemID};
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