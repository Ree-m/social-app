import { Link } from "react-router-dom"
const SideBar = () => {
  return (
    <div>
        <Link to={"/dashboard"}>All posts</Link>
        <Link to={"/dashboard/accounts"}>Accounts</Link>

    </div>
  )
}

export default SideBar