import Form from "../Form"
import { register, setStatus } from "../../../store/authSlice"
import { Status, UserDataType } from "../types"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const dispatch = useAppDispatch()
  const {status} = useAppSelector((state) => state.auth);
  const navigate = useNavigate()

  const handleRegister = (data:UserDataType) => {
    dispatch(register(data))
  }

  if(status == Status.SUCCESS) {
    navigate("/login")
    dispatch(setStatus(Status.LOADING))
  }

  return (
    <>
    <Form text="Register" onSubmit={handleRegister}/>
    </>
  )
}

export default Register
