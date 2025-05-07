// ----- QR CODE GENERATION -----
function generateQRCode(data) {
  const qrCodeContainer = document.getElementById("qrcode");
  if (!qrCodeContainer) return;

  qrCodeContainer.innerHTML = ""; // Clear previous QR
  new QRCode(qrCodeContainer, {
    text: data,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  showModal(`QR Code generated for registration.`);
}

// ----- MODAL LOGIC -----
function showModal(message) {
  const modal = document.getElementById("modal");
  const modalMsg = document.getElementById("modal-msg");
  if (!modal || !modalMsg) return;

  modalMsg.innerText = message;
  modal.style.display = "block";

  document.getElementById("modal-close").onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };
}

// ----- FORM EVENT BINDING -----
function attachFormEvents() {
  const regForm = document.getElementById("registerForm");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const branch = document.getElementById("branch").value;
      const year = document.getElementById("year").value;
      const enrollment = document.getElementById("enrollment").value;
      const contact = document.getElementById("contact").value;

      const qrData = `Name: ${name}\nBranch: ${branch}\nYear: ${year}\nEnrollment No: ${enrollment}\nContact: ${contact}`;
      generateQRCode(qrData);
      showModal("Registration Successful! Your QR code is generated.");
      regForm.reset();
    });
  }

  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showModal("Thank you for your feedback!");
      feedbackForm.reset();
    });
  }

  const downloadBtn = document.getElementById("downloadQR");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      const qrCanvas = document.querySelector("#qrcode canvas");
      if (!qrCanvas) {
        alert("Generate QR code first!");
        return;
      }

      const image = qrCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

      const link = document.createElement('a');
      link.download = `registration_qr_${Date.now()}.png`;
      link.href = image;
      link.click();
    });
  }
}

// ----- PAGE LOADER -----
function loadPage(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-content").innerHTML = data;
      window.scrollTo(0, 0);
      attachFormEvents();
    })
    .catch((error) => {
      document.getElementById("main-content").innerHTML = "<p>Error loading content.</p>";
      console.error("Error loading page:", error);
    });
}

// ----- COMBINED WINDOW.LOAD -----
window.onload = function () {
  loadPage("home.html"); // Default content
  attachFormEvents();    // Attach form listeners if static
};
