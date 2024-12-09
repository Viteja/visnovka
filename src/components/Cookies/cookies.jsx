import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "./cookies.css";

const CookieConsent = () => {
  const [consentGiven, setConsentGiven] = useState(!!Cookies.get("cookieConsent"));

  const giveCookieConsent = () => {
    Cookies.set("cookieConsent", "true", { expires: 7, path: "/" });
    setConsentGiven(true);
  };

  useEffect(() => {
    setConsentGiven(!!Cookies.get("cookieConsent"));
  }, []);

  return (
    <div className="modal cookie-consent">
      <div className="modal-content" style={{ display: consentGiven ? "none" : "block" }} data-aos="fade-left">
        <h3>
          Web používá k chodu, personalizaci reklam a analýze návštěvnosti{" "}
          <a href="https://policies.google.com/technologies/cookies?hl=cs" target="_blank">
            cookies.
          </a>{" "}
          <br />
          Prohlížením stránek souhlasíte s jejich používáním.
        </h3>
        <button id="button" onClick={giveCookieConsent}>
          Akceptovat
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
