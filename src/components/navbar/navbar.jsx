import { useState } from "react";
import "./navbar.css";
export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);

  const scrollToId = (elementId, offset = 105) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Získání pozice prvku vzhledem k dokumentu
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
    <nav>
      <div className="container">
        <div className="navbar">
          <div className="navLogo">
            <a onClick={() => scrollToId("home")}>
              <img src="/img/main_logo.webp" className="logo" alt="Víšňovka logo" />
            </a>
          </div>
          <div className="navMenu">
            <ul className={isOpen ? "show" : "hide"}>
              <li>
                <a onClick={() => scrollToId("home")}>HOME</a>
              </li>
              <li>
                <a onClick={() => scrollToId("project")}>PROJEKT</a>
              </li>
              <li>
                <a onClick={() => scrollToId("free_spaces")}>VOLNÉ PROSTORY</a>
              </li>
              <li>
                <a onClick={() => scrollToId("gallery")}>GALERIE</a>
              </li>
              <li>
                <a onClick={() => scrollToId("contact")}>KONTAKT</a>
              </li>
            </ul>
          </div>
          {!isOpen ? <i className="fa-solid fa-bars nav-changer" onClick={() => setisOpen(true)}></i> : <i className="fa-solid fa-xmark nav-changer" onClick={() => setisOpen(false)}></i>}
        </div>
      </div>
    </nav>
  );
}
