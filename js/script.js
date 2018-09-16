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


// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback/*, thisArg*/) {

    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat while k < len.
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator.
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c.
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined.
  };
}


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

        body.classList = "";
        body.classList.add(background[index]);
      }
    })
  })(i);
};
