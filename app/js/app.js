const boxtyp = document.getElementById("greeting");
const msRun = document.getElementById("ms-run");
const about = document.getElementById("ab-me");
const ws = document.getElementById("end-ms");

$(".detect-view").click(function () {
  $(".detect-view").removeClass("active");
  $(this).addClass("active");
  console.log("hay");
});

$(".custom-close").click(function () {
  $(".custom-social-proof").stop().slideToggle("slow");
});

$("#sendMail").click(function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value,
    correo = document.getElementById("email").value,
    sms = document.getElementById("message").value;

  if (name == "" || correo == "" || sms == "") {
    notificationPopup(
      "¡Fill in the boxes!",
      "fa-solid fa-circle-info",
      "#febd45b6"
    );
  } else {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(correo)) {
      notificationPopup(
        "¡Email is invalid!",
        "fa-regular fa-circle-xmark",
        "#fe615d"
      );
    } else {
      document.getElementById("form-email").reset();
      notificationPopup(
        "Email sent successfully",
        "fa-regular fa-circle-check",
        "#01c94ecb"
      );
      replyEmail(name, correo);
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "omarguerreropusma@gmail.com",
        Password: "2C55137944439ACA83EEDC119CB2AFBC48B2",
        To: "omarguerreropusma@gmail.com",
        From: "omarguerreropusma@gmail.com",
        Subject: "from: omargpx.dev - " + name,
        Body: `<table role="presentation" border="0" width="100%">
            <tr>
            <td bgcolor="#EAF0F6" align="left" style="padding: 10px 10px;">
                      <p style="margin:0 0 12px 0;font-size:12px;line-height:24px;font-family:Arial">
                      <b>Nombre: ${name}</b>
                      <br>
                      <b>Correo: </b> ${correo}
                      <br>
                      <b>Mensaje: </b> ${sms}
                      </td>
                      </tr>
                      </table>`,
      }).then((message) => console.log(message));
      console.log("end . . . ");
    }
  }
});

function replyEmail(name, correo) {
  console.log("reply:", correo, name);
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "omarguerreropusma@gmail.com",
    Password: "2C55137944439ACA83EEDC119CB2AFBC48B2",
    To: correo,
    From: "omarguerreropusma@gmail.com",
    Subject: "from: omargpx.dev",
    Body: `<div style="width:600px;margin: auto;background:white;">    
    <table role="presentation" border="0" width="100%" cellspacing="0">
    <tr>
      <td align="center" style="color: #021623;">
        <img alt="logo" src="https://api.smtprelay.co/userfile/98f3ae14-09b0-4541-9cfe-9ada97c4fad4/dv.png" width="200px">
        <h2 style="font-size: 42px; margin:1rem 0 0 0; font-family:Arial;">¡Hello, ${name}!</h2>
      </tr>
        </td>
    </table>
  
    <table role="presentation" border="0" width="100%" cellspacing="0">
       <tr>
         <td style="padding: 30px 30px 30px 60px;">
           <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif; text-align:justify;">I'm glad you found my personal website and thank you for contacting me. I will reply to your message as soon as I see it.<br><br>
           I would love for you to leave your review below about your experience or the flaws you found in the portfolio. Would you help contribute to my career as a developer?</p>
           <p style="margin:0 0 12px 0;font-size:12px;line-height:20px;font-family:Arial,sans-serif; background:#eeeff4; padding:.5rem 1rem; border-radius:10px;text-align:justify; font-style: italic;">
           Me alegro que haya encontrado mi sitio web personal y gracias por ponerse en contacto conmigo. Responderé a su mensaje tan pronto como lo vea. <br>
           Tmabien, me encantaría que dejaras tu reseña a continuación sobre tu experiencia o las fallas que encontraste en el portafolio. ¿Ayudarías a contribuir a mi carrera como desarrollador?
           </p>
             <p style="margin:0;font-size:16px;line-height:24px;font-family:Avenir;"><a href="#"
           </td> 
      </tr>
    </table>
  
    <table role="presentation" border="0" width="100%">
        <tr>
          <td bgcolor="#EAF0F6" align="left" style="padding: 10px 10px;">
            <p style="margin:0 0 12px 0;font-size:12px;line-height:24px;font-family:Arial">
            If you want to give a small contribution, you are welcome. Or you can also cancel messages from this channel by clicking below.
            <br>
            Thanks for your support. you're the best</p>
            <a href="www.google.com" style="text-decoration: underline; font-weight: bold; color: #253342;  font-family:Avenir;"> Support</a>
            </td>
            </tr>
    </table>
    
    <table role="presentation" border="0" width="100%" cellspacing="0">
        <tr>
            <td bgcolor="#F5F8FA" style="padding: 30px 30px;">
              <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color: #99ACC2; font-family:Avenir"> omargpx.dev </p>
              <a href="https://17a11.trk.elasticemail.com/tracking/unsubscribe?d=bbwUdJO6ilC8oo4FDdJSH4a6q4QKaJXnmtLpd2cSvWjIEP9aFkJWqxmL8abqpIG088frErMT1jR-Ahg0u_Hl1OgW2STTuVWyC0J_AMI7Uiny0" style="font-size: 9px; text-transform:uppercase; letter-spacing: 1px; color: #99ACC2;  font-family:Avenir;"> Unsubscribe </a>      
            </td>
            </tr>
        </table> 
  </div>`,
  }).then((message) => console.log(message));
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
