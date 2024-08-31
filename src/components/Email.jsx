import React, { useState } from 'react';
import Textbox from './Textbox';
import Button from './Button';
import { useForgetpasswordMutation } from '../redux/slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const FormContainer = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
  animation: ${fadeIn} 1s ease-in;
`;

const Heading = styled.p`
  color: #1d4ed8;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  color: #4b5563;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const DisableLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 12px;
  color: #d1d5db;
  cursor: not-allowed;
`;

const ActiveLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 12px;
  color: #1d4ed8;
  text-decoration: underline;
  &:hover {
    color: #2563eb;
  }
`;

const Popup = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${popIn} 0.3s ease-out;
`;

const Email = ({ userData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP sent status
  const [forgetPasswords, { isLoading }] = useForgetpasswordMutation();
  const dispatch = useDispatch();

  const handleOnSubmit = async (data) => {
    try {
      const result = await forgetPasswords({ email: data.email }).unwrap();
      if (userData && userData._id === result.user.email) {
        dispatch(setCredentials({ ...result.user }));
      }
      setIsOtpSent(true); // Set state to true when OTP is successfully sent
      setShowPopup(true);
      toast.success('OTP sent to your email successfully');
    } catch (error) {
      toast.error('Email not Registered');
    }
  };

  return (
    <>
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <FormContainer onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
              <Heading>Enter your valid Email</Heading>
              <SubText>OTP will be sent to the valid Email</SubText>
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Enter your Email"
                type="email"
                name="email"
                label="email"
                className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
                register={register("email", { required: "Email is required!" })}
                error={errors.email ? errors.email.message : ""}
              />
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  type='submit'
                  className='w-full h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  label='Submit'
                  disabled={isLoading} // Disable button while loading
                />
              )}
              {isOtpSent ? (
                <ActiveLink to={"/otp"}>Enter OTP</ActiveLink>
              ) : (
                <DisableLink to="#">Enter OTP</DisableLink>
              )}
            </div>
          </FormContainer>
          {showPopup && (
            <Popup>
              <PopupContent>
                <p>OTP Sent Successfully!</p>
                <Button
                  label='Close'
                  className='popup-button mt-4 w-full bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  onClick={() => setShowPopup(false)}
                />
              </PopupContent>
            </Popup>
          )}
        </div>
      </div>
    </>
  );
};

export default Email;
