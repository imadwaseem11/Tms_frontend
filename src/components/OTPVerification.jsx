import React, { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import Textbox from './Textbox';
import { useVerifyOTPMutation } from '../redux/slices/userApiSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loader from "../components/Loader";
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
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const FadeInText = styled.p`
  animation: ${fadeIn} 1s ease-in;
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
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${popIn} 0.3s ease-out;
  text-align: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  padding: 2rem; /* Padding to ensure content doesn't touch edges */
`;

const OTPVerification = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyOtp, { isLoading }] = useVerifyOTPMutation();
  const dispatch = useDispatch();

  const handleOnSubmit = async (data) => {
    try {
      const result = await verifyOtp({ otp: data.otp }).unwrap();
  
      if (result.status) {
        dispatch(setCredentials({ userId: result.userId }));
        setIsVerified(true);
        setShowPopup(true);
        toast.success('OTP verified successfully');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <CenteredContainer>
      <FormContainer
        onSubmit={handleSubmit(handleOnSubmit)}
        className="w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14 pb-14 rounded-lg shadow-lg"
      >
        <div>
          <FadeInText className='text-blue-600 text-3xl font-bold text-center mb-4'>
            Enter your OTP
          </FadeInText>
        </div>
        <div className="flex flex-col gap-y-5">
          <Textbox
            placeholder="Enter your OTP"
            type="text"
            name="otp"
            label="OTP"
            className='w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition'
            register={register("otp", { required: "OTP is required!" })}
            error={errors.otp ? errors.otp.message : ""}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              type='submit'
              className='w-full h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              label='Verify OTP'
              disabled={isLoading}
            />
          )}
          <Link
            to={"/newpass"}
            className={`email-otp-link ${!isVerified ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'} transition`}
            aria-disabled={!isVerified}
          >
            Create new password
          </Link>
        </div>
      </FormContainer>
      {showPopup && (
        <Popup>
          <PopupContent>
            <p className='text-lg font-semibold'>OTP Verified Successfully!</p>
            <Button
              label='Close'
              className='popup-button mt-4 w-full bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              onClick={() => setShowPopup(false)}
            />
          </PopupContent>
        </Popup>
      )}
    </CenteredContainer>
  );
};

export default OTPVerification;
