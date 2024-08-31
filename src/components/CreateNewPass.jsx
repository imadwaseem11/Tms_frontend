import React, { useState } from 'react';
import Button from './Button';
import Loading from './Loader';
import Textbox from './Textbox';
import { useResetPasswordMutation } from '../redux/slices/userApiSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  animation: ${fadeIn} 1s ease-in;
`;

const FormWrapper = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: ${slideUp} 0.5s ease-out;
`;

const Heading = styled.h2`
  color: #1d4ed8;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const SubText = styled.p`
  color: #4b5563;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const CreateNewPass = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const resetToken = params.get('token'); // Extract token from URL query parameters

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resetUserPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords don't match");
      return;
    }
    try {
      await resetUserPassword({ userId: data.userId, password: data.password, resetToken }).unwrap();
      toast.success("Password updated successfully");
      setIsResetSuccessful(true); // Set success state
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleSubmit(handleOnSubmit)}>
        <Heading>Reset Your Password</Heading>
        <SubText>Please enter your new password below.</SubText>
        <div className="flex flex-col gap-y-6">
          <Textbox
            placeholder='User ID'
            type='text'
            name='userId'
            label='User ID'
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("userId", {
              required: "User ID is required!"
            })}
            error={errors.userId ? errors.userId.message : ""}
          />
          <Textbox
            placeholder='New Password'
            type='password'
            name='password'
            label='New Password'
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("password", {
              required: "New Password is required!"
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <Textbox
            placeholder='Confirm New Password'
            type='password'
            name='cpass'
            label='Confirm New Password'
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("cpass", {
              required: "Confirm New Password is required!"
            })}
            error={errors.cpass ? errors.cpass.message : ""}
          />
        </div>
        {isLoading ? (
          <div className="py-5 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 flex flex-col items-center'>
            <Button
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              label='Save'
            />
          <Link to={"/log-in"}>
          <Button
              type='button'
              className='mt-4 bg-gray-300 px-8 text-sm font-semibold text-white rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'
              label='Back to Login'
              disabled={!isResetSuccessful} // Disable until reset is successful
               
            /></Link>
          </div>
        )}
      </FormWrapper>
    </FormContainer>
  );
};

export default CreateNewPass;
