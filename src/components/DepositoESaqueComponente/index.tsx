/* eslint-disable */
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import "./styles.css";
import Titulo from "../Titulo";
import TelaCarregamento from "../../screens/TelaCarregamento";

interface DepositoESaqueCompoenteProps {
    deposito: boolean;
}

type UserData = {
    name: string;
    agency: string;
    account: string;
    current_balance: number;
};

let nota2 = 0,
    nota5 = 0,
    nota10 = 0,
    nota20 = 0,
    nota50 = 0,
    nota100 = 0,
    nota200 = 0,
    arrayLastNumber: number[] = [];

export default function DespositoESaqueCompoente({
    deposito
}: DepositoESaqueCompoenteProps) {
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
    const user_current_balance = dataArray.map(
        (user_data) => user_data.current_balance as number
    );

    const postTransaction = async (transactionData: object) => {
        return axios
            .post(
                `https://r2tcz6zsokynb72jb6o4ffd5nm0ryfyz.lambda-url.us-west-2.on.aws${
                    deposito ? "/deposit" : "/withdraw"
                }`,
                transactionData
            )
            .then((response) => {
                window.location.reload();
                return response.data as UserData;
            })
            .catch((error) => {
                if (error.response && error.status === 403)
                    deposito
                        ? alert("Depósito Suspeito")
                        : alert("Saldo insuficiente para transação");
                else if (error.response && error.status === 404)
                    alert("API não encontrada");
            });
    };
    /* eslint-disable */

    const [text, setText] = useState<string>("0");

    function showNumbersOnScreen(newText: string) {
        setText(newText);
    }

    const dadosDosBotoes = [
        {
            texto1: "2 R$",
            texto2: "5 R$",
            texto3: "10 R$"
        },
        {
            texto1: "20 R$",
            texto2: "50 R$",
            texto3: "100 R$"
        },
        {
            texto1: "200 R$",
            texto2: "CORRIGE",
            texto3: "CANCELA"
        }
    ];

    function clearAllNotas() {
        arrayLastNumber = [];
        nota2 = 0;
        nota5 = 0;
        nota10 = 0;
        nota20 = 0;
        nota50 = 0;
        nota100 = 0;
        nota200 = 0;
    }

    function NaNButtons(value: string) {
        if (value === "CONFIRMA") {
            const transactionData = {
                "2": nota2,
                "5": nota5,
                "10": nota10,
                "20": nota20,
                "50": nota50,
                "100": nota100,
                "200": nota200
            };
            void (async () => await postTransaction(transactionData))();
        } else if (value === "CORRIGE") {
            const lastNumber = arrayLastNumber[arrayLastNumber.length - 1];
            if (lastNumber === 2) nota2 = nota2 - 1;
            else if (lastNumber === 5) nota5 = nota5 - 1;
            else if (lastNumber === 10) nota10 = nota10 - 1;
            else if (lastNumber === 20) nota20 = nota20 - 1;
            else if (lastNumber === 50) nota50 = nota50 - 1;
            else if (lastNumber === 100) nota100 = nota100 - 1;
            else if (lastNumber === 200) nota200 = nota200 - 1;
            arrayLastNumber.pop();
            showNumbersOnScreen(calculateOperations().toString());
        } else if (value === "CANCELA") {
            clearAllNotas();
            showNumbersOnScreen(calculateOperations().toString());
        } else alert("Operação inválida");
    }

    function buttonClick(value: number | string) {
        if (value as number) arrayLastNumber.push(addNumber(value as number));
        else if (value as string) NaNButtons(value as string);
        showNumbersOnScreen(calculateOperations().toString());
    }

    function calculateOperations() {
        let calculateNewBalance =
            nota2 * 2 +
            nota5 * 5 +
            nota10 * 10 +
            nota20 * 20 +
            nota50 * 50 +
            nota100 * 100 +
            nota200 * 200;
        if (user_current_balance[0] === 0) {
            if (!deposito && user_current_balance[0] === 0) {
                clearAllNotas();
                calculateNewBalance = 0;
                console.log(user_current_balance[0]);
                console.log(calculateNewBalance);
                return calculateNewBalance;
            }
            return calculateNewBalance;
        } else if (!deposito && user_current_balance[0] > calculateNewBalance)
            return calculateNewBalance;
        else if (deposito) {
            if (calculateNewBalance * 2 >= user_current_balance[0]) {
                console.log(
                    calculateNewBalance +
                        " - " +
                        arrayLastNumber[0] +
                        " = " +
                        (calculateNewBalance - arrayLastNumber[0])
                );
                return calculateNewBalance;
            } else return calculateNewBalance;
        }
        return 0;
    }

    function addNumber(value: number) {
        if (value === 2) nota2 = nota2 + 1;
        else if (value === 5) nota5 = nota5 + 1;
        else if (value === 10) nota10 = nota10 + 1;
        else if (value === 20) nota20 = nota20 + 1;
        else if (value === 50) nota50 = nota50 + 1;
        else if (value === 100) nota100 = nota100 + 1;
        else if (value === 200) nota200 = nota200 + 1;
        else alert("Operação Inválida");
        return value;
    }

    return (
        <>
            {isFetching && <TelaCarregamento></TelaCarregamento>}
            <Titulo deposito={deposito} />
            <div className="telaCaixaEletronico">
                <div className="infoCaixaEletronico">
                    <h2>Saldo atual: R$ {user_current_balance[0]}</h2>
                </div>
                <h1>
                    {deposito ? "" : "-"}
                    {text} R$
                </h1>
            </div>
            <div className="divDasTeclas">
                <div style={{ marginBottom: "4px" }}>
                    {dadosDosBotoes.slice(0, 3).map((dadosDosBotao, index) => (
                        <button
                            key={"botão1 " + index}
                            onClick={() =>
                                buttonClick(parseInt(dadosDosBotao.texto1))
                            }
                            className={"atm-button"}
                            style={{
                                borderRadius: "10px",
                                borderWidth: 0,
                                textWrap: "wrap",
                                wordBreak: "break-all",
                                marginRight: "3px"
                            }}
                        >
                            {dadosDosBotao.texto1}
                        </button>
                    ))}
                </div>
                <div style={{ marginBottom: "4px" }}>
                    {dadosDosBotoes.slice(0, 2).map((dadosDosBotao, index) => (
                        <button
                            key={"botão2" + index}
                            onClick={() =>
                                buttonClick(parseInt(dadosDosBotao.texto2))
                            }
                            className={"atm-button"}
                            style={{
                                borderRadius: "10px",
                                borderWidth: 0,
                                textWrap: "wrap",
                                wordBreak: "break-all",
                                marginRight: "3px"
                            }}
                        >
                            {dadosDosBotao.texto2}
                        </button>
                    ))}
                    <button
                        onClick={() => NaNButtons("CORRIGE")}
                        className={"atm-button"}
                        style={{
                            background: "#FFD600",
                            borderRadius: "10px",
                            borderWidth: 0,
                            textWrap: "wrap",
                            wordBreak: "break-all",
                            marginRight: "3px"
                        }}
                    >
                        CORRIGE
                    </button>
                </div>
                <div style={{ marginBottom: "4px" }}>
                    {dadosDosBotoes.slice(0, 2).map((dadosDosBotao, index) => (
                        <button
                            key={"botão3 " + index}
                            onClick={() =>
                                buttonClick(parseInt(dadosDosBotao.texto3))
                            }
                            className={"atm-button"}
                            style={{
                                borderRadius: "10px",
                                borderWidth: 0,
                                textWrap: "wrap",
                                wordBreak: "break-all",
                                marginRight: "3px"
                            }}
                        >
                            {dadosDosBotao.texto3}
                        </button>
                    ))}
                    <button
                        onClick={() => NaNButtons("CANCELA")}
                        className={
                            "bg-danger atm-button rounded-3 border-0 text-wrap text-break ms-3"
                        }
                        style={{
                            background: "#FF6363",
                            borderRadius: "10px",
                            borderWidth: 0,
                            textWrap: "wrap",
                            wordBreak: "break-all",
                            marginRight: "3px"
                        }}
                    >
                        CANCELA
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => NaNButtons("CONFIRMA")}
                        className={"atm-button"}
                        style={{
                            backgroundColor: "#03A800",
                            borderRadius: "10px",
                            borderWidth: 0,
                            textWrap: "wrap",
                            wordBreak: "break-all",
                            marginRight: "3px"
                        }}
                    >
                        Confirma
                    </button>
                </div>
            </div>
        </>
    );
}
/* eslint-enable */
