var feedbackButton = document.querySelector(".feedback-button");
var modalFeedback = document.querySelector(".modal-feedback");
var close = document.querySelector(".modal-close");
var overlay = document.querySelector(".modal-overlay");
var inputName = modalFeedback.querySelector("[name=name]");
var inputEmail = modalFeedback.querySelector("[name=email]");
var textarea = modalFeedback.querySelector(".feedback-text");
var form = modalFeedback.querySelector(".feedback-form");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

feedbackButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFeedback.classList.add("modal-show");
  inputName.focus();

  if (storageName) {
    inputName.value = storageName;
    inputEmail.focus();
  }

  if (storageEmail) {
    inputEmail.value = storageEmail;
  }

  if (storageEmail && !storageName) {
    inputName.focus();
  }

  if (storageName && storageEmail) {
    textarea.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal-show");
  modalFeedback.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  console.log("submit");
  if (!inputName.value || !inputEmail.value) {
    evt.preventDefault();
    console.log("error");
    modalFeedback.classList.remove("modal-error");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", inputName.value);
      localStorage.setItem("email", inputEmail.value);
    }
  };
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains("modal-show")){
      evt.preventDefault(evt);
      modalFeedback.classList.remove("modal-show");
      modalFeedback.classList.remove("modal-error");
    }
  }
});

overlay.addEventListener("click", function (evt) {
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

// controls.forEach(function (item, i, array) {
//   item.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     var control = item;
//     var relatedSlide = slides[i];
//
//     if (!control.classList.contains("current")) {
//       currentControl.classList.remove("current");
//       control.classList.add("current");
//       currentControl = control;
//
//       currentSlide.classList.remove("slide");
//       relatedSlide.classList.add("slide");
//       currentSlide = relatedSlide;
//
//       body.classList = "";
//       body.classList.add(background[i]);
//     }
//   })
// });

for (var i = 0; i < controls.length; i++) {
  (function(index){
    controls[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      var control = this;
      var relatedSlide = slides[index];

      if (!control.classList.contains("current")) {
        currentControl.classList.remove("current");
        control.classList.add("current");
        currentControl = control;

        currentSlide.classList.remove("slide");
        relatedSlide.classList.add("slide");
        currentSlide = relatedSlide;

        body.setAttribute("data-bgcolor", background[index]);
      }
    })
  })(i);
};
