/* eslint-disable */
import "./sideBar.css";
import usuarioSemFoto from "../../assets/usuariosemfoto.devbank.png";
import axios from "axios";
import { useQuery } from "react-query";
import TelaCarregamento from "../../screens/TelaCarregamento";

type UserData = {
    name: string;
    agency: string;
    account: string;
    current_balance: number;
};

export const SideBar = (): JSX.Element => {
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
            <div className="box">
                <div className="side-bar">
                    <div className="overlap-group">
                        <div className="overlap">
                            {dataArray?.map((info, index) => (
                                <div
                                    key={"infoUser" + index}
                                    className="text-wrapper"
                                >
                                    {info.name}
                                </div>
                            ))}
                            <div className="CPF-XXX-XXX-XXX-XX">
                                CPF:&nbsp;&nbsp;XXX.XXX.XXX-XX
                            </div>
                            <img
                                className="imglogo"
                                alt="Imglogo"
                                src="/logo_ntv.png"
                            />
                        </div>
                        <button
                            className="div"
                            style={{
                                backgroundColor: "transparent",
                                borderWidth: 0,
                                cursor: "pointer"
                            }}
                            onClick={() => (window.location.href = "/")}
                        >
                            SAIR
                        </button>
                        <img
                            className="usuariosemfoto"
                            alt="Usuariosemfoto"
                            src={usuarioSemFoto}
                        />
                        {dataArray?.map((info, index) => (
                            <div
                                key={"infoAg" + index}
                                className="text-ag-user"
                            >
                                Ag {info.agency}
                            </div>
                        ))}
                        {dataArray?.map((info, index) => (
                            <div
                                key={"infoAccount" + index}
                                className="text-cc-user"
                            >
                                Cc {info.account}
                            </div>
                        ))}
                        <div className="text-welcome">Bem-vindo(a)!</div>
                    </div>
                </div>
            </div>
        </>
    );
};
/* eslint-enable */
