import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homemain from './Main/Homemain';
import UserRegister from './LoginRegisterPages/UserRegister';
import AdminRegister from './LoginRegisterPages/AdminRegister';
import ServiceProviderRegister from './LoginRegisterPages/ServiceProviderRegister';
import AdminLogin from './LoginRegisterPages/AdminLogin';
import ServiceProviderLogin from './LoginRegisterPages/ServiceProviderLogin';
import UserLogin from './LoginRegisterPages/UserLogin';
import ForgotPasswordUser from './LoginRegisterPages/ForgetpasswordUser';
import ForgotPasswordServiceProvider from './LoginRegisterPages/ForgetPaawordSeviceProvider';
import Addservice from './servicerProvider/Addservice';
import Showservice from './servicerProvider/Showservice';
import ShowserviceDetails from './servicerProvider/ShowserviceDetails';
import Service from './components/Service';
import Descriptionservice from './components/Descriptionservice';
import UserBooking from './components/UserBooking';
import UserProfile from './components/UserProfile';
import ContactUspage from './components/ContactUspage';
import ExploreService from './components/ExploreService';
import ServiceProviderBooking from './components/ServiceProviderBooking';
import ProfileServiceProvider from './components/ProfileServiceProvider';
import Dashboard from './components/Dashboard';
import NotFoundPage from './components/Notfoundpage';
import About from './components/About';
import './App.css'
function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Homemain/>}/>
        <Route path='/users/register/' element={<UserRegister/>}/>
        <Route path='/serviceprovider/register/' element={<ServiceProviderRegister/>}/>
        <Route path='/admin/register/' element={<AdminRegister />}/>
        <Route path='/users/login/' element={<UserLogin/>}/>
        <Route path='/serviceprovider/login/' element={<ServiceProviderLogin/>}/>
        <Route path='/admin/login/' element={<AdminLogin />}/>
        <Route path='/users/forget-password/' element={<ForgotPasswordUser />}/>
        <Route path='/service-provider/forget-password/' element={<ForgotPasswordServiceProvider />}/>
        <Route path='/add-service/' element={<Addservice/>}/>
        <Route path='/serviceprovider/service' element={<Showservice/>} />
        <Route path='/serviceprovider/service/:id' element={<ShowserviceDetails/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/service/:id' element={<Descriptionservice/>}/>
        <Route path='/booking' element={<UserBooking/>}/>
        <Route path='/users/profile' element={<UserProfile/>}/>
        <Route path='/contact-us' element={<ContactUspage/>}/>
        <Route path='/explore-service' element={<ExploreService/>}/>
        <Route path='/serviceprovider/booking' element={<ServiceProviderBooking/>}/>
        <Route path='/serviceprovider/profile' element={<ProfileServiceProvider/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      
      </Routes>
    
  );
}

export default App;
