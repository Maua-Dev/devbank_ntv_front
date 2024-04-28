import {} from "react";
import "./Conta.css";
import BotoesDeOpcao from "../../components/BotoesDeOpcao";
import { SideBar } from "../../components/SideBar";
import axios from "axios";
import { useQuery } from "react-query";
import TelaCarregamento from "../TelaCarregamento";

type UserData = {
    name: string;
    agency: string;
    account: string;
    current_balance: number;
};

export default function TelaConta() {
    const { data, isFetching } = useQuery<UserData>(
        "userDataAWS",
        async () => {
            const response = await axios.get(
                "https://r2tcz6zsokynb72jb6o4ffd5nm0ryfyz.lambda-url.us-west-2.on.aws"
            );
            return response.data as UserData;
        },
        {
            staleTime: 1000 * 60 // 1 minuto
        }
    );
    const dataArray: UserData[] = data ? [data] : [];
    return (
        <>
            {isFetching && <TelaCarregamento />}
            <SideBar></SideBar>
            <BotoesDeOpcao></BotoesDeOpcao>
            <div className="container-saldo-disponivel">
                <div className="text-saldo-disponivel">
                    {dataArray?.map((info, index) => (
                        <h1 key={"chave" + index}>
                            Saldo disponível:&emsp;R$ {info.current_balance}
                        </h1>
                    ))}
                </div>
            </div>
            <div className="container-central-atendimento">
                <div className="text-central-atendimento">
                    <h1>Central de atendimento:&emsp; 11 91104-4009</h1>
                </div>
            </div>
        </>
    );
}
