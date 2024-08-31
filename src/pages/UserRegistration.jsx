import React from 'react';
import Textbox from '../components/Textbox';
import { useForm } from 'react-hook-form';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../redux/slices/authApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import Button from '../components/Button';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const FormContainer = styled.form`
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  max-height: 600px; /* Set a maximum height */
  overflow-y: auto; /* Allow scrolling if content overflows */
  margin: auto;
  animation: ${fadeIn} 1s ease-in;
`;

const Heading = styled.p`
  color: #1d4ed8;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  animation: ${slideUp} 0.5s ease-out;
`;

const SubText = styled.p`
  color: #4b5563;
  text-align: center;
  margin-bottom: 1.5rem;
  animation: ${slideUp} 0.5s ease-out;
`;

const AdminCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const UserRegistration = ({ setOpen, userData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registers, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleOnSubmit = async (data) => {
    try {
      const result = await registers({ ...data, password: data.password }).unwrap();
      if (userData && userData._id === result.user._id) {
        dispatch(setCredentials({ ...result.user }));
      }
      toast.success(`New ${data.isAdmin ? 'admin' : 'user'} registered successfully`);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <FormContainer onSubmit={handleSubmit(handleOnSubmit)}>
        <Heading>Welcome back!</Heading>
        <SubText>User Registration Form</SubText>
        <div className="flex flex-col gap-y-4">
          <Textbox
            placeholder="email@example.com"
            type="email"
            name="email"
            label="Email address"
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("email", {
              required: "Email Address is required!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder="Your Full Name"
            type="text"
            name="name"
            label="Name"
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("name", { required: "Name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          <AdminCheckbox>
            <label className="text-gray-700">Is Admin?</label>
            <input
              type="checkbox"
              name="isAdmin"
              {...register("isAdmin")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </AdminCheckbox>
          <Textbox
            placeholder='Your password'
            type='password'
            name='password'
            label='Create Password'
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <Textbox
            placeholder="Enter Your Role"
            type="text"
            name="role"
            label="Role"
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("role", { required: "Role is required!" })}
            error={errors.role ? errors.role.message : ""}
          />
          <Textbox
            placeholder="Enter Title"
            type="text"
            name="title"
            label="Title"
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />
          {isLoading ? <Loader /> : (
            <Button
              type='submit'
              className='w-full h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              label='Register'
              disabled={isLoading}  // Disable button while loading
            />
          )}
        </div>
      </FormContainer>
    </div>
  );
};

export default UserRegistration;
