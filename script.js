document.addEventListener('DOMContentLoaded', () => {
    const keywordEl = document.getElementById('hero-keyword');
    const keywords = ['full-stack', 'Web3', 'product-led', 'frontend', 'backend'];
    let keywordIndex = 0;

    setInterval(() => {
        keywordIndex = (keywordIndex + 1) % keywords.length;
        keywordEl.textContent = keywords[keywordIndex];
    }, 2000);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = sections.indexOf(entry.target);
            if (entry.isIntersecting && index >= 0) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => section && observer.observe(section));

    // EmailJS contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
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
                    form.reset();
                })
                .catch(err => {
                    alert('Failed to send message. Error: ' + JSON.stringify(err));
                });
        });
    }
});
