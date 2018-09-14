var feedbackButton = document.querySelector(".feedback-button");
var modalFeedback = document.querySelector(".modal-feedback");
var close = document.querySelector(".modal-close");
var overlay = document.querySelector(".modal-overlay");
var inputName = modalFeedback.querySelector("[name=name]");
var inputEmail = modalFeedback.querySelector("[name=email]");
var textarea = modalFeedback.querySelector(".feedback-text");
var form = modalFeedback.querySelector(".feedback-form");
var storageName = localStorage.getItem("name");
var storageEmail = localStorage.getItem("email");


feedbackButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.add("modal-show");
  inputName.focus();

  if (storageName) {
    inputName.value = storageName;
    inputEmail.focus();
  }

  if (storageName && storageEmail) {
    inputEmail.value = storageEmail;
    textarea.focus();
  }

});

close.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal-show");
});

form.addEventListener("submit", function(evt) {
  if(!inputName.value || !inputEmail.value) {
    evt.preventDefault();
  } else {
    localStorage.setItem("name", inputName.value);
    localStorage.setItem("email", inputEmail.value);
  };
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains("modal-show")){
      evt.preventDefault(evt);
      modalFeedback.classList.remove("modal-show");
    }
  }
});

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal-show");
})


// Slider

var body = document.querySelector("body");
var slider = document.querySelector(".slider");
var slides = slider.querySelectorAll(".slider-item");
var controls = document.querySelectorAll(".slider-control");
var currentControl = slider.querySelector(".current");
var currentSlide = slider.querySelector(".slide");

var background = ["green", "grey", "brown"];


controls.forEach(function(item, i, array) {
  item.addEventListener("click", function(evt) {
    evt.preventDefault();
    var control = item;
    var relatedSlide = slides[i];
    console.log(relatedSlide);

    if (!control.classList.contains("current")) {
      currentControl.classList.remove("current");
      control.classList.add("current");
      currentControl = control;

      currentSlide.classList.remove("slide");
      relatedSlide.classList.add("slide");
      currentSlide = relatedSlide;

      body.classList = "";
      body.classList.add(background[i]);
    }
  })
})
