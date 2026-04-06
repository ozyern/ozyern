const translations = {
    en: {
        nav_about: "About",
        nav_projects: "Projects",
        nav_connect: "Connect",
        about_kicker: "Profile Snapshot",
        about_lead: "Building Android tools, porting projects, and shipping ideas with style.",
        hero_greeting: "Hi, I'm",
        hero_subtitle: "Android Developer creating innovative mobile experiences.",
        btn_work: "View Projects",
        btn_about: "Profile",
        label_age: "Age",
        val_age: "14",
        label_location: "Reason for existing!",
        val_location: "Sabrina Carpenter",
        label_heritage: "Background",
        val_heritage: "Indian",
        label_phone: "Main Phone",
        val_phone: "OnePlus 13",
        label_laptop: "Main Laptop",
        val_laptop: "ROG Strix Scar 16 2025",
        label_os: "Main OS Used",
        val_os: "Windows 11",
        proj1_title: "Spoofas OnePlus 15",
        proj1_desc: "Device spoofing tool for OnePlus 15, enabling device identification customization and enhanced functionality.",
        proj1_link: "View Repository",
        proj2_title: "S26 Ultra Spoofer",
        proj2_desc: "Advanced device spoofing utility for S26 Ultra devices with enhanced compatibility and performance features.",
        proj2_link: "View Repository",
        proj3_title: "ReVork Ports",
        proj3_desc: "Custom ROM porting project for OnePlus devices, creating optimized builds with enhanced features and fixes.",
        proj3_link: "View Repository",
        proj4_title: "Sabrina Carpenter Tribute",
        proj4_desc: "My love letter to Sabrina Carpenter in the form of a website. Pure HTML/CSS/JS, no frameworks, just devotion.",
        proj4_link: "View Repository",
        connect_kicker: "Open Inbox",
        connect_text: "Find me on these platforms",
        connect_status: "Open to collabs and ideas",
        connect_cta: "Say Hi",
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
