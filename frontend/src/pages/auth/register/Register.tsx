import { useDispatch } from "react-redux"
import Form from "../Form"
import { register } from "../../../store/authSlice"
import { UserDataType } from "../types"

const Register = () => {

  const dispatch = useDispatch()

  const handleRegister = (data:UserDataType) => {
    dispatch(register(data))
  }

  return (
    <>
    <Form text="Register" onSubmit={handleRegister}/>
    </>
  )
}

export default Register
