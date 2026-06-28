const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const storageKey = 'portfolio-cv-data';
const skillsGrid = document.getElementById('skills-grid');
const form = document.getElementById('cv-form');

function getStoredValues() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch (error) {
    console.warn('Impossible de lire les données du CV', error);
    return null;
  }
}

function saveValues(values) {
  localStorage.setItem(storageKey, JSON.stringify(values));
}

function renderSkills(skillsText) {
  const skills = skillsText
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  const rendered = skills.length > 0
    ? skills.map((skill) => `<div class="skill-item">${skill}</div>`).join('')
    : '<div class="skill-item">Compétence</div>';

  if (skillsGrid) {
    skillsGrid.innerHTML = rendered;
  }
}

function applyCv(values) {
  const textTargets = [
    ['name', 'cv-logo-name'],
    ['role', 'cv-role-heading'],
    ['summary', 'cv-summary'],
    ['about1', 'cv-about-1'],
    ['about2', 'cv-about-2'],
    ['experienceTitle1', 'cv-experience-title-1'],
    ['experienceMeta1', 'cv-experience-meta-1'],
    ['experienceText1', 'cv-experience-text-1'],
    ['experienceTitle2', 'cv-experience-title-2'],
    ['experienceMeta2', 'cv-experience-meta-2'],
    ['experienceText2', 'cv-experience-text-2'],
    ['education', 'cv-education']
  ];

  textTargets.forEach(([valueKey, targetId]) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.textContent = values[valueKey] || '';
    }
  });

  const emailElement = document.getElementById('cv-email');
  if (emailElement) {
    emailElement.textContent = values.email ? `Email : ${values.email}` : 'Email :';
  }

  const phoneElement = document.getElementById('cv-phone');
  if (phoneElement) {
    phoneElement.textContent = values.phone ? `Téléphone : ${values.phone}` : 'Téléphone :';
  }

  const cityElement = document.getElementById('cv-city');
  if (cityElement) {
    cityElement.textContent = values.city ? `Ville : ${values.city}` : 'Ville :';
  }

  if (values.skills !== undefined) {
    renderSkills(values.skills);
  }

  if (values.name) {
    document.title = `${values.name} | CV`;
  }
}

function getDefaultValues() {
  return {
    name: document.getElementById('cv-logo-name')?.textContent.trim() || 'Sokamdoum Fongang Yann',
    role: document.getElementById('cv-role-heading')?.textContent.trim() || 'Développeur Web & Designer',
    summary: document.getElementById('cv-summary')?.textContent.trim() || 'Je transforme les idées en interfaces élégantes, rapides et orientées utilisateur.',
    about1: document.getElementById('cv-about-1')?.textContent.trim() || 'Passionné par le web, je développe des solutions digitales soignées avec une attention particulière à l\'expérience utilisateur, à la performance et à l\'esthétique.',
    about2: document.getElementById('cv-about-2')?.textContent.trim() || 'Mon objectif est de créer des sites modernes, accessibles et adaptés aux besoins des clients et de leurs audiences.',
    experienceTitle1: document.getElementById('cv-experience-title-1')?.textContent.trim() || 'Développeur Front-End',
    experienceMeta1: document.getElementById('cv-experience-meta-1')?.textContent.trim() || '2024 - 2025',
    experienceText1: document.getElementById('cv-experience-text-1')?.textContent.trim() || 'J\'ai participe a la creation et hebergement de plusiers projets web.',
    experienceTitle2: document.getElementById('cv-experience-title-2')?.textContent.trim() || 'Web Designer',
    experienceMeta2: document.getElementById('cv-experience-meta-2')?.textContent.trim() || '2025 - 2026',
    experienceText2: document.getElementById('cv-experience-text-2')?.textContent.trim() || 'Travailles sur un projet de design web de rencontres.',
    education: document.getElementById('cv-education')?.textContent.trim() || 'Etudes en gestions des systemes d\'information',
    skills: Array.from(skillsGrid?.querySelectorAll('.skill-item') || []).map((item) => item.textContent.trim()).join(', ') || 'HTML, CSS, JavaScript, PHP',
    email: document.getElementById('cv-email')?.textContent.replace('Email : ', '').trim() || 'yannjunior39@email.com',
    phone: document.getElementById('cv-phone')?.textContent.replace('Téléphone : ', '').trim() || '+237 699 047 308',
    city: document.getElementById('cv-city')?.textContent.replace('Ville : ', '').trim() || 'Yaoundé, Cammeroun'
  };
}

function populateForm(values) {
  if (!form) {
    return;
  }

  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) {
      field.value = value || '';
    }
  });
}

const defaultValues = getDefaultValues();
const storedValues = getStoredValues();
const initialValues = storedValues || defaultValues;

applyCv(initialValues);

if (form) {
  populateForm(initialValues);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    saveValues(values);
    applyCv(values);
    window.location.href = 'index.html';
  });
}
