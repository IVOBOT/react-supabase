import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/public/Home';
import SignIn from './pages/public/SignIn';
import User from './pages/private/User';

function App() {
    return (
        <div className='bg-neutral-800 text-neutral-100 w-full h-screen'>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route element={<ProtectedRoute redirectPath={"/"}/>}>
                    <Route path="/user" element={<User/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
