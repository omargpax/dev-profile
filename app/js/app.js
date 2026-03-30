/* ============================================================
   OMARGPAX PORTFOLIO — app.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ──────────────────────────────────────────────────────────
     1. TERMINAL TYPING ANIMATION
  ────────────────────────────────────────────────────────── */
  const type = (el, text, delay = 50) => {
    if (!el) return;
    el.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i >= text.length) { clearInterval(timer); return; }
      el.textContent += text[i++];
    }, delay);
  };

  type(document.getElementById("ms-run"),  "Running...", 50);
  type(document.getElementById("ab-me"),   "About me:", 50);
  type(
    document.getElementById("greeting"),
    "I'm Omar, developer and designer with experience creating websites and mobile applications. I specialize in Java, JavaScript, C# and have professional experience working with microservices.",
    30
  );
  type(document.getElementById("end-ms"), "¡Welcome to my world! ☕", 40);


  /* ──────────────────────────────────────────────────────────
     2. IMAGE SLIDER
  ────────────────────────────────────────────────────────── */
  const slides = document.querySelectorAll(".detect-view");
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      slides.forEach((s) => s.classList.remove("active"));
      slide.classList.add("active");
    });

    /* Keyboard accessibility */
    slide.setAttribute("tabindex", "0");
    slide.setAttribute("role", "button");
    slide.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        slide.click();
      }
    });
  });


  /* ──────────────────────────────────────────────────────────
     3. MODAL
  ────────────────────────────────────────────────────────── */
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.getElementById("close-modal");

  const closeModal = () => {
    if (modalOverlay) modalOverlay.style.display = "none";
  };

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  /* Close on backdrop click */
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  /* Close on Escape key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });


  /* ──────────────────────────────────────────────────────────
     4. TOAST NOTIFICATION
  ────────────────────────────────────────────────────────── */
  const toast      = document.getElementById("toast");
  const toastIcon  = document.getElementById("toast-icon");
  const toastMsg   = document.getElementById("toast-message");
  let toastTimer   = null;

  const showToast = (message, iconClass = "fa-regular fa-circle-check", color = "#01c94ecb") => {
    if (!toast) return;

    toastMsg.textContent     = message;
    toastIcon.className      = iconClass;
    toastIcon.style.color    = color;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
  };


  /* ──────────────────────────────────────────────────────────
     5. CONTACT FORM — EmailJS
  ────────────────────────────────────────────────────────── */
  const validateEmail = (email) => {
    return /^\w+([.\-_+]?\w+)*@\w+([.\-]?\w+)*(\.\w{2,10})+$/.test(email);
  };

  const sendBtn = document.getElementById("sendMail");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const name    = (document.getElementById("name")?.value    ?? "").trim();
      const email   = (document.getElementById("email")?.value   ?? "").trim();
      const message = (document.getElementById("message")?.value ?? "").trim();

      /* Validation */
      if (!name || !email || !message) {
        showToast("¡Fill in all boxes!", "fa-solid fa-circle-info", "#febd45b6");
        return;
      }
      if (!validateEmail(email)) {
        showToast("¡Email is invalid!", "fa-regular fa-circle-xmark", "#fe615d");
        return;
      }
      if (message.length < 30) {
        showToast("Message is too short (min 30 chars)", "fa-solid fa-circle-info", "#febd45b6");
        return;
      }

      /* Init EmailJS */
      emailjs.init("JwNbapieVosMBoJTQ");

      const SERVICE_ID         = "service_omargpx";
      const TEMPLATE_SENDER    = "template_aa0bvkd";  // Reply to sender
      const TEMPLATE_OWN       = "template_xirusui";  // Copy to omargpax

      const ownParams = {
        sendername: name,
        to:         "omarguerreropusma@gmail.com",
        subject:    "Dev contact",
        replyto:    email,
        message:    message,
      };
      const senderParams = {
        sendername: name,
        to:         email,
        subject:    "Dev contact",
        replyto:    "omarguerreropusma@gmail.com",
        message:    "",
      };

      sendBtn.disabled        = true;
      sendBtn.textContent     = "Sending…";

      Promise.all([
        emailjs.send(SERVICE_ID, TEMPLATE_OWN,    ownParams),
        emailjs.send(SERVICE_ID, TEMPLATE_SENDER, senderParams),
      ])
        .then(() => {
          showToast("Email sent successfully ✓", "fa-regular fa-circle-check", "#01c94ecb");
          document.getElementById("form-email")?.querySelectorAll("input, textarea")
            .forEach((el) => (el.value = ""));
        })
        .catch(() => {
          showToast("¡Something went wrong!", "fa-regular fa-circle-xmark", "#fe615d");
        })
        .finally(() => {
          sendBtn.disabled    = false;
          sendBtn.textContent = "Send";
        });
    });
  }


  /* ──────────────────────────────────────────────────────────
     6. LIVE CLOCK
  ────────────────────────────────────────────────────────── */
  const updateClock = () => {
    const now     = new Date();
    let   h       = now.getHours();
    const m       = now.getMinutes();
    const s       = now.getSeconds();
    const isPM    = h >= 12;
    h             = h % 12 || 12;

    const pad = (n) => String(n).padStart(2, "0");

    const elHour   = document.getElementById("hour");
    const elMin    = document.getElementById("minute");
    const elSec    = document.getElementById("seconds");
    const elTime   = document.getElementById("time");

    if (elHour)  elHour.textContent  = pad(h);
    if (elMin)   elMin.textContent   = pad(m);
    if (elSec)   elSec.textContent   = pad(s);
    if (elTime)  elTime.textContent  = isPM ? "PM" : "AM";
  };

  updateClock();
  setInterval(updateClock, 1000);

});
