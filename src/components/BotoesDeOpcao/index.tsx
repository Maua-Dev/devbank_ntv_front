import "./styles.css";
import { Link } from "react-router-dom";

export default function BotoesDeOpcao() {
    return (
        <div className="containerBotoesDeOpcao">
            <Link to={"/Deposito"}>
                <button className="botaoDeOpcao">Depósito</button>
            </Link>
            <Link to={"/Saque"}>
                <button className="botaoDeOpcao">Saque</button>
            </Link>
            <Link to={"/Transacoes"}>
                <button className="botaoDeOpcao">Transação</button>
            </Link>
        </div>
    );
}
