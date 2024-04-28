import "./Erro404.css";
import warning from "../../assets/warning.png";

export default function Erro404() {
    return (
        <div className="divErro404">
            <h1 className="h1Erro404">Erro 404</h1>
            <img src={warning as string} alt="warning image"></img>
            <p className="pErro404">Página não encontrada.</p>
        </div>
    );
}
