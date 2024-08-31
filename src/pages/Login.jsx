import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { setCredentials } from '../redux/slices/authSlice';
import { useLoginMutation } from '../redux/slices/authApiSlice';
import { toast } from 'sonner';
import FixNow from "../assets/fixnow.jpg"
import Loader from "../components/Loader"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const user = useSelector((state) => state.auth.user);
  const [login, { isLoading }] = useLoginMutation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      toast.success(`Logged in as ${result.isAdmin ? 'Admin' : 'User'}`);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User:', user);
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full min-h-screen flex items-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side start */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center mt-10">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Manage all your tasks in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Fixnow</span>
              <span>Task Management System</span>
            </p>
            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
        {/* left side end */}

        {/* right side start */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14 pb-14"
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>Welcome back!</p>
              <p className='text-center text-base text-gray-700'>
                Keep all your credentials safe.
              </p>
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email address"
                className='w-full rounded-full'
                register={register("email", { required: "Email Address is required!" })}
                error={errors.email ? errors.email.message : ""}
              />
              <div className="relative">
                <Textbox
                  placeholder='your password'
                  type={passwordVisible ? 'text' : 'password'}
                  name='password'
                  label='Password'
                  className='w-full rounded-full'
                  register={register("password", { required: "Password is required!" })}
                  error={errors.password ? errors.password.message : ""}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  style={{marginTop:'0.7rem'}}
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
              <Link to={"/email"}>
                <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                  Forget Password?
                </span>
              </Link>
              {isLoading ? <Loader /> : 
                <Button
                  type='submit'
                  label='Login'
                  className='w-full h-10 bg-blue-700 text-white rounded-full'
                />
              }
            </div>
            <Link to={"/registration"}>
              <p className='text-blue-600 text-1xl font-bold text-center hover:underline cursor-pointer'>
                User Registration
              </p>
            </Link>
          </form>
        </div>
        {/* right side end */}
      </div>
    </div>
  );
};

export default Login;
