import React from 'react'
import { useNavigate } from 'react-router';

export const Navigate = () => {
    const navigate = useNavigate();
    navigate("/Login");
}
