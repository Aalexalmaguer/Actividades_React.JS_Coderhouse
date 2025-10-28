import { useState } from "react";
import "./App.css";

function App() {

    const [user,setUser] = useState('Mary');

    const handleClick = () => {
        setUser('Albert')
    }

    return (
        <>
            <section className="container">
                <h1>Hello, {user}!</h1>
                <button onClick={handleClick}>Change Name</button>
            </section>
        </>
    );
}

export default App;
