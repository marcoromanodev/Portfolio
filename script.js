document.addEventListener("DOMContentLoaded", () => {
    const line1Text = "Hello World,";
    const line2Text = "I am Marco Romano Jr";
    const jobTitles = [
        "Software Developer",
        "Web3 Developer",
        "Front End Developer",
        "Back End Developer",
        "Mobile Developer"
    ];

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const line1Element = document.getElementById('line1');
    const line2Element = document.getElementById('line2');
    const line3Element = document.getElementById('intro-text-line3');
    const line4Element = document.getElementById('intro-text-line4');

    function typeLine1() {
        if (currentCharIndex < line1Text.length) {
            line1Element.innerHTML += line1Text.charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeLine1, 100); // Adjust typing speed here
        } else {
            line1Element.innerHTML = "";
            currentCharIndex = 0;
            setTimeout(typeLine2, 500); // Pause before typing next line
        }
    }

    function typeLine2() {
        if (currentCharIndex < line2Text.length) {
            line2Element.innerHTML += line2Text.charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeLine2, 100); // Adjust typing speed here
        } else {
            currentCharIndex = 0;
            setTimeout(typeJobTitle, 500); // Pause before typing job titles
        }
    }

    function typeJobTitle() {
        const currentJobTitle = jobTitles[currentTextIndex];
        if (currentCharIndex < currentJobTitle.length) {
            line3Element.innerHTML += currentJobTitle.charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeJobTitle, 100); // Adjust typing speed here
        } else {
            setTimeout(moveDeveloperToLine4, 500); // Shorter pause before moving "Developer" to line 4
        }
    }

    function moveDeveloperToLine4() {
        const currentJobTitle = jobTitles[currentTextIndex];
        if (line3Element.innerHTML.includes("Developer")) {
            line4Element.innerHTML = "Developer";
            line3Element.innerHTML = line3Element.innerHTML.replace(" Developer", "");
            setTimeout(deleteJobTitle, 2000); // Pause before deleting
        }
    }

    function deleteJobTitle() {
        const currentJobTitle = jobTitles[currentTextIndex];
        if (line4Element.innerHTML.length > 0) {
            line4Element.innerHTML = "";
        } else if (line3Element.innerHTML.length > 0) {
            line3Element.innerHTML = line3Element.innerHTML.substring(0, line3Element.innerHTML.length - 1);
        } else {
            line3Element.innerHTML = "";
            line4Element.innerHTML = "";
            currentTextIndex = (currentTextIndex + 1) % jobTitles.length;
            currentCharIndex = 0;
            setTimeout(typeJobTitle, 500); // Pause before typing next job title
            return;
        }
        setTimeout(deleteJobTitle, 50); // Adjust deleting speed here
    }

    typeLine1();

    const character = document.getElementById('character');
    const speechBubble = document.getElementById('speech-bubble');
    speechBubble.style.display = 'block';

    function typeSpeechBubble() {
        const speechText = "Hello World!";
        let charIndex = 0;

        function typeChar() {
            if (charIndex < speechText.length) {
                speechBubble.innerHTML += speechText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100); // Adjust typing speed here
            }
        }

        typeChar();
    }

    typeSpeechBubble();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlighting active section
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 2)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const serviceID = 'service_miceszk';
        const templateID = 'template_pof5zwc';

        const templateParams = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                alert('Message sent successfully!');
                form.reset();  // Clears the form inputs
            }, (err) => {
                alert('Failed to send message. Error: ' + JSON.stringify(err));
            });
    });
});

function toggleMoreProjects() {
    const moreProjects = document.getElementById('more-projects');
    const seeMoreBtn = document.getElementById('see-more-btn');

    if (moreProjects.style.display === 'none') {
        moreProjects.style.display = 'flex';
        seeMoreBtn.innerText = 'See Less';
    } else {
        moreProjects.style.display = 'none';
        seeMoreBtn.innerText = 'See More';
    }
}
