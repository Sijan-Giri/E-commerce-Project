import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useNavigate } from 'react-router-dom';
import { login, setStatus } from '../../store/authSlice';
import { Status } from '../../types/status';

interface UserDataType{
  email : string,
  password : string
}

const SignIn: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {status} = useAppSelector((state) => state.auth)

  const [userData , setUserData] = useState<UserDataType>({
    email : "",
    password : ""
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target;
    setUserData({
      ...userData,
      [name] : value
    })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(userData))
  }

  useEffect(() => {
    if(status == Status.SUCCESS) {
      navigate("/admin/dashboard");
      dispatch(setStatus(Status.LOADING))
    }
  },[status,dispatch])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-boxdark">
    <div className="w-full max-w-md rounded-xl border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-6 px-8 dark:border-strokedark">
        <h3 className="text-2xl font-semibold text-primary dark:text-white">
          Welcome Admin!
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <div className="mb-6">
            <label className="mb-2 block text-lg text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-3 px-5 text-gray-700 outline-none transition-all duration-300 focus:border-primary dark:border-gray-600 dark:bg-form-input dark:text-white dark:focus:border-primary hover:border-primary"
              onChange={handleChange}
            />
          </div>
  
          <div className="mb-6">
            <label className="mb-2 block text-lg text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-3 px-5 text-gray-700 outline-none transition-all duration-300 focus:border-primary dark:border-gray-600 dark:bg-form-input dark:text-white dark:focus:border-primary hover:border-primary"
              onChange={handleChange}
            />
          </div>
  
          <button className="w-full rounded-lg bg-primary py-3 text-lg font-semibold text-white hover:bg-opacity-90 transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
  

  );
};

export default SignIn;
