import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import Users from "../../components/Users";
import { useUser } from "../../contexts/user";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Home = () => {
  const { getUsers, getAllUsers, users, allUsers }: any = useUser();
  const [filtersUsers, setFiltersUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [inputSearch, setInputSearch] = useState<string>("");

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getUsers(page, perPage);
  }, [page, perPage]);

  const onOptionChangeHandler = (quanty: any) => {
    if (!quanty) {
      return;
    }
    setFiltersUsers([]);
    setPerPage(parseInt(quanty) + 1);
  };

  const nextPage = () => {
    setFiltersUsers([]);
    if (page < 40 / perPage - 1) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    setFiltersUsers([]);
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const handleClick = (inputSearch: string) => {
    const newList = allUsers.filter(
      (user: any) =>
        user.fullName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(inputSearch.toLowerCase()) ||
        user.username.toLowerCase().includes(inputSearch.toLowerCase()),
    );
    setFiltersUsers(newList);
  };

  return (
    <>
      {ResponsiveAppBar()}
      <Container sx={{ p: 5 }}>
        <h2>Usuário cadastrados no sitema</h2>
        <br />
        <Box sx={{ marginBottom: 5 }}>
          <Grid container spacing={4}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Filtro nome,user e email"
                variant="outlined"
                onChange={(e) => setInputSearch(e.target.value)}
                onKeyUp={() => handleClick(inputSearch)}
              />
            </Grid>
            <Grid item>
              <Button sx={{ m: 1 }} variant="contained" onClick={previousPage}>
                <KeyboardArrowLeftIcon /> ANTERIOR{" "}
              </Button>
              <Button sx={{ m: 1 }} variant="contained" onClick={nextPage}>
                PROXIMA <NavigateNextIcon />{" "}
              </Button>
            </Grid>
            <Grid item>
              <TextField
                defaultValue={10}
                label="Per page"
                inputProps={{ type: "number", min: 0 }}
                onChange={(e) =>
                  onOptionChangeHandler(parseInt(e.target.value))
                }
              />
            </Grid>
          </Grid>
        </Box>
        {filtersUsers.length > 0 && inputSearch.length > 0 ? (
          <Users usersList={filtersUsers} />
        ) : (
          <Users usersList={users} />
        )}
      </Container>
    </>
  );
};

export default Home;
