const socialPlatforms = [
  { name: "Instagram", icon: "fab fa-instagram", color: "#E4405F", prefix: "@" },
  { name: "X (Twitter)", icon: "fab fa-x-twitter", color: "#1DA1F2", prefix: "@" },
  { name: "GitHub", icon: "fab fa-github", color: "#fff", prefix: "" },
  { name: "LinkedIn", icon: "fab fa-linkedin", color: "#0A66C2", prefix: "in/" },
  { name: "YouTube", icon: "fab fa-youtube", color: "#FF0000", prefix: "@" }
];

function toggleEdit() {
  const modal = document.getElementById("edit-modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";

  if (modal.style.display === "flex") {
    loadCurrentData();
    renderSocialInputs();
  }
}

function loadCurrentData() {
  document.getElementById("edit-name").value = document.getElementById("name").textContent;
  document.getElementById("edit-bio").value = document.getElementById("bio").textContent;
  document.getElementById("edit-img").value = document.getElementById("profile-img").src;
}

function renderSocialInputs() {
  const container = document.getElementById("social-inputs");
  container.innerHTML = "";

  socialPlatforms.forEach(platform => {
    const currentLink = [...document.querySelectorAll(".social-btn")].find(btn => 
      btn.dataset.platform === platform.name
    );
    const currentUsername = currentLink ? currentLink.querySelector("span").textContent : "";

    const div = document.createElement("div");
    div.style.margin = "12px 0";
    div.innerHTML = `
      <label style="display:block; margin-bottom:6px; opacity:0.8;">${platform.name}</label>
      <div style="display:flex; gap:8px;">
        <input type="text" placeholder="${platform.prefix}kullaniciadi" 
               value="${currentUsername.replace(platform.prefix, '')}" 
               data-platform="${platform.name}" 
               style="flex:1;" />
        <a href="https://www.${platform.name.toLowerCase().replace('x (twitter)', 'x')}.com/${platform.prefix}${currentUsername.replace(platform.prefix, '')}" 
           target="_blank" 
           style="color:${platform.color}; text-decoration:none; padding:8px;">
          <i class="${platform.icon}"></i>
        </a>
      </div>
    `;
    container.appendChild(div);
  });
}

function saveChanges() {
  // İsim & Bio & Foto
  const newName = document.getElementById("edit-name").value.trim() || "Adın Soyadın";
  const newBio = document.getElementById("edit-bio").value.trim() || "Kısa bir tanıtım yazısı...";
  const newImg = document.getElementById("edit-img").value.trim() || "https://via.placeholder.com/150";

  document.getElementById("name").textContent = newName;
  document.getElementById("bio").textContent = newBio;
  document.getElementById("profile-img").src = newImg;

  // Sosyal linkler
  document.querySelectorAll("#social-inputs input").forEach(input => {
    const platform = input.dataset.platform;
    const username = input.value.trim();
    const btn = [...document.querySelectorAll(".social-btn")].find(b => b.dataset.platform === platform);
    const plat = socialPlatforms.find(p => p.name === platform);

    if (username) {
      btn.querySelector("span").textContent = plat.prefix + username;
      btn.href = `https://www.${platform.toLowerCase().replace('x (twitter)', 'x')}.com/${plat.prefix}${username}`;
    } else {
      btn.querySelector("span").textContent = plat.prefix + "kullaniciadi";
      btn.href = "#";
    }
  });

  toggleEdit();
}

// İlk yüklemede modalı gizle
document.getElementById("edit-modal").style.display = "none";