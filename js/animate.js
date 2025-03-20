// Modaldialogue-box functionality
const modal = document.getElementById("joinModal");
const joinButtons = document.querySelectorAll(".join-now");
const closeBtn = document.querySelector(".close-btn");
const toggleLink = document.getElementById("toggleAuth");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");
let isRegister = true;

// Initialize users array from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Open modal and pre-select package
joinButtons.forEach(button => {
	button.addEventListener("click", (e) => {
		e.preventDefault();
		const packagePrice = button.getAttribute("data-price");
		document.getElementById("regPackage").value = packagePrice;
		modal.style.display = "block";
		showRegister();
	});
});

// Close modal
closeBtn.addEventListener("click", () => {
	modal.style.display = "none";
});

window.addEventListener("click", (e) => {
	if (e.target === modal) {
		modal.style.display = "none";
	}
});

// Form toggle functions
function showRegister() {
	isRegister = true;
	document.getElementById("registerForm").style.display = "block";
	document.getElementById("loginForm").style.display = "none";
	modalTitle.textContent = "Register for Focus Fitness";
	submitBtn.textContent = "Register";
	toggleLink.textContent = "Already have an account? Login here";
	document.getElementById("authForm").reset();
}

function showLogin() {
	isRegister = false;
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("loginForm").style.display = "block";
	modalTitle.textContent = "Login to Focus Fitness";
	toggleLink.textContent = "Need an account? Register here";
	document.getElementById("loginForm").reset();
}

toggleLink.addEventListener("click", showLogin);

    // Unified auth submission handler
    function handleAuthSubmit(e) {
        e.preventDefault();

        if (isRegister) {
            const name = document.getElementById("regName").value.trim();
            const gender = document.getElementById("regGender").value;
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value.trim();
            const package = document.getElementById("regPackage").value;

            if (!name) {
                alert("Full Name cannot be empty");
                return false;
            }
            if (!gender) {
                alert("Please select a gender");
                return false;
            }
            if (!email) {
                alert("Email cannot be empty");
                return false;
            }
            if (!password) {
                alert("Password cannot be empty");
                return false;
            }
            if (!package) {
                alert("Please select a membership package");
                return false;
            }

            // Check if email already exists
            if (users.some(user => user.email === email)) {
                alert("This email is already registered. Please log in or use a different email.");
                return false;
            }

            const newUser = { name, gender, email, password, package };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            alert(`Registration successful!\nName: ${name}\nPackage: ₦${package}\nPlease log in to continue.`);
            showLogin();
        } else {
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!email) {
                alert("Email cannot be empty");
                return false;
            }
            if (!password) {
                alert("Password cannot be empty");
                return false;
            }

            const user = users.find(user => user.email === email);
            if (!user) {
                alert("Invalid email or user not found");
                return false;
            }
            if (user.password !== password) {
                alert("Invalid password");
                return false;
            }

            alert(`Login successful!\nWelcome back, ${user.name}!\nPackage: ₦${user.package}`);
            modal.style.display = "none";
            window.location.href = "slider.html";
        }
        return false;
    }

    // Contact form submission
    function handleContactSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const mobile = document.getElementById("contactMobile").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !mobile || !message) {
            alert("Please fill all contact fields");
            return false;
        }

        console.log("Contact Submission:", { name, email, mobile, message });
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
        return false;
    }

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

    
