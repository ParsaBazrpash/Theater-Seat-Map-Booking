const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const totalSeatsDisplay = document.getElementById("total-seats");
const totalPriceDisplay = document.getElementById("total-price");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  // Update total seats display
  totalSeatsDisplay.innerText = selectedSeatsCount;

  // Update total price display
  totalPriceDisplay.innerText = selectedSeatsCount * ticketPrice;

  // Save data to local storage and set movie data
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("sold")
  ) {
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
