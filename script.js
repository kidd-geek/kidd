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

const form = document.getElementById('cv-form');
const skillsGrid = document.getElementById('skills-grid');
const previewSkills = document.getElementById('preview-skills');

function renderSkills(skillsText) {
  const skills = skillsText
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (skillsGrid) {
    skillsGrid.innerHTML = skills.length > 0
      ? skills.map((skill) => `<div class="skill-item">${skill}</div>`).join('')
      : '<div class="skill-item">Compétence</div>';
  }

  if (previewSkills) {
    previewSkills.innerHTML = skills.length > 0
      ? skills.map((skill) => `<div class="skill-item">${skill}</div>`).join('')
      : '<div class="skill-item">Compétence</div>';
  }
}

function applyCv(values) {
  const textTargets = [
    ['name', 'cv-logo-name', 'preview-name'],
    ['role', 'cv-role-heading', 'preview-role'],
    ['summary', 'cv-summary', 'preview-summary'],
    ['about1', 'cv-about-1'],
    ['about2', 'cv-about-2'],
    ['experienceTitle1', 'cv-experience-title-1'],
    ['experienceMeta1', 'cv-experience-meta-1'],
    ['experienceText1', 'cv-experience-text-1'],
    ['experienceTitle2', 'cv-experience-title-2'],
    ['experienceMeta2', 'cv-experience-meta-2'],
    ['experienceText2', 'cv-experience-text-2'],
    ['education', 'cv-education'],
    ['email', 'cv-email'],
    ['phone', 'cv-phone'],
    ['city', 'cv-city']
  ];

  textTargets.forEach(([valueKey, ...targetIds]) => {
    const value = values[valueKey] || '';
    targetIds.forEach((targetId) => {
      const element = document.getElementById(targetId);
      if (element) {
        if (targetId === 'cv-email') {
          element.textContent = `Email : ${value}`;
        } else if (targetId === 'cv-phone') {
          element.textContent = `Téléphone : ${value}`;
        } else if (targetId === 'cv-city') {
          element.textContent = `Ville : ${value}`;
        } else {
          element.textContent = value;
        }
      }
    });
  });

  if (values.skills !== undefined) {
    renderSkills(values.skills);
  }

  if (values.name) {
    document.title = `${values.name} | CV`;
  }
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

const initialValues = {
  name: document.getElementById('cv-logo-name')?.textContent.trim() || '',
  role: document.getElementById('cv-role-heading')?.textContent.trim() || '',
  summary: document.getElementById('cv-summary')?.textContent.trim() || '',
  about1: document.getElementById('cv-about-1')?.textContent.trim() || '',
  about2: document.getElementById('cv-about-2')?.textContent.trim() || '',
  experienceTitle1: document.getElementById('cv-experience-title-1')?.textContent.trim() || '',
  experienceMeta1: document.getElementById('cv-experience-meta-1')?.textContent.trim() || '',
  experienceText1: document.getElementById('cv-experience-text-1')?.textContent.trim() || '',
  experienceTitle2: document.getElementById('cv-experience-title-2')?.textContent.trim() || '',
  experienceMeta2: document.getElementById('cv-experience-meta-2')?.textContent.trim() || '',
  experienceText2: document.getElementById('cv-experience-text-2')?.textContent.trim() || '',
  education: document.getElementById('cv-education')?.textContent.trim() || '',
  skills: Array.from(skillsGrid?.querySelectorAll('.skill-item') || []).map((item) => item.textContent.trim()).join(', ') || '',
  email: document.getElementById('cv-email')?.textContent.replace('Email : ', '').trim() || '',
  phone: document.getElementById('cv-phone')?.textContent.replace('Téléphone : ', '').trim() || '',
  city: document.getElementById('cv-city')?.textContent.replace('Ville : ', '').trim() || ''
};

if (form) {
  populateForm(initialValues);
  applyCv(initialValues);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    applyCv(values);
  });

  form.addEventListener('reset', (event) => {
    event.preventDefault();
    populateForm(initialValues);
    applyCv(initialValues);
  });
}
