import { LogoIcon } from "../logo";

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

export default Header;
