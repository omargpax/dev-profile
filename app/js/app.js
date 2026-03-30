const boxtyp = document.getElementById("greeting");
const msRun = document.getElementById("ms-run");
const about = document.getElementById("ab-me");
const ws = document.getElementById("end-ms");

const typing = (text, tiempo, etiqueta) => {
  let arrayCaracteres = text.split("");
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
});

$(".custom-close").click(function () {
  $(".custom-social-proof").stop().slideToggle("slow");
});


const handleFormSubmission = (name, correo, sms) => {
  if (!sms.trim()) {
    notificationPopup("¡Empty content!", "fa-solid fa-circle-info", "#febd45b6");
    return;
  }

  if (!name || !correo || !sms) {
    notificationPopup("¡Fill in the boxes!", "fa-solid fa-circle-info", "#febd45b6");
    return;
  }

  if (!validateEmail(correo)) {
    notificationPopup("¡Email is invalid!", "fa-regular fa-circle-xmark", "#fe615d");
    return;
  }
  return true;
};
const validateEmail = (email) => {
  const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return validEmailRegex.test(email);
};

$("#sendMail").click(function (event) {
  event.preventDefault();
  (function(){
    emailjs.init("JwNbapieVosMBoJTQ"); // Account public key
  })();
  let  name = document.getElementById("name").value, 
  correo = document.getElementById("email").value, 
  sms = document.getElementById("message").value;
  if (!handleFormSubmission(name, correo, sms)) { return; }// verify content
  var senderParams = {
    sendername: document.querySelector("#name").value,
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
  emailjs.send(serviceID,ownTemplate, ownParams).then(function(response){
    console.log("Email sent successfully");
    notificationPopup(
      "Email sent successfully",
      "fa-regular fa-circle-check",
      "#01c94ecb"
    );
  }, function(error){
    console.log("Error sending email");
    notificationPopup("¡Something wrong!", "fa-regular fa-circle-xmark", "#fe615d");
  });
  emailjs.send(serviceID,senderTemplate, senderParams);
  document.getElementById("form-email").reset();
});



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

//modal
document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('.modal-overlay').style.display = 'none';
});
