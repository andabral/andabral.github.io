'use strict';

import './contact.js';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.getAttribute('data-filter');
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.getAttribute('data-filter');
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageKey = this.getAttribute('data-i18n');
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === pageKey) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Detecta idioma guardado o navegador
let lang = localStorage.getItem('lang');
if (!lang) {
  const userLang = navigator.language || navigator.userLanguage;
  lang = userLang.startsWith('es') ? 'es' : 'en';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (el.placeholder !== undefined && el.placeholder !== "") {
      el.placeholder = translation || el.placeholder;
    }
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.setAttribute('placeholder', translation || el.placeholder);
    } else if (
      el.tagName === 'P' ||
      el.tagName === 'FIGCAPTION' ||
      el.classList.contains('service-item-text') ||
      el.classList.contains('timeline-text') ||
      el.classList.contains('blog-text')
    ) {
      if (translation) {
        el.innerHTML = translation.replace(/\n/g, '<br>');
      }
    } else {
      if (translation) {
        el.textContent = translation;
      }
    }
  });
  // Resalta el idioma activo
  if (document.getElementById('btn-es') && document.getElementById('btn-en')) {
    document.getElementById('btn-es').style.opacity = lang === 'es' ? '1' : '0.5';
    document.getElementById('btn-en').style.opacity = lang === 'en' ? '1' : '0.5';
    document.getElementById('btn-es').style.fontWeight = lang === 'es' ? 'bold' : 'normal';
    document.getElementById('btn-en').style.fontWeight = lang === 'en' ? 'bold' : 'normal';
  }
}

setLang(lang);

// Eventos para los botones de idioma
if (document.getElementById('btn-es') && document.getElementById('btn-en')) {
  document.getElementById('btn-es').addEventListener('click', function() {
    setLang('es');
  });
  document.getElementById('btn-en').addEventListener('click', function() {
    setLang('en');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var btnSeeMore = document.getElementById('btn-see-more-exp');
  var experienceExtras = document.querySelectorAll('.experience-extra');
  var expanded = false;
  if (btnSeeMore) {
    btnSeeMore.addEventListener('click', function() {
      expanded = !expanded;
      experienceExtras.forEach(function(item) {
        item.style.display = expanded ? 'list-item' : 'none';
      });
      // Cambia el texto del botón según el estado y el idioma
      var lang = localStorage.getItem('lang') || (navigator.language || navigator.userLanguage).startsWith('es') ? 'es' : 'en';
      btnSeeMore.textContent = expanded ? translations[lang].seeLess : translations[lang].seeMore;
      btnSeeMore.setAttribute('data-i18n', expanded ? 'seeLess' : 'seeMore');
    });
  }
});