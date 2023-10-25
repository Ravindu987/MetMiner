import React from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {

    const navigate = useNavigate();

    const hanldeAllButton = () => {
        navigate("/all");
    }

    const handleMetaphorsButton = () => {
        navigate("/metaphors");
    }


    return (
    <div className="App">
        <h1>Welcome</h1>
        <button onClick={hanldeAllButton}>All</button>
        <button onClick={handleMetaphorsButton}>Metaphors</button>
    </div>
    )

}
