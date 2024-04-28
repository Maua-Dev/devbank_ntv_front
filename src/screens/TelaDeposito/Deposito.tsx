import {} from "react";
import Header from "../../components/Header";
import DespositoESaqueCompoente from "../../components/DepositoESaqueComponente";

export default function Deposito() {
    return (
        <div>
            <Header />
            <DespositoESaqueCompoente deposito={true} />
        </div>
    );
}
