document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const mainNav = document.querySelector(".main-nav")
    const overlay = document.getElementById("overlay")
  
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active")
        overlay.classList.toggle("active")
      })
    }
  
    // Language Toggle
    const languageToggle = document.getElementById("languageToggle")
    const languageModal = document.getElementById("languageModal")
    const languageOptions = document.querySelectorAll(".language-option")
    const currentLang = document.querySelector(".current-lang")
    const modalClose = document.querySelectorAll(".modal-close")
  
    if (languageToggle) {
      languageToggle.addEventListener("click", () => {
        languageModal.classList.add("active")
        overlay.classList.add("active")
      })
    }
  
    if (languageOptions) {
      languageOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const lang = this.getAttribute("data-lang")
          if (currentLang) {
            currentLang.textContent = lang.toUpperCase()
          }
  
          languageOptions.forEach((opt) => opt.classList.remove("selected"))
          this.classList.add("selected")
  
          // Simulate language change
          if (lang === "hi") {
            translateToHindi()
          } else {
            translateToEnglish()
          }
  
          languageModal.classList.remove("active")
          overlay.classList.remove("active")
        })
      })
    }
  
    if (modalClose) {
      modalClose.forEach((close) => {
        close.addEventListener("click", function () {
          const modal = this.closest(".modal")
          modal.classList.remove("active")
          overlay.classList.remove("active")
        })
      })
    }
  
    // Close modals when clicking on overlay
    if (overlay) {
      overlay.addEventListener("click", function () {
        const activeModals = document.querySelectorAll(".modal.active")
        activeModals.forEach((modal) => {
          modal.classList.remove("active")
        })
        mainNav.classList.remove("active")
        this.classList.remove("active")
      })
    }
  
    // Dashboard Navigation
    const dashboardNavLinks = document.querySelectorAll(".dashboard-nav a")
    const dashboardSections = document.querySelectorAll(".dashboard-section")
  
    if (dashboardNavLinks) {
      dashboardNavLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault()
          const targetId = this.getAttribute("href").substring(1)
  
          dashboardNavLinks.forEach((navLink) => navLink.classList.remove("active"))
          this.classList.add("active")
  
          dashboardSections.forEach((section) => {
            section.classList.remove("active")
            if (section.id === targetId) {
              section.classList.add("active")
            }
          })
        })
      })
    }
  
    // Multi-step Form
    const nextStepButtons = document.querySelectorAll(".next-step")
    const prevStepButtons = document.querySelectorAll(".prev-step")
    const formSteps = document.querySelectorAll(".form-step")
    const appointmentForm = document.getElementById("appointmentForm")
    const appointmentConfirmModal = document.getElementById("appointmentConfirmModal")
  
    if (nextStepButtons) {
      nextStepButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const currentStep = this.closest(".form-step")
          const currentStepNum = Number.parseInt(currentStep.getAttribute("data-step"))
          const nextStepNum = currentStepNum + 1
          const nextStep = document.querySelector(`.form-step[data-step="${nextStepNum}"]`)
  
          if (validateStep(currentStep) && nextStep) {
            currentStep.classList.remove("active")
            nextStep.classList.add("active")
          }
        })
      })
    }
  
    if (prevStepButtons) {
      prevStepButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const currentStep = this.closest(".form-step")
          const currentStepNum = Number.parseInt(currentStep.getAttribute("data-step"))
          const prevStepNum = currentStepNum - 1
          const prevStep = document.querySelector(`.form-step[data-step="${prevStepNum}"]`)
  
          if (prevStep) {
            currentStep.classList.remove("active")
            prevStep.classList.add("active")
          }
        })
      })
    }
  
    // Time Slot Selection
    const timeSlots = document.querySelectorAll(".time-slot")
    const selectedTimeInput = document.getElementById("selected-time")
  
    if (timeSlots) {
      timeSlots.forEach((slot) => {
        slot.addEventListener("click", function () {
          timeSlots.forEach((s) => s.classList.remove("selected"))
          this.classList.add("selected")
          if (selectedTimeInput) {
            selectedTimeInput.value = this.textContent.trim()
          }
        })
      })
    }
  
    // Appointment Form Submission
    if (appointmentForm) {
      appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        if (validateForm(this)) {
          // Show confirmation modal
          if (appointmentConfirmModal) {
            appointmentConfirmModal.classList.add("active")
            overlay.classList.add("active")
          }
  
          // Reset form
          this.reset()
          const firstStep = document.querySelector('.form-step[data-step="1"]')
          formSteps.forEach((step) => step.classList.remove("active"))
          if (firstStep) {
            firstStep.classList.add("active")
          }
  
          timeSlots.forEach((slot) => slot.classList.remove("selected"))
        }
      })
    }
  
    // Emergency Form
    const emergencyForm = document.getElementById("emergencyForm")
    const emergencyConfirmModal = document.getElementById("emergencyConfirmModal")
    const locationBtn = document.querySelector(".location-btn")
  
    if (emergencyForm) {
      emergencyForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        if (validateForm(this)) {
          // Show confirmation modal
          if (emergencyConfirmModal) {
            emergencyConfirmModal.classList.add("active")
            overlay.classList.add("active")
          }
  
          // Reset form
          this.reset()
        }
      })
    }
  
    if (locationBtn) {
      locationBtn.addEventListener("click", () => {
        const locationInput = document.getElementById("location")
  
        // Simulate getting current location
        if (locationInput) {
          locationInput.value = "Current Location: New Delhi, India"
        }
      })
    }
  
    // Doctor Status Change
    const doctorStatusSelects = document.querySelectorAll(".doctor-status-select")
  
    if (doctorStatusSelects) {
      doctorStatusSelects.forEach((select) => {
        select.addEventListener("change", function () {
          const status = this.value
          const doctorCard = this.closest(".doctor-card")
  
          // Update UI based on status
          if (doctorCard) {
            const statusClasses = ["available", "busy", "on-break", "on-emergency", "off-duty"]
            statusClasses.forEach((cls) => {
              doctorCard.classList.remove(cls)
            })
            doctorCard.classList.add(status)
          }
        })
      })
    }
  
    // Queue Status Refresh
    const refreshStatusButtons = document.querySelectorAll(".btn-refresh")
  
    if (refreshStatusButtons) {
      refreshStatusButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Simulate refreshing queue status
          simulateQueueUpdate()
        })
      })
    }
  
    // Doctor Timeline Actions
    const startConsultationButtons = document.querySelectorAll(".btn-start-consultation")
    const completeButtons = document.querySelectorAll(".btn-complete")
    const patientNotesButtons = document.querySelectorAll(".btn-patient-notes")
    const patientNotesModal = document.getElementById("patientNotesModal")
  
    if (startConsultationButtons) {
      startConsultationButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const timelineItem = this.closest(".timeline-item")
  
          if (timelineItem) {
            // Update status
            const statusElement = timelineItem.querySelector(".timeline-status")
            if (statusElement) {
              statusElement.textContent = "In Consultation"
            }
  
            // Update classes
            timelineItem.classList.remove("current")
            timelineItem.classList.add("in-progress")
  
            // Update buttons
            const actionsElement = timelineItem.querySelector(".timeline-actions")
            if (actionsElement) {
              actionsElement.innerHTML = `
                              <button class="btn btn-success btn-sm">Complete</button>
                              <button class="btn btn-primary btn-sm">Patient Notes</button>
                          `
            }
          }
        })
      })
    }
  
    if (completeButtons) {
      completeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const timelineItem = this.closest(".timeline-item")
  
          if (timelineItem) {
            // Update status
            const statusElement = timelineItem.querySelector(".timeline-status")
            if (statusElement) {
              statusElement.textContent = "Completed"
            }
  
            // Update classes
            timelineItem.classList.remove("in-progress")
            timelineItem.classList.add("completed")
  
            // Update buttons
            const actionsElement = timelineItem.querySelector(".timeline-actions")
            if (actionsElement) {
              actionsElement.innerHTML = `
                              <button class="btn btn-primary btn-sm">View Details</button>
                          `
            }
          }
        })
      })
    }
  
    if (patientNotesButtons) {
      patientNotesButtons.forEach((button) => {
        button.addEventListener("click", () => {
          if (patientNotesModal) {
            patientNotesModal.classList.add("active")
            overlay.classList.add("active")
          }
        })
      })
    }
  
    // Form Validation Functions
    function validateStep(step) {
      const inputs = step.querySelectorAll("input[required], select[required], textarea[required]")
      let isValid = true
  
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
      })
  
      return isValid
    }
  
    function validateForm(form) {
      const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
      let isValid = true
  
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
      })
  
      return isValid
    }
  
    // Simulate Queue Update
    function simulateQueueUpdate() {
      const waitTimeElements = document.querySelectorAll(".wait-time")
      const currentTokenElements = document.querySelectorAll(".current-number")
      const progressBars = document.querySelectorAll(".progress")
  
      if (waitTimeElements) {
        waitTimeElements.forEach((element) => {
          const currentTime = Number.parseInt(element.textContent.split(" ")[0])
          const newTime = Math.max(5, currentTime - Math.floor(Math.random() * 10))
          element.textContent = `${newTime} minutes`
        })
      }
  
      if (currentTokenElements) {
        currentTokenElements.forEach((element) => {
          const currentToken = element.textContent
          const tokenLetter = currentToken.split("-")[0]
          const tokenNumber = Number.parseInt(currentToken.split("-")[1])
          const newTokenNumber = tokenNumber + 1
          element.textContent = `${tokenLetter}-${newTokenNumber}`
        })
      }
  
      if (progressBars) {
        progressBars.forEach((element) => {
          const currentWidth = Number.parseInt(element.style.width)
          const newWidth = Math.min(100, currentWidth + Math.floor(Math.random() * 10))
          element.style.width = `${newWidth}%`
        })
      }
    }
  
    // Language Translation (Simulated)
    function translateToHindi() {
      // This is a simplified simulation of language translation
      const translationMap = {
        Home: "होम",
        "Book Appointment": "अपॉइंटमेंट बुक करें",
        "Queue Status": "कतार स्थिति",
        Emergency: "आपातकालीन",
        Login: "लॉगिन",
        "Quick and Easy Healthcare Appointments": "त्वरित और आसान स्वास्थ्य देखभाल अपॉइंटमेंट",
        "Book appointments at government hospitals and rural dispensaries across India":
          "भारत भर के सरकारी अस्पतालों और ग्रामीण औषधालयों में अपॉइंटमेंट बुक करें",
        "Our Services": "हमारी सेवाएं",
        "How It Works": "यह कैसे काम करता है",
        Register: "पंजीकरण",
        "Book Appointment": "अपॉइंटमेंट बुक करें",
        "Receive Confirmation": "पुष्टिकरण प्राप्त करें",
        "Visit Hospital": "अस्पताल जाएं",
      }
  
      document.querySelectorAll("h1, h2, h3, h4, p, a, button, label, option").forEach((element) => {
        const text = element.textContent.trim()
        if (translationMap[text]) {
          element.textContent = translationMap[text]
        }
      })
    }
  
    function translateToEnglish() {
      // Reload the page to reset to English
      location.reload()
    }
  
    // Check for hash in URL to activate specific tab
    const hash = window.location.hash
    if (hash) {
      const targetLink = document.querySelector(`.dashboard-nav a[href="${hash}"]`)
      if (targetLink) {
        targetLink.click()
      }
    }
  
    // Update current time
    const currentTimeElement = document.getElementById("current-time")
    if (currentTimeElement) {
      function updateTime() {
        const now = new Date()
        let hours = now.getHours()
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const ampm = hours >= 12 ? "PM" : "AM"
        hours = hours % 12
        hours = hours ? hours : 12
        currentTimeElement.textContent = `${hours}:${minutes} ${ampm}`
      }
  
      updateTime()
      setInterval(updateTime, 60000)
    }
  })
  
  