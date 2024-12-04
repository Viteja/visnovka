import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar/navbar";
import { SlideshowLightbox } from "lightbox.js-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageComponent from "./components/imgPath/imgPath";
import ImageIcons from "./components/imgPath/imgIcons";

import "./App.css";

function App() {
  // FORMULÁŘ //
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

  const loadData = () => {
    fetch("https://designjj-test.eu/php/getprojekt.php", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch((err) => console.error("Chyba při načítání dat:", err));
  };

  useEffect(() => {
    loadData(); // Načítání dat při načtení komponenty
  }, []);

  const loadIcons = () => {
    fetch("https://designjj-test.eu/php/geticons.php", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setList2(data))
      .catch((err) => console.error("Chyba při načítání dat:", err));
  };

  useEffect(() => {
    loadIcons(); // Načítání dat při načtení komponenty
  }, []);

  useEffect(() => {
    AOS.init();
  });

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    if (formData.name === "" || formData.subject === "" || formData.message === "" || formData.email === "") {
      console.log(formData);
      return toast.error("Vyplňte všechny údaje");
    } else {
      axios.post("https://designjj-test.eu/php/mail.php", formData).then((res) => {
        console.log(res);
        scrollToId("contact");
        toast.success("Formulář byl odeslán");
      });
    }
  };

  // Funkce pro scrollování na určitou část stránky
  const scrollToId = (elementId, offset = 105) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Získání pozice prvku
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
      <Navbar />
      <section id="home">
        <div className="mainSection">
          <div className="phone font_9" data-aos="fade-left" data-aos-duration="600">
            <i className="fa-solid fa-phone"></i>
            <h5>Volejte 778 748 331</h5>
          </div>
          <div className="container">
            <div className="mainBlog" data-aos="fade-up" data-aos-duration="600">
              <h1>KANCELÁŘE, OBCHODY, DĚTSKÉ SKUPINY I RESTAURACE V JEDNÉ BUDOVĚ</h1>
              <h5>V říjnu 2021 začala stavba nového administrativního centra na rohu ulic S. K. Neumanna a Na Spravedlnosti v Pardubicích. Budova byla předána do užívání v červnu 2023.</h5>
              <div className="line"></div>
              <div className="button">
                <button>
                  <a onClick={() => scrollToId("project")}>VÍCE O PROJEKTU</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="project">
        <div className="container">
          <div className="aboutProject" data-aos="fade-up" data-aos-duration="600">
            <h1>O PROJEKTU</h1>
            <h2>Pokud máte zájem o moderní a funkční prostory pro vaše podnikání, je projekt VIŠŇOVKA ta správná volba.</h2>
            <div className="threeBlocks">
              {list.map((item) => (
                <div className="card" data-aos="fade-right" data-aos-duration="600" key={item.id}>
                  <div className="cardImg">
                    <ImageComponent id={item.id} />
                  </div>
                  <div className="cardContent">
                    <h3>{item.name}</h3>
                    <h4>{item.desc}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="free_spaces">
        <div className="freeSpaces" data-aos="fade-up" data-aos-duration="600">
          <img className="logo" src="/img/logo.webp" alt="" />
          <div className="container">
            <div className="mapContent">
              <h5>Nabízíme volné kancelářské a komerční prostory k pronájmu v přízemním a prvním podlaží budovy. Pro detailní pohled se, prosím, podívejte na vyznačené dispoziční plány níže.</h5>
              <SlideshowLightbox className="photomap">
                <img className="plan" src="/img/map.webp" alt="" />
              </SlideshowLightbox>
              <button>
                <a onClick={() => scrollToId("contact")}>DOMLUVTE SI SCHŮZKU A PROHLÍDKU</a>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="window">
        <div className="container">
          <div className="textWindow" data-aos="fade-right" data-aos-duration="600">
            <h2>DOSTUPNÁ LOKALITA</h2>
            <p>
              Administrativní centrum VIŠŇOVKA profituje ze skvělé polohy v docházkové vzdáleností do centra Pardubic. <br />
              <br />
              Maximálně 10 minut autem trvá cesta na vlakové nádraží i na mezinárodní letiště. Zastávka městské hromadné dopravy je v blízkosti budovy.
            </p>
          </div>
        </div>
      </div>
      <div className="threeIcons">
        <div className="container">
          <div className="iconContent">
            {list2.map((item2) => (
              <div className="icon" data-aos="fade-up" data-aos-duration="600" key={item2.id}>
                <ImageIcons id={item2.id} />
                <h3>{item2.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section id="gallery">
        <div className="gallery">
          <div className="container" data-aos="fade-up" data-aos-duration="600">
            <SlideshowLightbox className="photo">
              <img src="/img/gallery/img1.webp" alt="LDJFLSKDFLKSJlf" />
              <img src="/img/gallery/img2.webp" alt="" />
              <img src="/img/gallery/img3.webp" alt="" />
              <img src="/img/gallery/img4.webp" alt="" />
              <img src="/img/gallery/img5.webp" alt="" />
              <img src="/img/gallery/img6.webp" alt="" />
            </SlideshowLightbox>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="form" data-aos="fade-up" data-aos-duration="600">
          <div className="container">
            <h1>KONTAKTUJTE NÁS</h1>
            <div className="formCards">
              <div className="fCard1">
                <img className="logo" src="/img/logo.webp" alt="" />
                <div className="fText1">
                  <h2>Bohumil Černý</h2>
                  <h3>Obchodní manažer AC VIŠŇOVKA</h3>
                  <h4>
                    E-mail: bohumil.cerny@brp-service.com <br />
                    <a href="tel: 778748331">Tel: +420 778 748 331</a>
                  </h4>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.058175652144!2d15.775727676071792!3d50.029005717619775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470dcd3a04406375%3A0xcb72162255f15406!2zQUMgVmnFocWIb3ZrYQ!5e0!3m2!1sen!2sus!4v1731436142721!5m2!1sen!2sus"></iframe>
                </div>
              </div>
              <div className="fCard2">
                <form>
                  <input type="name" id="name" name="name" placeholder="Jméno" required value={formData.name} onChange={handleChange} />
                  <input type="email" id="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
                  <input type="subject" id="subject" name="subject" placeholder="Předmět zprávy" value={formData.subject} onChange={handleChange} />
                  <textarea id="message" name="message" placeholder="Zpráva" required value={formData.message} onChange={handleChange}></textarea>
                  <button onClick={handleSend}>Odeslat</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer">
            <div className="copyright">
              <p>© 2023 BRP Services s.r.o. Všechna práva vyhrazena.</p>
            </div>
            <div className="autor">
              <p>Vytvořil:</p>
              <a href="https://designjj.cz/" target="_blank">
                <img src="/img/designjj.png" alt="Designjj" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
