import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import "./Transacoes.css";
import { useQuery } from "react-query";
import axios from "axios";
import TelaCarregamento from "../TelaCarregamento";

type HistoryData = {
    all_transactions: [
        {
            type: string;
            value: number;
            current_balance: string;
            timestamp: number;
        }
    ];
};

export default function Transacoes() {
    const { data, isFetching } = useQuery<HistoryData>(
        "historyDataAWS",
        async () => {
            const response = await axios.get(
                "https://r2tcz6zsokynb72jb6o4ffd5nm0ryfyz.lambda-url.us-west-2.on.aws/history"
            );
            return response.data as HistoryData;
        }
    );
    const dataArray: HistoryData[] = data ? [data] : [];

    return (
        <>
            {isFetching && <TelaCarregamento></TelaCarregamento>}{" "}
            {/* && é o and do python */}
            <Header></Header>
            <Titulo texto="Transações"></Titulo>
            <div
                style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    display: "flex",
                    marginBottom: "20px"
                }}
            >
                {dataArray.map((card, idx) => (
                    <div style={{ width: "100%" }} key={"diva2 " + idx}>
                        {card.all_transactions.map((transaction, index) => (
                            <div
                                key={"card " + index}
                                className="card"
                                style={{
                                    width: "95%",
                                    backgroundColor: "#003D7D",
                                    marginBottom: "10px",
                                    marginLeft: "10px"
                                }}
                            >
                                <div
                                    className="card-body"
                                    style={{
                                        flex: "1 1 auto",
                                        textAlign: "start",
                                        width: "75%"
                                    }}
                                >
                                    <div>
                                        <p
                                            className="card-text"
                                            style={{
                                                color: "white",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Tipo: {transaction.type} <br />
                                            Valor: {transaction.value} <br />
                                            Saldo: {
                                                transaction.current_balance
                                            }{" "}
                                            <br />
                                            Horário: {transaction.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
