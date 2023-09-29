import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types
const Header = ({userName}) => {
  return (
    <div>
        <Link to="/">Create post {userName}</Link>
        </div>
  )
}

export default Header