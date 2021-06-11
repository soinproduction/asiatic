jQuery(function ($) {

// -----------------  Слайдера --------------------

const Sliders = {
  BANERS_SLIDER: {
    ELEMENT: $('.main-slider'),
    SETTINGS: {
      accessibility: true,
      arrows: true,
      dots: true,
      prevArrow: $('.slider-btn--prev'),
      nextArrow: $('.slider-btn--next'),
      speed: 1500,
      slidesToShow: 1,
      infinite: false,
    },
  },
}

function initialazeSlickSlider(slider) {
  const {
    BREAKPOINT,
    SETTINGS,
    ELEMENT
  } = slider;
  (document.documentElement.clientWidth <= BREAKPOINT || BREAKPOINT === undefined) && ELEMENT.slick(SETTINGS);
}

function toggleSlider(slider) {
  const {
    BREAKPOINT,
    ELEMENT,
    SETTINGS
  } = slider;
  document.documentElement.clientWidth > BREAKPOINT && ELEMENT.hasClass('slick-initialized') && ELEMENT.slick('unslick');
  document.documentElement.clientWidth <= BREAKPOINT && !ELEMENT.hasClass('slick-initialized') && ELEMENT.slick(SETTINGS);
}

function toggleExtraClass(slider) {
  const {
    BREAKPOINT,
    ELEMENT,
    CLASSNAME
  } = slider;
  document.documentElement.clientWidth > BREAKPOINT && !ELEMENT.hasClass(CLASSNAME) && ELEMENT.addClass(CLASSNAME);
  document.documentElement.clientWidth <= BREAKPOINT && ELEMENT.hasClass(CLASSNAME) && ELEMENT.removeClass(CLASSNAME);
}

initialazeSlickSlider(Sliders.BANERS_SLIDER);


// -----------------  Табы  --------------------
$(".tab").click(function (e) {
  e.preventDefault();
  $(".tabs").removeClass("tabs-active");
  $(".tab").removeClass("tab-active");

  $($(this).attr("href")).addClass("tabs-active");
  $(this).addClass("tab-active");
});

// -----------------  Селект  --------------------

// переменная не переназначается, поэтому используем const
// используем querySelectorAll, чтобы собрать массив со всеми сущностями .select
const select = document.querySelectorAll(".select");

// если массив не пустой, пробегаемся в цикле по каждой найденой сущности
if (select.length) {
  select.forEach((item) => {
    // достаем из текущей сущности .select__current
    const selectCurrent = item.querySelector(".select__current");

    item.addEventListener("click", (event) => {
      const el = event.target.dataset.choice;
      const text = event.target.innerText;

      // Проверяем является ли это choosen и не выбрано ли его значение уже
      if (el === "choosen" && selectCurrent.innerText !== text) {
        selectCurrent.innerText = text;
      }

      item.classList.toggle("is-active");
    });
  });
}


// -----------------  Гамбургер  --------------------
$(".mobile-more__btn").click(function (event) {
  $(".mobile-more__btn").toggleClass("mobile-more__btn--active"),
    $(".mobile__menu ").toggleClass("mobile__menu__active");
});

// ----------------- Аккордион --------------------
/**
 * Классы для аккордиона
 */
// const accordeon = {
//   CLASS: 'accordion',
//   CLASS_ACTIVE: 'accordion__active',
// }

// /**
//  * acc - неизменная переменная для работы с аккордионом
//  */
// const acc = document.querySelectorAll(`.${accordeon.CLASS}`);
// let openedAccordeon = null;

// /**
//  * использует nextElementSibling для открытия или закрытия аккордиона
//  */
// function closeAccordeon(acc) {
//   acc.nextElementSibling.style.maxHeight = 0;
//   acc.classList.remove(accordeon.CLASS_ACTIVE);
// }


// function openAccordeon(acc) {
//   acc.nextElementSibling.style.maxHeight = `${acc.nextElementSibling.scrollHeight}px`;
//   acc.classList.add(accordeon.CLASS_ACTIVE);
// }

// /**
//  * Проверка на открытие аккордиона !nextElementSibling!
//  */
// function isAccordeonOpen(acc) {
//   acc.nextElementSibling && !acc.nextElementSibling.style.maxHeight
// }

/**
 * Итерация, реализация переключения открытого аккордиона
 *
 */
// for (const accordeon of acc) {
//   accordeon.addEventListener("click", function () {
//     const currentAccordeon = this;

//     openedAccordeon && closeAccordeon(openedAccordeon);

//     if (isAccordeonOpen(currentAccordeon)) {
//       closeAccordeon(currentAccordeon);
//     } else {
//       openAccordeon(currentAccordeon);
//       openedAccordeon = currentAccordeon;
//     }
//   });
// };

// --------------

// const accordionList = document.getElementsByClassName("accordion--multiple");
// const classNameActive = "accordion__active";

// for (const accordion of accordionList) {
//   accordion.addEventListener("click", function () {
//     this.classList.toggle(classNameActive);
//     const panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }

// $(".accordion-wrapper__title").click(function () {
//   $(this).toggleClass("accordion-wrapper__title--active");
//   $(this).siblings('.filter-list').toggleClass("filter-list--active");
//   $('.accordion-wrapper__title').not(this).removeClass("accordion-wrapper__title--active");
//   $('.accordion-wrapper__title').not(this).siblings('.filter-list').removeClass("filter-list--active");
// });


$('select').niceSelect();



// $('.basket-link').click(
//   function() {
//     $('.basked-popup').fadeIn('slow');
//   },
//   function() {
//     $('.basked-popup').fadeOut('slow');
//   }
// );



  $('.basket-link').click(function() {
    var state = 1
    return function() {
      if (state === 1) {
        state = 2
        $('.basked-popup').fadeIn('fast');
      } else if (state === 2) {
        state = 1
        $('.basked-popup').fadeOut('fast');
      }
    }
  }());







$('body').on('click', '.number-minus, .number-plus', function(){
  var $row = $(this).closest('.number');
  var $input = $row.find('.number-text');
  var step = $row.data('step');
  var val = parseFloat($input.val());
  if ($(this).hasClass('number-minus')) {
    val -= step;
  } else {
    val += step;
  }
  $input.val(val);
  $input.change();
  return false;
});

$('body').on('change', '.number-text', function(){
  var $input = $(this);
  var $row = $input.closest('.number');
  var step = $row.data('step');
  var min = parseInt($row.data('min'));
  var max = parseInt($row.data('max'));
  var val = parseFloat($input.val());
  if (isNaN(val)) {
    val = step;
  } else if (min && val < min) {
    val = min;
  } else if (max && val > max) {
    val = max;
  }
  $input.val(val);
});







});





