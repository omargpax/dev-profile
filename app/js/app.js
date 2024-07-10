const boxtyp = document.getElementById("greeting");
const msRun = document.getElementById("ms-run");
const about = document.getElementById("ab-me");
const ws = document.getElementById("end-ms");

const typing = (text, tiempo, etiqueta) => {
  let arrayCaracteres = text.split("");
  console.log(arrayCaracteres);
  etiqueta.innerHTML = "";
  let i = 0;
  setInterval(() => {
    if (i === arrayCaracteres.length) {
      //stay
    } else {
      etiqueta.textContent += arrayCaracteres[i];
      i++;
    }
  }, tiempo);
}; 
typing("                                        Running...  ", 50, msRun);
typing(
  "                                                       About me:  ",
  50,
  about
);
typing(
  "                                                           I’m Omar, developer and designer with experience creating websites and mobile applications. I specialize in Java, JavaScript, C# and have professional experience working with microservices.  ",
  55,
  boxtyp
);
typing(
  "                                                                                                                                                                                                                                                                             ¡Welcome to my world! ☕  ",
  50,
  ws
);

$(".detect-view").click(function () {
  $(".detect-view").removeClass("active");
  $(this).addClass("active");
  console.log("hay");
});

$(".custom-close").click(function () {
  $(".custom-social-proof").stop().slideToggle("slow");
});

const validateEmail = (email) => {
  const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return validEmailRegex.test(email);
};


function sendMail(){
  (function(){
    emailjs.init("JwNbapieVosMBoJTQ"); // Account public key
  })();

  var senderParams = {
    sendername: "Omargpax dev",
    to: document.querySelector("#email").value,
    subject: "Dev contact",
    replyto: "omarguerreropusma@gmail.com",
    message: "",
  };

  var ownParams = {
    sendername: document.querySelector("#name").value,
    to: "omarguerreropusma@gmail.com",
    subject: "Dev contact",
    replyto: document.querySelector("#email").value,
    message: document.querySelector("#message").value,
  }

  var serviceID = "service_omargpx"; // email service id
  var senderTemplate = "template_aa0bvkd"; // reply to sender
  var ownTemplate = "template_xirusui"; // reply to omargpax

  emailjs.send(serviceID,ownTemplate, ownParams)
  .then( res => {
    console.log("replicated message")
  }).catch();

  emailjs.send(serviceID,senderTemplate, senderParams)
  .then( res => {
    notificationPopup(
      "Email sent successfully",
      "fa-regular fa-circle-check",
      "#01c94ecb"
    );
  }).catch();
}

function notificationPopup(message, icon, colorType) {
  $("#notification-message").text(message);
  $("#type-notification").removeAttr("class");
  $("#type-notification").attr("class", icon);
  $("#type-notification").css("color", colorType);
  setTimeout(() => {
    $(".custom-social-proof").stop().slideToggle("slow");
    setTimeout(() => {
      $(".custom-social-proof").stop().slideToggle("slow");
    }, 4000);
  }, 100);
}
