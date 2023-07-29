import { Column, Form } from "../../other/Components/Html"

const ResetPass = (p) => {
  return (
    <Form p cp onClick={p._user.resetPassword} />
  )
}

export default ResetPass