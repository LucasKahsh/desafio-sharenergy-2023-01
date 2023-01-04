import { useEffect, useState } from "react";
import Input from "../../components/Input";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const Signin = () => {
  const { signin }: any = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/home");
    }
  });

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(email, senha, isChecked);

    if (await res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <C.Content>
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            LOGIN NA SHARENERGY
          </Typography>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e: any) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e: any) => [setSenha(e.target.value), setError("")]}
          />
          <FormControlLabel
            sx={{ marginLeft: 0.25 }}
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={isChecked}
                onChange={handleOnChange}
              />
            }
            label="Remember me"
          />
          <C.labelError>{error}</C.labelError>
          <Button
            sx={{
              m: 2,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 2,
              paddingBottom: 2,
            }}
            variant="contained"
            onClick={handleLogin}
          >
            ENTRAR
          </Button>
        </C.Content>
      </Grid>
    </Grid>
  );
};

export default Signin;
