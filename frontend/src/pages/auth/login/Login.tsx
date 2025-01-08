import Form from "../Form"
import { Status, UserLoginDataType } from "../../../types/types";
import { login, setStatus } from "../../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {

  const dispatch = useAppDispatch();
  const {status} = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleLogin = (data:UserLoginDataType) => {
    dispatch(login(data))
  }

    useEffect(() => {
      if(status == Status.SUCCESS) {
        navigate("/")
        dispatch(setStatus(Status.LOADING))
      }
    },[status])


  return (
    <>
    <Form text="Login" onSubmit={handleLogin}/>
    </>
  )
}

export default Login