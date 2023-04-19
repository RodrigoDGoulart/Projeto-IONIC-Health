import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, PaginaComHeader, PaginaNaoEncontrada, Tests } from "./pages";
import { useEffect } from "react";
import { useContexto } from "./context/contexto";
import Usuario from "./types/Usuario";
import HomeSolicitante from "./pages/HomeSolicitante";

export default function AppRouter() {

  const {usuario, setUsuario} = useContexto();

  useEffect(() => {
    if (sessionStorage.length !== 0) {
      // em sessionStorage, guardar id e senha
      // aqui, fazer requisição login com sessionstorage id e senha
      // se login der certo, salvar nome token e grupo no context
      // se não, redirecionar para login
      // fazer tudo isso depois que conectado com back-end
      const {nome, token, grupo} = sessionStorage;
      setUsuario(new Usuario(nome, token, grupo));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />

          {usuario && (
            <>
              {usuario.getGrupo() == 'solicitante' && (
                  <Route path='/home' element={<PaginaComHeader elemento={<HomeSolicitante />} />} />
              )}
              {usuario.getGrupo() == 'avaliador' && (
                <Route path='/home' element={<PaginaComHeader elemento={<span>avaliador</span>} />} />
              )}
              {usuario.getGrupo() == 'adm' && (
                <Route path='/home' element={<PaginaComHeader elemento={<span>adm</span>} />} />
              )}
              <Route path='/tests' element={<Tests />} />
            </>  
          )}

          <Route path='*' element={<PaginaNaoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}