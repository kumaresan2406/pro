// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 70; // Adjust for navbar height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255,255,255,0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.background = 'rgba(255,255,255,0.95)';
      navbar.style.boxShadow = 'none';
    }
  }
});

// Appointment Form Handling
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation
    const name = appointmentForm.name.value.trim();
    const email = appointmentForm.email.value.trim();
    const phone = appointmentForm.phone.value.trim();
    const date = appointmentForm.date.value.trim();
    const department = appointmentForm.department.value.trim();
    if (!name || !email || !phone || !date || !department) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
    appointmentForm.reset();
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button style="margin-left:auto;background:none;border:none;color:white;font-size:1.2rem;cursor:pointer;">&times;</button>
    </div>
  `;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
  `;
  document.body.appendChild(notification);

  notification.querySelector('button').onclick = () => notification.remove();
  setTimeout(() => notification.remove(), 5000);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loaded');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .contact-item, .stat');
  animatedElements.forEach(el => {
    el.classList.add('loading');
    observer.observe(el);
  });
});

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat h3');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
      }
    };
    updateCounter();
  });
}
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// Department and Doctor Selection Logic
const departmentSelect = document.getElementById('department');
const doctorSelect = document.getElementById('doctor');
if (departmentSelect && doctorSelect) {
  const doctorOptions = {
    'cardiology': ['Dr. Sarah Johnson'],
    'neurology': ['Dr. Michael Chen'],
    'pediatrics': ['Dr. Emily Rodriguez'],
    'orthopedics': ['Dr. James Wilson'],
    'ophthalmology': ['Dr. Lisa Brown'],
    'general': ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez']
  };
  departmentSelect.addEventListener('change', () => {
    const selectedDepartment = departmentSelect.value;
    doctorSelect.innerHTML = '<option value="">Any Available Doctor</option>';
    if (selectedDepartment && doctorOptions[selectedDepartment]) {
      doctorOptions[selectedDepartment].forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.toLowerCase().replace(' ', '-');
        option.textContent = doctor;
        doctorSelect.appendChild(option);
      });
    }
  });
}

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(231,76,60,0.4);
  transition: all 0.3s;
  z-index: 1000;
`;
document.body.appendChild(backToTopBtn);
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});