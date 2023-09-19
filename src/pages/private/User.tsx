import React from 'react'
import { useAuth } from '../../context/AuthContext';

export default function User() {

    const { user } = useAuth();

    return (
        <div style={{ fontSize: "24px" }}>
            User <br/>
            You are logged in and your email address is {user?.email}
        </div>
    );
}
