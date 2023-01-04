import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";
import useAuth from "../../hooks/useAuth";
import * as C from "../../pages/Clients/styles";
import { useClient } from "../../contexts/clients";
import { toast } from "react-hot-toast";

export default function BasicTable(clients: any) {
  const { user }: any = useAuth();
  const { getClients }: any = useClient();
  const [currentClient, setCurrentClient] = useState<any>();
  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cpf, setCpf] = useState("");

  const openModal = (client: any) => {
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
    setCpf(client.cpf);
    setModal(true);
    setCurrentClient(client);
  };

  const handleUpdate = async (
    currenClient: any,
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf: string,
  ) => {
    await api
      .patch(
        `client/${currenClient._id}`,
        { name, email, phone, address, cpf },
        {
          headers: {
            Authorization:
              JSON.parse(localStorage.getItem("user-info")!)?.token ??
              user.token,
          },
        },
      )
      .then(() => toast.success("Cliente atualizado!"))
      .catch(() => toast.error("Algo deu errado!"));
    setModal(false);
    getClients();
  };

  const handleDelete = async (currenClient: any) => {
    await api
      .delete(`client/${currenClient._id}`, {
        headers: {
          Authorization:
            JSON.parse(localStorage.getItem("user-info")!)?.token ?? user.token,
        },
      })
      .then(() => toast.success("Cliente deleteado!"))
      .catch(() => toast.error("Algo deu errado!"));
    getClients();
    setCurrentClient(undefined);
  };

  return (
    <>
      {modal && (
        <C.ContainerModal>
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={() => setModal(false)}>
                  &times;
                </span>
                <h2>Editar dados do usuário</h2>
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
                      handleUpdate(
                        currentClient,
                        name,
                        email,
                        phone,
                        address,
                        cpf,
                      )
                    }
                  >
                    Atualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </C.ContainerModal>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Endereço</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.clients.map((client: any) => (
              <TableRow
                key={client._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell align="right">{client.email}</TableCell>
                <TableCell align="right">{client.phone}</TableCell>
                <TableCell align="right">{client.address}</TableCell>
                <TableCell align="right">{client.cpf}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleDelete(client)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => openModal(client)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
