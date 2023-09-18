import ContactMe from "../../components/contactMe/contactMe";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

function Contact() {
  return (
    <>
      <Navbar />
      <div>
        <ContactMe />
        <Footer />
      </div>
    </>
  );
}

export default Contact;
