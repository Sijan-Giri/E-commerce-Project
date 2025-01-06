import { Link } from "react-router-dom";
import { PropsType, UserDataType } from "./types";
import { ChangeEvent, FormEvent, useState } from "react";

const Form: React.FC<PropsType> = ({ text, onSubmit }) => {
  const [userData, setUserData] = useState<UserDataType>({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10"></div>

          <form onSubmit={handleSubmit} className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">{text}</h1>
              <p>Enter your information to {text}</p>
            </div>

            <div>
              {text === "Register" && (
                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-xs font-semibold px-1">Username</label>
                    <input
                      name="username"
                      type="text"
                      className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Enter your username"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="flex -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="text-xs font-semibold px-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="example@example.com"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="text-xs font-semibold px-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex -mx-3 mb-5">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    {text}
                  </button>
                </div>
              </div>

              {text === "Register" && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login">
                      <a className="text-indigo-500 font-semibold">Login here</a>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
