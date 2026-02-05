import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateCheck } from "../services/backendServices";

export const Private = () => {
  const navigate = useNavigate()
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const mensajes = [
    "👀 Ey… esto no es para todo el mundo",
    "🔒 Si estás aquí, algo hiciste bien (o muy mal)",
    "😏 Página privada desbloqueada",
    "🤫 No se lo digas a nadie",
    "🏆 Logro secreto: persona curiosa"
  ];

  const checkToken = async () => {
    const response = await privateCheck()
    if (response) {
      setUser(response)
      setLoading(false)
    }
    else {
      localStorage.removeItem("token")
      navigate("/")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setTimeout(() => {

        navigate("/")

      }, 5000)
    } else {
      checkToken()
    }


  }, [])

  if (loading) {
    return <>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem"
      }}>
        <strong role="status"><h1>Loading...</h1></strong>
        <div className="spinner-border text-primary" aria-hidden="true"></div>
      </div>
    </>
  }

  return (<>
    <div className="px-3 pt-3 text-end" style={{ background: "#111" }}>
      <button type="button" onClick={logout} className="btn btn-danger">Cerrar sesion</button>
    </div>
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#111",
      color: "#fff",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>{mensajes[clicks % mensajes.length]}</h1>

      <p style={{ opacity: 0.7 }}>
        Si estás leyendo esto, claramente no sigues el camino principal.
      </p>

      <button
        onClick={() => setClicks(clicks + 1)}
        style={{
          marginTop: "1.5rem",
          padding: "0.6rem 1.2rem",
          cursor: "pointer"
        }}
      >
        No pulses aquí
      </button>

      {clicks >= 7 && (
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.5 }}>
          Vale, ya puedes irte. Aquí no hay nada más.
        </p>
      )}
    </div>
  </>
  );
}
