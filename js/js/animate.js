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

    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       0,
      }
    );
    wow.init();

    
