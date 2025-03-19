   // Slideshow JavaScript
        let slideIndex = 0;
        const slides = document.querySelector('.slides');
        const totalSlides = document.querySelectorAll('.slide').length;

        function showSlides() {
            slideIndex++;
            if (slideIndex >= totalSlides) slideIndex = 0;
            slides.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        // Change slide every 5 seconds (slower than 3s)
        setInterval(showSlides, 5000);
