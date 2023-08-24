import Footer from "../Component/Footer";
import VendorForm from "../Component/Form";
import Header from "../Component/Header";
import axios from "axios";

function SendMail() {
  const style = {
    width: "80%",
    margin: "10%",
    marginTop: "3rem",
  };

  async function sendmailtovendor(mail) {
    try {
      const data = await axios.post("http://localhost:5000/sendmail", {
        ...mail,
        subject: "remainder",
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    console.log(mail);
  }

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Send mail to vendor</h1>
      <div style={style}>
        <VendorForm onSubmit={sendmailtovendor} />
      </div>
      <Footer />
    </div>
  );
}

export default SendMail;
