const translations = {
    en: {
        nav_about: "About",
        nav_projects: "Projects",
        hero_greeting: "Hi, I'm",
        hero_subtitle: "Android Developer creating innovative mobile experiences.",
        btn_work: "View Projects",
        btn_about: "Profile",
        label_age: "Age",
        val_age: "14 years old",
        label_location: "Location",
        val_location: "India",
        label_heritage: "Background",
        val_heritage: "Indian",
        label_phone: "Main Phone",
        val_phone: "OnePlus 13",
        label_laptop: "Main Laptop",
        val_laptop: "ROG Strix Scar 16 2025",
        label_os: "Main OS Used",
        val_os: "Windows 11",
        proj1_title: "Film Sims Web",
        proj1_desc: "Film camera simulation web version. Enjoy an analog experience easily in your browser.",
        proj1_link: "Open Web App",
        proj2_title: "HyperOS 3 App Port",
        proj2_desc: "Porting HyperOS 3 apps to other devices while maintaining functionality and performance.",
        proj2_link: "View Details",
        footer_copy: "© 2026 ozyern. All rights reserved."
    }
};

function setLanguage(lang = 'en') {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
});
