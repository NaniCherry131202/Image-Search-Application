function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
}

function displayFavorites() {
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        alert("Please log in to see your favorites.");
        return;
    }

    const userFavoritesKey = `favorites_${loggedInUser}`;
    const userFavorites =
        JSON.parse(localStorage.getItem(userFavoritesKey)) || [];

    const gallery = document.getElementById("favorites-gallery");
    gallery.innerHTML = "";

    if (userFavorites.length === 0) {
        gallery.innerHTML = "<p>No favorites to display.</p>";
        return;
    }

    userFavorites.forEach((favorite, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "favorite-card");

        const image = document.createElement("img");
        image.src = favorite.url;
        image.alt = favorite.alt || "Favorite Image";
        image.classList.add("card-img-top");
        image.addEventListener("click", () => openModal(favorite, index));

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = favorite.alt || "Favorite Image";

        const viewButton = document.createElement("button");
        viewButton.textContent = "View Image";
        viewButton.classList.add("btn", "btn-primary");
        viewButton.addEventListener("click", () =>
            openModal(favorite, index)
        );

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(viewButton);
        card.appendChild(image);
        card.appendChild(cardBody);

        gallery.appendChild(card);
    });
}

function openModal(favorite, index) {
    const modalImage = document.getElementById("modalImage");
    modalImage.src = favorite.url;
    document.getElementById("imageModal").dataset.index = index;
    const modal = new bootstrap.Modal(
        document.getElementById("imageModal")
    );
    modal.show();
}

document.getElementById("downloadBtn").addEventListener("click", () => {
    const modalImage = document.getElementById("modalImage");
    const imageUrl = modalImage.src;

    // Fetch the image blob and trigger download with FileSaver.js
    fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            saveAs(blob, "favorite-image.jpg"); // FileSaver.js function
        })
        .catch((error) => console.error("Download error:", error));
});

document
    .getElementById("removeFavoriteBtn")
    .addEventListener("click", () => {
        const loggedInUser = getLoggedInUser();
        const userFavoritesKey = `favorites_${loggedInUser}`;
        const userFavorites =
            JSON.parse(localStorage.getItem(userFavoritesKey)) || [];
        const index = document.getElementById("imageModal").dataset.index;

        userFavorites.splice(index, 1);
        localStorage.setItem(userFavoritesKey, JSON.stringify(userFavorites));

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("imageModal")
        );
        modal.hide();

        displayFavorites();
    });

window.onload = displayFavorites;
let popupContainer = document.getElementById("popupContainer");

function openPopup() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "search.html"; // Redirect to search page
    } else {
        popupContainer.classList.add("open-popup"); // Show the popup for login
    }
}

// Close the popup
function closePopup() {
    popupContainer.classList.remove("open-popup");
}
// Function to open the review popup
function openReviewPopup() {
    document.getElementById("reviewPopup").style.display = "block";
    resetStarRating(); // Reset stars
}

// Function to reset the star rating
function resetStarRating() {
    const stars = document.querySelectorAll("#starRating .star");
    stars.forEach((star) => {
        star.classList.remove("filled"); // Remove filled class
    });
    document.getElementById("reviewText").value = ""; // Clear the textarea
    document.getElementById("thankYouMessage").style.display = "none"; // Hide thank you message
}

// Add event listeners to stars for rating
const stars = document.querySelectorAll("#starRating .star");
stars.forEach((star) => {
    star.addEventListener("click", () => {
        const ratingValue = star.getAttribute("data-value");
        fillStars(ratingValue);
    });
});

// Function to fill stars based on rating
function fillStars(rating) {
    stars.forEach((star) => {
        if (star.getAttribute("data-value") <= rating) {
            star.classList.add("filled");
        } else {
            star.classList.remove("filled");
        }
    });
}

// Function to submit the review
function submitReview() {
    const reviewText = document.getElementById("reviewText").value;
    const stars = document.querySelectorAll("#starRating .star");
    let rating = 0;

    // Get the rating value based on filled stars
    stars.forEach((star) => {
        if (star.classList.contains("filled")) {
            rating = star.getAttribute("data-value");
        }
    });

    // Check if the user has submitted a rating and review
    if (rating > 0 && reviewText.trim() !== "") {
        // Hide stars and text area
        document.getElementById("starRating").style.display = "none";
        document.getElementById("reviewText").style.display = "none";
        document.getElementById("submitReview").style.display = "none";

        // Show thank you message
        document.getElementById("thankYouMessage").style.display = "block";
    } else {
        alert("Please provide a rating and a review."); // Optional: Alert if fields are empty
    }
}

// Function to close thank you message
function closeThankYou() {
    closeReviewPopup(); // Close the review popup
    resetStarRating(); // Reset stars for next review
}

// Function to close the review popup
function closeReviewPopup() {
    document.getElementById("reviewPopup").style.display = "none";
}