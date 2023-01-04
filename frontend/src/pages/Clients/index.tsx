import React, { useEffect, useState } from "react";
import api from "../../api/api";
import * as C from "./styles";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { Container } from "@mui/system";
import BasicTable from "../../components/Tabble";
import { useClient } from "../../contexts/clients";
import useAuth from "../../hooks/useAuth";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";

const Clients = () => {
  const { user }: any = useAuth();
  const { clients, getClients }: any = useClient();

  const [name, setName] = useState("Nome do cliente");
  const [email, setEmail] = useState("Email do cliente");
  const [phone, setPhone] = useState("Telefone do cliente");
  const [address, setAddress] = useState("Endereço do cliente");
  const [cpf, setCpf] = useState("Cpf do cliente");

  const [modal, setModal] = useState(false);

  const addNewClientModal = () => {
    setModal(true);
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleCreate = (
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf: string,
  ) => {
    api
      .post(
        "client",
        { name, email, phone, address, cpf },
        {
          headers: {
            Authorization:
              JSON.parse(localStorage.getItem("user-info")!)?.token ??
              user.token,
          },
        },
      )
      .then(() => toast.success("Cliente criado!"))
      .catch(() => toast.error("Algo deu errado!"));
    getClients();
    setModal(false);
  };

  return (
    <>
      {ResponsiveAppBar()}
      <Box
        sx={{ p: 5 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button onClick={addNewClientModal} variant="contained" size="large">
          {" "}
          Cadastrar novo cliente{" "}
        </Button>
      </Box>
      {modal && (
        <C.ContainerModal>
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={() => setModal(false)}>
                  &times;
                </span>
                <h2>Criar novo usuário</h2>
              </div>
              <div className="modal-body">
                <div className="trocar">
                  <TextField
                    margin="dense"
                    label="Nome do cliente"
                    id="margin-none"
                    size="small"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="Email do cliente"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="Telefone do cliente"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="Endereço do cliente"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="CPF do cliente"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setCpf(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleCreate(name, email, phone, address, cpf)
                    }
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </C.ContainerModal>
      )}
      <Container fixed sx={{ p: 5 }}>
        {clients.length > 0 && <BasicTable clients={clients}></BasicTable>}
      </Container>
    </>
  );
};

export default Clients;
