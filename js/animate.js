	// Modal functionality
	const modal = document.getElementById("joinModal");
	const joinButtons = document.querySelectorAll(".join-now");
	const closeBtn = document.querySelector(".close-btn");
	const toggleLink = document.getElementById("toggleAuth");
	const modalTitle = document.getElementById("modalTitle");
	const submitBtn = document.getElementById("submitBtn");
	const authForm = document.getElementById("authForm");
	const nameInput = document.getElementById("name");
	const genderSelect = document.getElementById("gender");
	const emailInput = document.getElementById("email");
	const passwordInput = document.getElementById("password");
	const packageSelect = document.getElementById("package");

	// Initialize users array from localStorage or create an empty one
	let users = JSON.parse(localStorage.getItem("users")) || [];

	// Open modal when "Join Now" is clicked
	joinButtons.forEach(button => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			modal.style.display = "block";
		});
	});

	// Close modal when close button is clicked
	closeBtn.addEventListener("click", () => {
		modal.style.display = "none";
	});

	// Close modal when clicking outside of it
	window.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.style.display = "none";
		}
	});

	// Toggle between Register and Login
	let isRegister = true;

	// Function to switch to login mode
	function switchToLogin() {
		isRegister = false;
		modalTitle.textContent = "Login to Focus Fitness";
		submitBtn.textContent = "Login";
		toggleLink.textContent = "Need an account? Register here";
		nameInput.style.display = "none";
		genderSelect.style.display = "none";
		packageSelect.style.display = "none";
		authForm.reset();
	}

	toggleLink.addEventListener("click", () => {
		isRegister = !isRegister;
		if (isRegister) {
			modalTitle.textContent = "Register for Focus Fitness";
			submitBtn.textContent = "Register";
			toggleLink.textContent = "Already have an account? Login here";
			nameInput.style.display = "block";
			genderSelect.style.display = "block";
			packageSelect.style.display = "block";
			authForm.reset();
		} else {
			switchToLogin();
		}
	});

	// Form submission logic with empty input validation
	authForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = nameInput.value.trim();
		const gender = genderSelect.value;
		const email = emailInput.value.trim();
		const password = passwordInput.value.trim();
		const package = packageSelect.value;

		// Validation for both Register and Login
		if (isRegister) {
			// Check all fields for registration
			if (!name) {
				alert("Full Name cannot be empty");
				return;
			}
			if (!gender) {
				alert("Please select a gender");
				return;
			}
			if (!email) {
				alert("Email cannot be empty");
				return;
			}
			if (!password) {
				alert("Password cannot be empty");
				return;
			}
			if (!package) {
				alert("Please select a membership package");
				return;
			}

			// Check if email already exists
			const userExists = users.find(user => user.email === email);
			if (userExists) {
				alert("This email is already registered. Please log in or use a different email.");
				return;
			}

			// Store new user details
			const newUser = {
				name: name,
				gender: gender,
				email: email,
				password: password,
				package: package
			};
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
			alert(`Registration successful!\nName: ${name}\nGender: ${gender}\nEmail: ${email}\nPackage: ₦${package}\nPlease log in to continue.`);
			switchToLogin();
		} else {
			// Check email and password for login
			if (!email) {
				alert("Email cannot be empty");
				return;
			}
			if (!password) {
				alert("Password cannot be empty");
				return;
			}

			// Login: Check if details are correct
			const user = users.find(user => user.email === email);
			if (!user) {
				alert("Invalid email or username");
				return;
			}

			// Compare passwords
			if (user.password !== password) {
				console.log("yay"); // Passwords are different
				alert("Invalid password");
				return;
			} else {
				console.log("okk"); // Passwords are the same
				alert(`Login successful!\nWelcome back, ${user.name}!\nPackage: ₦${user.package}`);
				modal.style.display = "none";
				authForm.reset();
				window.location.href = "slider.html";
			}
		}
	});

/*==========================================================================================*/  



document.addEventListener("DOMContentLoaded", function () {
    
    document.querySelectorAll(".ham-burger, .nav ul li a").forEach(function (element) {
        element.addEventListener("click", function () {
            document.querySelector(".nav").classList.toggle("open");
            document.querySelector(".ham-burger").classList.toggle("active");
        });
    });

    document.querySelectorAll(".accordian-container").forEach(function (accordion) {
        accordion.addEventListener("click", function () {
            document.querySelectorAll(".accordian-container .body").forEach(function (body) {
                body.style.display = "none";
            });
            document.querySelectorAll(".accordian-container").forEach(function (item) {
                item.classList.remove("active");
                item.querySelector(".head span").classList.remove("fa-angle-down");
                item.querySelector(".head span").classList.add("fa-angle-up");
            });
            
            this.querySelector(".body").style.display = "block";
            this.classList.add("active");
            this.querySelector(".head span").classList.remove("fa-angle-up");
            this.querySelector(".head span").classList.add("fa-angle-down");
        });
    });
    
    document.querySelectorAll(".nav ul li a, .go-down").forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                var target = document.querySelector(hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: "smooth"
                    });
                    window.location.hash = hash;
                    
                    document.querySelectorAll(".nav ul li a").forEach(function (navLink) {
                        navLink.classList.remove("active");
                    });
                    this.classList.add("active");
                }
            }
        });
    });
});


/*==========================================================================================*/ 


    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       0,
      }
    );
    wow.init();

    
