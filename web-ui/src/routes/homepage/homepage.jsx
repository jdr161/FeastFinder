import MenuView from "../../components/menuView"

function Homepage() {
  return (
    <MenuView date={new Date().toISOString().split('T')[0]} />
  )
} export default Homepage