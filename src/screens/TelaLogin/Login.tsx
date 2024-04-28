import {} from "react";
import "./Login.css";

function Login() {
    return (
        <>
            <body>
                <header>
                    <img src="" />
                </header>
                <form className="login-form">
                    <label>
                        <input
                            className="input"
                            type="text"
                            placeholder=""
                            required
                        />
                        <span>Conta</span>
                    </label>
                    <label>
                        <input
                            className="input"
                            type="text"
                            placeholder=""
                            required
                        />
                        <span>Agência</span>
                    </label>
                    <button className="submit">Entrar</button>
                </form>
            </body>
        </>
    );
}

export default Login;
