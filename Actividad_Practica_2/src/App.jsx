import { useState } from "react";
import "./App.css";

function App() {

    const [count,setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <>
            <section className="container">
                <h1>Contador {count}</h1>
                <button onClick={handleClick}>+</button>
            </section>
        </>
    );
}

export default App;
