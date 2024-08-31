import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import { Toaster } from "sonner";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import UserRegistration from "./pages/UserRegistration";
// import ResetPassword from "./components/ResetPassword";
import Email from "./components/Email";
import OTPVerification from "./components/OTPVerification";
import CreateNewPass from "./components/CreateNewPass";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex">
      <div className="w-1/5 h-full bg-white hidden md:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="flex-1 flex flex-col">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex-1 overflow-y-auto p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-transform duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      {(ref) => (
        <div
          ref={ref}
          className={clsx(
            "md:hidden fixed inset-0 bg-black/40 z-50",
            isSidebarOpen ? "block" : "hidden"
          )}
          onClick={closeSidebar}
        >
          <div
            className="bg-white w-3/4 h-full fixed right-0 top-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end px-5 mt-5">
              <button
                onClick={closeSidebar}
                className="flex items-center p-2"
              >
                <IoClose size={25} />
              </button>
            </div>
            <div className="mt-10">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

function App({userId}) {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
        <Route path="/email" element={<Email/>}></Route>
        <Route path="/otp" element={<OTPVerification userId={userId}/>}></Route>
        {/* <Route path="/resetpassword" element={<ResetPassword/>}></Route> */}
        <Route path="/registration" element={<UserRegistration/>}></Route>
        <Route path="/newpass" element={<CreateNewPass/>}></Route>
       
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
