import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (emailRef.current && passwordRef.current) {
                const { data: { user }, error } = await signIn({ email: emailRef.current?.value ?? "", password: passwordRef.current.value });
                if (error) { throw error; }
                if (user) { navigate("/user"); }
            } else {
                setErrorMsg("Please enter email and password");
            }
        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            <div>SignIn</div>
            <input type="email" ref={emailRef} placeholder="Email" required/>
            <input type="password" ref={passwordRef} placeholder="Password" required/>
            <button disabled={loading} onClick={handleSubmit}>Sign In</button>
        </>
    )
}
