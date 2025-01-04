import { useDispatch } from "react-redux"
import Form from "../Form"
import { UserDataType } from "../types";
import { login } from "../../../store/authSlice";

const Login = () => {

  const dispatch = useDispatch();

  const handleLogin = (data:UserDataType) => {
    dispatch(login(data))
  }

  return (
    <>
    <Form text="Login" onSubmit={handleLogin}/>
    </>
  )
}

export default Login