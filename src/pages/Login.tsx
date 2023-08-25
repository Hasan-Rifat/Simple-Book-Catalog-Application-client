import React, { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/features/user/userApiSlice";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../app/hooks";

type error = {
  data: {
    message: string;
  };
};

const Login: React.FC = () => {
  const { data: user } = useAppSelector((state) => state.user);
  const [login, { isLoading, error, data }] = useLoginMutation();
  const navigate = useNavigate();
  if (isLoading) {
    toast.loading("Loading...", {
      id: "loading",
    });
    toast.dismiss("success");
  }

  if (error) {
    toast.dismiss("loading");
    toast.error((error as error).data.message as string, {
      id: "error",
    });
    toast.dismiss("success");
  }

  if (data) {
    toast.dismiss("loading");
    toast.dismiss("error");
    toast.dismiss("loading");
    toast.dismiss("error");
    toast.success("Login successfully", {
      id: "success",
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Rest of your form handling code
    const target = e.currentTarget;
    const email = target.email.value;
    const password = target.password.value;
    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (user && user.email && !isLoading) {
      navigate("/");
    }
  }, [user && user.email, isLoading]);
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative mt-5">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div>
                do you need account?{" "}
                <Link className="text-[#2c6aec]" to={"/register"}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
