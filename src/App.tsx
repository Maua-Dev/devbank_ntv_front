import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaHome from "./screens/TelaHome/Home";
import TelaConta from "./screens/TelaConta/Conta";
import Deposito from "./screens/TelaDeposito/Deposito.tsx";
import Saque from "./screens/TelaSaque/Saque.tsx";
import Transacoes from "./screens/TelaTransacoes/Transacoes.tsx";
import Erro404 from "./screens/TelaErro404/Erro404.tsx";
import { queryClient } from "./services/queryClient.ts";
import { QueryClientProvider } from "react-query";

export default function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path={"*"} element={<Erro404 />}></Route>
                    <Route path={"/"} element={<TelaHome />}></Route>
                    <Route path={"/Conta"} element={<TelaConta />}></Route>
                    <Route path={"/Deposito"} element={<Deposito />}></Route>
                    <Route path={"/Saque"} element={<Saque />}></Route>
                    <Route
                        path={"/Transacoes"}
                        element={<Transacoes />}
                    ></Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}
