/* eslint-disable */
import "./styles.css";
import leftarrow from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";

interface TituloProps {
    deposito?: boolean;
    texto?: string;
}

export default function Titulo({ deposito, texto }: TituloProps) {
    return (
        <>
            <div className="segundoConteinerOperacoes">
                <Link className="backButton" to="/Conta">
                    <img src={leftarrow} alt="image"></img>
                </Link>
                {deposito != null ? (
                    <h1 className="tituloDaTela">
                        {deposito ? "Depósito" : "Saque"}
                    </h1>
                ) : (
                    <h1 className="tituloDaTela">{texto}</h1>
                )}
            </div>
        </>
    );
}
/* eslint-enable */
