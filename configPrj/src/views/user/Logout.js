import { Column } from "../../other/Components/Html"

const Logout = (p) => {
  p._user.logout()
  return (
    <Column/>
  )
}

export default Logout