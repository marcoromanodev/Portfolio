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
    const navTargets = Array.from(navLinks)
        .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
        .filter(item => item.section);

    const setActiveNav = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;
        let activeItem = navTargets[0];

        navTargets.forEach(item => {
            const top = item.section.offsetTop - 120;
            const bottom = top + item.section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
                activeItem = item;
            }
        });

        navLinks.forEach(link => link.classList.remove('active'));
        activeItem?.link.classList.add('active');
    };

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

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
