import {} from "react";
import Header from "../../components/Header";
import "./Home.css";
import { useState } from "react";

export default function TelaHome() {
    const [url, setUrl] = useState("");

    /* eslint-disable */
    function handleUrl(event: any) {
        setUrl(event?.target.value);
    }

    function verificarTexto() {
        if (url === "") {
            alert("Este campo está vazio, por favor insira uma URL válida");
        } else if (url.startsWith("https://")) {
            window.location.href = "/Conta";
        } else {
            alert("URL inválida, por favor insira uma URL válida");
        }
    }

    /* eslint-enable */
    return (
        <>
            <Header></Header>
            <div className="formURL">
                <input
                    className="form-URL-input"
                    type="text"
                    onChange={handleUrl}
                    value={url}
                    placeholder="Coloque sua URL aqui:"
                    required
                />
            </div>
            <div className="containerBotaoEntrar">
                <button onClick={verificarTexto} className="botaoEntrar">
                    Entrar
                </button>
            </div>
        </>
    );
}
