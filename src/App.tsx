import { useState } from "react";
import "./App.css";
import Home from "./screens/Home.tsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>🚀 Vite React Template 🚀</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <Home></Home>
            </div>
        </>
    );
}

export default App;
