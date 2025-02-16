// Popup Logic

let popupContainer = document.getElementById('popupContainer');
const toggleButton = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const authLink = document.getElementById('authLink');

toggleButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');

});

// Check login status on page load
document.addEventListener("DOMContentLoaded", function() {
    updateAuthLink();
});

// Open the popup based on login status
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

// Update the authentication link text based on login status
function updateAuthLink() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        authLink.textContent = "Logout";
    } else {
        authLink.textContent = "Login/Signup";
    }
}

// Handle authentication link click
function handleAuth() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        // Log out the user
        localStorage.setItem("isLoggedIn", "false");
        updateAuthLink(); // Update link text
        // Optionally, redirect to home page or perform other actions
        window.location.href = "index.html"; // Redirect to home page
    } else {
        // Redirect to signup page
        window.location.href = "signup.html";
    }
}

// Automatic Slideshow JavaScript
let slideIndex = 0;
const slides = document.querySelectorAll('.auto-slideshow img');

// Ensuring the first image is visible on load
slides[0].classList.add('active');

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === slideIndex) slide.classList.add('active');
    });

    slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlides, 3000);
// Function to open the review popup
function openReviewPopup() {
    document.getElementById('reviewPopup').style.display = 'block';
    resetStarRating(); // Reset stars
}

// Function to reset the star rating
function resetStarRating() {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach(star => {
        star.classList.remove('filled'); // Remove filled class
    });
    document.getElementById('reviewText').value = ''; // Clear the textarea
    document.getElementById('thankYouMessage').style.display = 'none'; // Hide thank you message
}

// Add event listeners to stars for rating
const stars = document.querySelectorAll('#starRating .star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const ratingValue = star.getAttribute('data-value');
        fillStars(ratingValue);
    });
});

// Function to fill stars based on rating
function fillStars(rating) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Function to submit the review
function submitReview() {
    const reviewText = document.getElementById('reviewText').value;
    const stars = document.querySelectorAll('#starRating .star');
    let rating = 0;

    // Get the rating value based on filled stars
    stars.forEach(star => {
        if (star.classList.contains('filled')) {
            rating = star.getAttribute('data-value');
        }
    });

    // Check if the user has submitted a rating and review
    if (rating > 0 && reviewText.trim() !== '') {
        // Hide stars and text area
        document.getElementById('starRating').style.display = 'none';
        document.getElementById('reviewText').style.display = 'none';
        document.getElementById('submitReview').style.display = 'none';

        // Show thank you message
        document.getElementById('thankYouMessage').style.display = 'block';
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
    document.getElementById('reviewPopup').style.display = 'none';
}
