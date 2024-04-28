import DespositoESaqueCompoente from "../../components/DepositoESaqueComponente";
import Header from "../../components/Header";

export default function Saque() {
    return (
        <>
            <Header />
            <DespositoESaqueCompoente deposito={false} />
        </>
    );
}
