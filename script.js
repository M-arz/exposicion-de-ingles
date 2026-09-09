const works = [
  {
    roman: "I",
    icon: "🎨",
    kind: "PAINTING",
    title: "Guernica",
    image: "img/img1.jpg",
    fields: [
      ["Artist", "Pablo Picasso"],
      ["Materials", "Oil on canvas"],
      ["Date", "1937"],
      ["Location", "Madrid, Spain — Museo Reina Sofía"],
      ["Movement", "Cubism / anti-war art"],
    ],
    sentences: [
      "<b>Guernica</b> was painted by Pablo Picasso in 1937.",
      "It was created in response to the bombing of the town of Guernica during the Spanish Civil War.",
      "The painting has been exhibited in several countries and is now considered one of the most powerful anti-war statements in art history.",
    ],
    note: "Show the image, then explain the historical event behind it before reading any label details. Visitors often ask why the painting has no color — have an answer ready.",
  },
  {
    roman: "II",
    icon: "🗿",
    kind: "SCULPTURE",
    title: "Monument to Cervantes",
    image: "img/img2.jpg",
    fields: [
      ["Artist", "Lorenzo Coullaut Valera"],
      ["Materials", "Bronze and stone"],
      ["Date", "1925–1957"],
      ["Location", "Plaza de España, Madrid"],
      ["Movement", "Literary monument"],
    ],
    sentences: [
      "This monument was designed by the sculptor Lorenzo Coullaut Valera.",
      "It was built to honor Miguel de Cervantes and his characters, Don Quixote and Sancho Panza.",
      "The monument was finished decades after the sculptor's death and is visited by thousands of tourists every year.",
    ],
    note: "Point out the two bronze figures at the base — most visitors recognize them before they recognize the author's statue above.",
  },
  {
    roman: "III",
    icon: "📖",
    kind: "BOOK",
    title: "Don Quixote de la Mancha",
    image: "img/img3.jpg",
    fields: [
      ["Author", "Miguel de Cervantes"],
      ["Materials", "Printed paper, novel"],
      ["Date", "1605 / 1615"],
      ["Origin", "Spain"],
      ["Movement", "Spanish Golden Age (Siglo de Oro)"],
    ],
    sentences: [
      "Don Quixote was written by Miguel de Cervantes in the early 17th century.",
      "It is considered the first modern novel and has been translated into more languages than almost any other book.",
      "The story was influenced by medieval chivalry tales, which it playfully satirizes.",
    ],
    note: "Keep a one-line plot summary ready — who Don Quixote is and why he thinks he's a knight — for visitors unfamiliar with the story.",
  },
  {
    roman: "IV",
    icon: "🎵",
    kind: "MUSIC",
    title: "Concierto de Aranjuez",
    image: "img/img4.jpg",
    fields: [
      ["Composer", "Joaquín Rodrigo"],
      ["Materials", "Guitar and orchestra"],
      ["Date", "1939"],
      ["Origin", "Spain"],
      ["Movement", "Neoclassical / Spanish nationalist music"],
    ],
    sentences: [
      "This concerto was composed by Joaquín Rodrigo in 1939.",
      "It was inspired by the gardens of the Royal Palace of Aranjuez.",
      "The piece is still performed by orchestras around the world and is considered a symbol of Spanish classical music.",
    ],
    note: "If possible, play a short clip of the second movement — it's the most recognizable part and gives visitors an anchor.",
  },
  {
    roman: "V",
    icon: "🏛️",
    kind: "BUILDING",
    title: "Sagrada Família",
    image: "img/img5.jpg",
    fields: [
      ["Architect", "Antoni Gaudí"],
      ["Materials", "Stone, reinforced concrete"],
      ["Date", "Begun 1882 — still unfinished"],
      ["Location", "Barcelona, Spain"],
      ["Movement", "Catalan Modernism"],
    ],
    sentences: [
      "The Sagrada Família was designed by the architect Antoni Gaudí.",
      "It was declared a UNESCO World Heritage Site in 2005.",
      "Construction has not been finished yet, more than a century after it began.",
    ],
    note: "This is a strong closing work — mention the ongoing construction to bridge naturally into the exhibition's connecting theme.",
  },
];

const roomsEl = document.getElementById("rooms");
const wayEl = document.getElementById("wayfinding");

works.forEach((w, i) => {
  const id = "room-" + (i + 1);

  // wayfinding dot
  const dot = document.createElement("div");
  dot.className = "way-dot";
  dot.textContent = w.roman;
  dot.title = w.title;
  dot.addEventListener("click", () => document.getElementById(id).scrollIntoView({behavior:"smooth"}));
  wayEl.appendChild(dot);

  const section = document.createElement("section");
  section.className = "room";
  section.id = id;
  section.dataset.room = id;

  section.innerHTML = `
    <div class="room-visual">
      <div class="spotlight"></div>
      <div>
        <div class="room-index">ROOM ${w.roman}</div>
        <label class="upload-zone" tabindex="0">
          <div class="prompt">
            <span class="icon">${w.icon}</span>
            <div class="title">Add a photo of<br>${w.title}</div>
            <div class="sub">Click to upload your own image<br>(visible only in this browser tab)</div>
          </div>
          <input type="file" accept="image/*">
        </label>
      </div>
    </div>
    <div class="room-content">
      <span class="kind-tag">${w.kind}</span>
      <h2>${w.title}</h2>
      <dl class="plaque">
        ${w.fields.map(([k,v]) => `<div class="field"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
      </dl>
      <div class="voice-guide">
        <div class="heading">SAY IT WITH PASSIVE VOICE</div>
        <ul>
          ${w.sentences.map(s => `<li>${s}</li>`).join("")}
        </ul>
        <details class="guide-note">
          <summary>Guide tip</summary>
          <p>${w.note}</p>
        </details>
      </div>
    </div>
  `;

  roomsEl.appendChild(section);

  const fileInput = section.querySelector('input[type="file"]');
  const zone = section.querySelector(".upload-zone");
  zone.innerHTML = `<img src="${w.image}" alt="${w.title}"><input type="file" accept="image/*">`;

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      zone.innerHTML = `<img src="${ev.target.result}" alt="${w.title}">`;
      zone.appendChild(fileInput);
    };
    reader.readAsDataURL(file);
  });
});

// active wayfinding highlight
const allSections = [...document.querySelectorAll(".room"), document.getElementById("connection")];
const dots = [...wayEl.querySelectorAll(".way-dot")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = allSections.indexOf(entry.target);
      dots.forEach(d => d.classList.remove("active"));
      if (idx >= 0 && idx < dots.length) dots[idx].classList.add("active");
    }
  });
}, { threshold: 0.5 });
allSections.forEach(s => observer.observe(s));
