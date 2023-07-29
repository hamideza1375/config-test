import { Column, Form } from "../../other/Components/Html"

const ForgetPass = (p) => {
  return (
    <Form phore onClick={p._user.getCodeForgetPass} />
  )
}

export default ForgetPass