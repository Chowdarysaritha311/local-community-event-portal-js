console.log("Welcome to the Community Portal");

window.onload = () => {
  alert("Page fully loaded");
  renderEvents();
  populateEventSelect();
};

// Event constructor
class Event {
  constructor(name, date, seats, category, location) {
    this.name = name;
    this.date = new Date(date);
    this.seats = seats;
    this.category = category;
    this.location = location;
  }

  checkAvailability() {
    return this.seats > 0 && this.date >= new Date();
  }
}

const events = [
  new Event("Music Fest", "2025-06-30", 50, "Music", "Park"),
  new Event("Baking Workshop", "2025-07-05", 0, "Workshop", "Community Center"),
  new Event("Art Expo", "2025-05-20", 30, "Exhibition", "Gallery"),
  new Event("Yoga Class", "2025-06-15", 10, "Health", "Studio"),
];

// Render event cards dynamically
function renderEvents(filterFn = null) {
  const section = document.getElementById("eventsSection");
  section.innerHTML = "";

  let filteredEvents = filterFn ? events.filter(filterFn) : events;

  filteredEvents.forEach(event => {
    if (!event.checkAvailability()) return;

    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date.toDateString()}</p>
      <p>Seats Available: ${event.seats}</p>
      <p>Category: ${event.category}</p>
      <p>Location: ${event.location}</p>
      <button onclick="registerUser('${event.name}')">Register</button>
    `;
    section.appendChild(card);
  });
}

// Populate event select dropdown
function populateEventSelect() {
  const select = document.getElementById("eventSelect");
  select.innerHTML = "";

  events.forEach(event => {
    if(event.checkAvailability()) {
      const option = document.createElement("option");
      option.value = event.name;
      option.textContent = event.name;
      select.appendChild(option);
    }
  });
}

// Register user for an event
function registerUser(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found");
    if (!event.checkAvailability()) throw new Error("No seats available or event expired");

    event.seats--;
    alert(`You have successfully registered for ${eventName}`);
    renderEvents();
    populateEventSelect();
  } catch (error) {
    alert("Registration failed: " + error.message);
  }
}

// Form submission handling
document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const eventName = form.elements["event"].value;

  if (!name || !email || !eventName) {
    document.getElementById("formMessage").textContent = "Please fill all fields.";
    return;
  }

  registerUser(eventName);

  form.reset();
  document.getElementById("formMessage").textContent = "Registration successful!";
});
