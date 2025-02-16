document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Signup error elements
    const signupNameErr = document.getElementById('signupNameErr');
    const signupEmailErr = document.getElementById('signupEmailErr');
    const signupPasswordErr = document.getElementById('signupPasswordErr');

    // Login error elements
    const loginEmailErr = document.getElementById('loginEmailErr');
    const loginPasswordErr = document.getElementById('loginPasswordErr');

    // Switch to register form
    registerLink.onclick = () => {
        clearErrors();
        wrapper.classList.add('active');
    };

    // Switch back to login form
    loginLink.onclick = () => {
        clearErrors();
        wrapper.classList.remove('active');
    };

    // Signup form submission
    signupForm.onsubmit = (event) => {
        event.preventDefault();
        clearErrors();
        const signupUsername = document.getElementById('signupUsername').value;
        const signupEmail = document.getElementById('signupEmail').value;
        const signupPassword = document.getElementById('signupPassword').value;

        if (validateSignup(signupUsername, signupEmail, signupPassword)) {
            const userDetails = {
                username: signupUsername,
                email: signupEmail,
                password: signupPassword
            };

            // Retrieve existing users array from localStorage or create a new one
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user with the same email or username already exists
            const userExists = users.some(user => user.username === signupUsername || user.email === signupEmail);
            if (userExists) {
                alert("Username or email already registered.");
                return;
            }

            // Add the new user and save back to localStorage
            users.push(userDetails);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Signup successful! You can now log in.');
            wrapper.classList.remove('active');  // Switch to login form
        }  
    };

    // Login form submission
    loginForm.onsubmit = (event) => {
        event.preventDefault();
        clearErrors();
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (validateLogin(loginEmail, loginPassword)) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            // Assuming login is successful:
           
            


            const user = users.find(user => user.email === loginEmail && user.password === loginPassword);
            if (user) {
                localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedInUser", user.username);
                window.location.href="Search.html"
            } else {
                alert('Invalid Email or Password!');
            }
        }
    };

    // Clear error messages
    function clearErrors() {
        signupNameErr.textContent = '';
        signupEmailErr.textContent = '';
        signupPasswordErr.textContent = '';
        loginEmailErr.textContent = '';
        loginPasswordErr.textContent = '';
    }

    // Validation for signup form
    function validateSignup(username, email, password) {
        let isValidate = true;

        if (username == '') {
            signupNameErr.textContent = "Enter your name";
            isValidate = false;
        } else if (!nameValidation(username)) {
            signupNameErr.textContent = 'Your name should contain only letters';
            isValidate = false;
        } else {
            signupNameErr.textContent = "";
        }

        if (password == '') {
            signupPasswordErr.textContent = 'Enter Your Password';
            isValidate = false;
        } else if (password.length < 8) {
            signupPasswordErr.textContent = "Your password length should be greater than 8";
            isValidate = false;
        } else if (!capitalLetter(password)) {
            signupPasswordErr.textContent = "Your password must contain at least one capital letter";
            isValidate = false;
        } else if (!specialChar(password)) {
            signupPasswordErr.textContent = "Your password must contain one special character";
            isValidate = false;
        } else {
            signupPasswordErr.textContent = '';
        }

        if (email == '') {
            signupEmailErr.textContent = "Enter your Email";
            isValidate = false;
        } else if (!emailValidation(email)) {
            signupEmailErr.textContent = "Your email format should contain @";
            isValidate = false;
        } else {
            signupEmailErr.textContent = "";
        }
        return isValidate;
    }

    // Validation for login form
    function validateLogin(email, password) {
        let isValidate = true;

        if (email == '') {
            loginEmailErr.textContent = "Enter your Email";
            isValidate = false;
        } else if (!emailValidation(email)) {
            loginEmailErr.textContent = "Your email format should contain @";
            isValidate = false;
        } else {
            loginEmailErr.textContent = "";
        }
        
        if (password == '') {
            loginPasswordErr.textContent = 'Enter Your Password';
            isValidate = false;
        } else if (password.length < 8) {
            loginPasswordErr.textContent = "Your password length should be greater than 8";
            isValidate = false;
        } else if (!capitalLetter(password)) {
            loginPasswordErr.textContent = "Your password must contain at least one capital letter";
            isValidate = false;
        } else if (!specialChar(password)) {
            loginPasswordErr.textContent = "Your password must contain one special character";
            isValidate = false;
        } else {
            loginPasswordErr.textContent = '';
        }

        return isValidate;
    }

    // Helper functions for validation
    function emailValidation(email) {
        var result = /\S+@\S+\.\S+/;
        return result.test(email);
    }

    function capitalLetter(password) {
        var result = /[A-Z]/;
        return result.test(password);
    }

    function specialChar(password) {
        var result = /[!@#$%^&*()_+]/;
        return result.test(password);
    }

    function nameValidation(username) {
        var result = /^[a-zA-Z\s]+$/;
        return result.test(username);
    }
});
let popupContainer = document.getElementById('popupContainer');

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

