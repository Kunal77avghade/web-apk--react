import "./App.css";
import { Table } from "./Table";
import { LogoIcon } from "./logo";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {
    padding: "20px",
    textAlign: "center",
    background: "#CCECDC",
    color: "white",
    fontSize: "30px",
  };
  return (
    <>
      <div style={style}>
        <LogoIcon />
      </div>
      <h1>Invoice details</h1>
    </>
  );
}

function Footer() {
  const style = {
    padding: "20px",
    textAlign: "center",
    background: "#CCECDC",
    color: "white",
    fontSize: "30px",
  };

  return (
    <div style={style}>
      <h4> &copy; Checkr</h4>
    </div>
  );
}
