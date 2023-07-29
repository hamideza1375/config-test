import React from 'react'
import { Column, Form } from '../../other/Components/Html'
import _useEffect from '../../controllers/_initial'

const Register = (p) => {
  _useEffect(() => { p.setgetCodeView(true) }, [])

  return (
    <Column f={1}>
          <Form f phore p ch autoComplete={false} bgcolor='#fff' onClick={p._user.getCodeForRegister} />
    </Column>
  )
}

export default Register