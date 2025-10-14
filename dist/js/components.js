"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var header = document.querySelector('header');
var recalcAccordionHeight;
window.addEventListener('load', function () {
  // Custom VH
  var vh = window.innerHeight * 0.01;
  var vw = document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  document.documentElement.style.setProperty('--vw', "".concat(vw, "px"));
  window.addEventListener('resize', function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    var vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', "".concat(vw, "px"));
  });
  if (header) {
    document.documentElement.style.setProperty('--header-height', "".concat(header.getBoundingClientRect().height, "px"));
    document.documentElement.style.setProperty('--header-height-holder', "".concat(header.getBoundingClientRect().height, "px"));
  }
});

// Remove class
function removeClass(nodes, className) {
  nodes.forEach(function (node) {
    node.classList.remove(className);
  });
}
function addClass(nodes, className) {
  nodes.forEach(function (node) {
    node.classList.add(className);
  });
}
var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

// burger click
var burgers = document.querySelectorAll('.js-burger'),
  headerOverlay = document.querySelector('.header-overlay'),
  btnMenuProducts = document.querySelector('.js-show-menu-products'),
  btnCloseMenuProducts = document.querySelector('.js-btn-close-menu-products');
if (burgers.length > 0) {
  burgers.forEach(function (burger) {
    burger.addEventListener('click', function () {
      if (burger.closest('.menu-products')) {
        header.classList.remove('show-menu-products');
        header.classList.remove('show-menu');
        document.body.classList.remove('lock');
      } else {
        header.classList.toggle('show-menu');
        document.body.classList.toggle('lock');
      }
    });
  });
}
if (btnMenuProducts) {
  btnMenuProducts.addEventListener('click', function () {
    if (window.matchMedia('(min-width: 1200px)').matches) {
      document.body.classList.toggle('lock');
    } else {
      document.body.classList.add('lock');
    }
    header.classList.toggle('show-menu-products');
    headerOverlay.classList.toggle('active');
  });
}
if (btnCloseMenuProducts) {
  btnCloseMenuProducts.addEventListener('click', function () {
    header.classList.toggle('show-menu-products');
  });
}
if (headerOverlay) {
  headerOverlay.addEventListener('click', function () {
    document.body.classList.remove('lock');
    header.classList.remove('show-menu-products');
    headerOverlay.classList.remove('active');
  });
}

// lang switcher
var langSwitcher = document.querySelector('.lang-switcher');
if (langSwitcher) {
  langSwitcher.querySelector('span').addEventListener('click', function () {
    langSwitcher.classList.toggle('active');
  });
}
document.documentElement.addEventListener('click', function (e) {
  if (!e.target.closest('.lang-switcher')) {
    langSwitcher.classList.remove('active');
  }
});
var btnScrollTopFixed = document.querySelector('._js-scroll-top');
if (btnScrollTopFixed) {
  btnScrollTopFixed.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// modals
var btnShowModal = document.querySelectorAll('.js-show-modal'),
  modalOverlay = document.querySelector('.modal-overlay'),
  modalClose = document.querySelectorAll('.js-modal-close');
if (btnShowModal.length > 0) {
  btnShowModal.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var modal = document.querySelector(".js-modal-".concat(btn.dataset.modal));
      showModal(modal);
    });
  });
}
if (modalClose.length > 0) {
  modalClose.forEach(function (close) {
    close.addEventListener('click', function () {
      close.closest('.js-modal').classList.remove('active');
      modalOverlay.classList.remove('active');
      document.body.classList.remove('lock');
    });
  });
}
if (modalOverlay) {
  modalOverlay.addEventListener('click', function () {
    closeAllModals();
    modalOverlay.classList.remove('active');
    document.body.classList.remove('lock');
  });
}
function closeAllModals() {
  document.querySelectorAll('.js-modal').forEach(function (modal) {
    modal.classList.remove('active');
  });
}
function showModal(modal) {
  if (modal) {
    modalOverlay.classList.add('active');
    modal.classList.add('active');
    document.body.classList.add('lock');
    if (modal.classList.contains('modal-callback')) {
      closeAllModals();
      modal.classList.add('active');
      header.classList.remove('show-menu');
    }
  }
}
document.documentElement.addEventListener('click', function (e) {
  if (e.target.closest('.js-zoom-modal') && !e.target.closest('.modal-content')) {
    closeModal(e.target.closest('.js-zoom-modal'));
  }
});
function closeModal(modal) {
  if (modal) {
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.classList.remove('lock');
  }
}
function showAlert(type, title, description) {
  var showBtn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var btnText = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var additionalClass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  // type: success, error
  var alert = document.querySelector(".modal-alert.alert-".concat(type));
  if (alert !== undefined && alert !== null) {
    if (title) {
      alert.querySelector('.modal-title').innerHTML = title;
    }
    if (description) {
      alert.querySelector('.modal-desc').innerHTML = description;
      alert.classList.add('has-description');
    } else {
      alert.classList.remove('has-description');
    }
    if (showBtn) {
      alert.classList.add('show-btn');
      alert.querySelector('.alert-btn').innerHTML = btnText;
    } else {
      alert.classList.remove('show-btn');
      alert.querySelector('.alert-btn').innerHTML = '';
    }

    // additinal class
    alert.classList.forEach(function (className) {
      if (className.startsWith('additional-class-')) {
        element.classList.remove(className);
      }
    });
    if (additionalClass && additionalClass !== '') {
      alert.classList.add(additionalClass);
    }
    closeAllModals();
    showModal(alert);
  }
}

// setTimeout(() => {
//     showAlert('success', 'Дякуємо', 'text');    
// }, 1000)

// accordion
window.addEventListener('load', function () {
  var accordionBlocks = document.querySelectorAll('.js-accordion');
  if (accordionBlocks.length > 0) {
    accordionBlocks.forEach(function (accordionBlock) {
      var btns = accordionBlock.querySelectorAll('.js-accordion-btn'),
        content = accordionBlock.querySelector('.js-accordion-content');
      accordionBlock.style.setProperty('--max-height', "".concat(content.getBoundingClientRect().height, "px"));
      accordionBlock.classList.add('_init');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          accordionBlock.classList.toggle('active');
          if (btn.dataset.text && btn.dataset.text !== '') {
            var btnSpan = btn.querySelector('span');
            var text = btnSpan.textContent;
            btnSpan.textContent = btn.dataset.text;
            btn.dataset.text = text;
          }
        });
      });
    });
  }
});
if (document.querySelector('#maskinput-script')) {
  document.querySelector('#maskinput-script').addEventListener('load', function () {
    initMaskPhone();
    initMaskPhoneVanilla();
    initMaskEmail();
    initMaskNumbers();
  });
}
if (document.querySelector('#intl-tel')) {
  document.querySelector('#intl-tel').addEventListener('load', function () {
    initIntlTel();
  });
}

// Mask Phone
function initMaskPhone() {
  var mask_phones = document.querySelectorAll('._js-mask-phone');
  if (mask_phones.length !== 0) {
    mask_phones.forEach(function (phone) {
      var mask = new Inputmask({
        showMaskOnHover: false,
        regex: '^\\+38(03[9-9]|04[4-4]|05[0-0]|063|066|067|068|07[3-3]|09[1-9])[0-9]{7}',
        placeholder: " ",
        onBeforeMask: function onBeforeMask(value, opts) {
          return value.replace(/^(0|\+?380)/, "");
        }
      });
      mask.mask(phone);
    });
  }
}
function initMaskPhoneVanilla() {
  var mask_phones = document.querySelectorAll('._js-mask-phone-vanilla');
  if (mask_phones.length !== 0) {
    mask_phones.forEach(function (phone) {
      var mask = new Inputmask({
        showMaskOnHover: false,
        //mask: "+38 (999) 999-99-99",
        mask: "+389999999999",
        placeholder: " ",
        onBeforeMask: function onBeforeMask(value, opts) {
          return value.replace(/^(0|\+?380)/, "");
        }
      });
      mask.mask(phone);
    });
  }
}
function initMaskNumbers() {
  var mask_phones = document.querySelectorAll('._js-mask-numbers');
  if (mask_phones.length !== 0) {
    mask_phones.forEach(function (phone) {
      var mask = new Inputmask({
        showMaskOnHover: false,
        regex: '^[0-9]+$',
        placeholder: " ",
        onBeforeMask: function onBeforeMask(value, opts) {
          return value.trim();
        }
      });
      mask.mask(phone);
    });
  }
}

// Mask Email
function initMaskEmail() {
  var mask_email = document.querySelectorAll('._js-mask-email');
  if (mask_email.length !== 0) {
    mask_email.forEach(function (email) {
      var mask = new Inputmask({
        showMaskOnHover: false,
        mask: "*{1,100}[.*{1,100}][.*{1,100}][.*{1,100}]@*{1,50}[.*{2,20}][.*{1,20}]",
        placeholder: " ",
        greedy: false,
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          pastedValue = pastedValue.toLowerCase();
          return pastedValue.replace("mailto:", "");
        },
        definitions: {
          '*': {
            validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
            casing: "lower"
          }
        }
      });
      mask.mask(email);
    });
  }
}
function initIntlTel() {
  var inputs = document.querySelectorAll('._js-mask-numbers');
  inputs.forEach(function (input) {
    window.intlTelInput(input, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
      // initialCountry: 'ua',
      separateDialCode: true,
      autoInsertDialCode: true,
      nationalMode: false
      // showFlags: false
      // preferredCountries: ['ua', 'pl'],
    });
  });
}

// tabs
var tabs = document.querySelectorAll('.js-tab');
if (tabs.length) {
  tabs.forEach(function (tab) {
    var btns = tab.querySelectorAll('.js-tab-btn'),
      items = tab.querySelectorAll('.js-tab-item');
    if (btns.length > 0) {
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          removeClass(btns, 'active');
          removeClass(items, 'active');
          btn.classList.add('active');
          tab.querySelector(".js-tab-item[data-id=\"".concat(btn.dataset.id, "\"]")).classList.add('active');
        });
      });
    }
  });
}

// Delete margin in editor block
if (document.querySelector('.js-custom-editor')) {
  document.querySelectorAll('.js-custom-editor').forEach(function (block) {
    if (block.firstElementChild) {
      block.firstElementChild.style.marginTop = '0px';
    }
    if (block.lastElementChild) {
      block.lastElementChild.style.marginBottom = '0px';
    }
  });
}

// show clear btn for input
var inputTextBlocks = document.querySelectorAll('.form-group.text');
inputTextBlocks.forEach(function (block) {
  var input = block.querySelector('.form-group__input'),
    btnClear = block.querySelector('.btn-clear');
  input.addEventListener('input', function () {
    if (input.value.length > 0) {
      block.classList.add('has-value');
    } else {
      block.classList.remove('has-value');
    }
  });
  if (input.value.length > 0) {
    block.classList.add('has-value');
  } else {
    block.classList.remove('has-value');
  }
  if (btnClear) {
    btnClear.addEventListener('click', function () {
      input.value = '';
      block.classList.remove('has-value');
      input.focus();
    });
  }
});

// Validate inputs
var form_groups_required = document.querySelectorAll('.form-group.required, .form-group.valid-not-required, .form-group__radios.required');
form_groups_required.forEach(function (form_group) {
  return validate(form_group);
});
function validate(form_group) {
  // console.log(form_group);

  var valid_type_arr = form_group.dataset.valid.split(',');
  if (valid_type_arr.length > 0) {
    var error_count = 0;
    var _loop = function _loop(i) {
      var valid_type = valid_type_arr[i];
      if (valid_type_arr[i].indexOf('maxlength') !== -1) {
        valid_type = 'maxlength';
      }
      switch (valid_type) {
        case 'empty':
          {
            form_group.querySelector('input, textarea').addEventListener('blur', function () {
              if (form_group.classList.contains('required')) {
                if (i === 0) {
                  error_count = +!validateField(form_group, valid_type);
                } else {
                  if (error_count === 0) {
                    error_count = +!validateField(form_group, valid_type);
                  }
                }
              }
            });
            break;
          }
        case 'mask':
          {
            form_group.querySelector('input').addEventListener('blur', function () {
              if (form_group.classList.contains('required')) {
                if (i === 0) {
                  error_count = +!validateField(form_group, valid_type);
                } else {
                  if (error_count === 0) {
                    error_count = +!validateField(form_group, valid_type);
                  }
                }
              }
            });
            break;
          }
        case 'checkbox':
          {
            form_group.querySelector('input').addEventListener('change', function () {
              if (form_group.classList.contains('required')) {
                if (i === 0) {
                  error_count = +!validateField(form_group, valid_type);
                } else {
                  if (error_count === 0) {
                    error_count = +!validateField(form_group, valid_type);
                  }
                }
              }
            });
            break;
          }
        case 'maxlength':
          {
            form_group.querySelector('input, textarea').addEventListener('blur', function () {
              if (i === 0) {
                error_count = +!validateField(form_group, valid_type_arr[i]);
              } else {
                if (error_count === 0) {
                  error_count = +!validateField(form_group, valid_type_arr[i]);
                }
              }
            });
            break;
          }
        case 'cyrillic':
          {
            form_group.querySelector('input, textarea').addEventListener('blur', function () {
              if (i === 0) {
                error_count = +!validateField(form_group, valid_type);
              } else {
                if (error_count === 0) {
                  error_count = +!validateField(form_group, valid_type);
                }
              }
            });
            break;
          }
        case "radios":
          {
            form_group.querySelectorAll('input[type="radio"]').forEach(function (input) {
              input.addEventListener('change', function () {
                if (i === 0) {
                  error_count = +!validateField(form_group, valid_type);
                } else {
                  if (error_count === 0) {
                    error_count = +!validateField(form_group, valid_type);
                  }
                }
              });
            });
            break;
          }
      }
    };
    for (var i = 0; i < valid_type_arr.length; i++) {
      _loop(i);
    }
  }
}
function validateField(form_group, valid_type) {
  var maxlength;
  if (valid_type.indexOf('maxlength') !== -1) {
    maxlength = valid_type.split('-')[1];
    valid_type = 'maxlength';
  }
  switch (valid_type) {
    case 'empty':
      {
        var input = form_group.querySelector('input, textarea');
        if (input.value.trim() === "") {
          form_group.classList.add('has-error');
          form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.empty;
          return false;
        } else {
          form_group.classList.remove('has-error');
        }
        return true;
      }
    case 'mask':
      {
        var _input = form_group.querySelector('input');
        if (_input.inputmask.isComplete()) {
          form_group.classList.remove('has-error');
        } else {
          form_group.classList.add('has-error');
          form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.empty;
          return false;
        }
        return true;
      }
    case 'checkbox':
      {
        var _input2 = form_group.querySelector('input');
        if (_input2.checked) {
          form_group.classList.remove('has-error');
        } else {
          form_group.classList.add('has-error');
          form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.empty;
          return false;
        }
        return true;
      }
    case 'select':
      {
        var select_target = form_group.querySelector('[data-select]');
        var val = '';
        if (select_target.dataset.type === 'button') {
          val = form_group.querySelector('button').value.trim();
        } else {
          val = form_group.querySelector('input[type="hidden"]').value.trim();
        }
        if (val === '') {
          form_group.classList.add('has-error');
          return false;
        } else {
          form_group.classList.remove('has-error');
        }
        return true;
      }
    case 'maxlength':
      {
        var _input3 = form_group.querySelector('input, textarea');
        if (_input3.value.length > maxlength) {
          form_group.classList.add('has-error');
          form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.maxlength;
          return false;
        } else {
          form_group.classList.remove('has-error');
        }
        return true;
      }
    case 'cyrillic':
      {
        var _input4 = form_group.querySelector('input, textarea');
        // let regex = /^[а-яіїє' -]+$/gi;
        var regex = /^([а-яіїє' -]+)?$/gi;
        if (!regex.test(_input4.value)) {
          form_group.classList.add('has-error');
          form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.cyrillic;
          return false;
        } else {
          form_group.classList.remove('has-error');
        }
        return true;
      }
    case 'radios':
      {
        var radio = form_group.querySelector('input[type="radio"]:checked');
        if (radio === null) {
          form_group.classList.add('has-error');
          return false;
        } else {
          form_group.classList.remove('has-error');
        }
        return true;
      }
  }
}
function validateSingleField(form_group) {
  // console.log(form_group);

  if (form_group.classList.contains('required')) {
    var valid_type_arr = form_group.dataset.valid.split(',');
    var error_valid_count = 0;
    for (var i = 0; i < valid_type_arr.length; i++) {
      var valid_type = valid_type_arr[i];
      if (valid_type_arr[i].indexOf('maxlength') !== -1) {
        valid_type = 'maxlength';
      }
      if (i === 0) {
        // error_valid_count = ;
        if (!validateField(form_group, valid_type_arr[i])) {
          error_valid_count = 1;
        } else {
          error_valid_count = 0;
        }
      } else {
        if (error_valid_count === 0) {
          if (!validateField(form_group, valid_type_arr[i])) {
            error_valid_count = 1;
          } else {
            error_valid_count = 0;
          }
        }
      }
    }
    return error_valid_count > 0 ? true : false;
  } else {
    return false;
  }
}
function validateForm(form) {
  var required_fields = form.querySelectorAll('.required');
  var errors = 0;
  var errors_fields = [];
  required_fields.forEach(function (form_group) {
    var valid_type_arr = form_group.dataset.valid.split(',');
    var error_valid_count = 0;
    for (var i = 0; i < valid_type_arr.length; i++) {
      var valid_type = valid_type_arr[i];
      if (valid_type_arr[i].indexOf('maxlength') !== -1) {
        valid_type = 'maxlength';
      }
      if (i === 0) {
        // error_valid_count = ;
        if (!validateField(form_group, valid_type_arr[i])) {
          error_valid_count = 1;
          errors += 1;
          errors_fields.push(form_group);
        } else {
          error_valid_count = 0;
        }
      } else {
        if (error_valid_count === 0) {
          if (!validateField(form_group, valid_type_arr[i])) {
            error_valid_count = 1;
            errors += 1;
            errors_fields.push(form_group);
          } else {
            error_valid_count = 0;
          }
        }
      }
    }
  });
  if (errors === 0) {
    return true;
  } else {
    console.log(errors_fields);
    errors_fields[0].scrollIntoView({
      behavior: 'smooth',
      block: "center"
    });
    return false;
  }
}
function resetForm(form) {
  form.reset();
  var form_groups = form.querySelectorAll('.form-group');
  form_groups.forEach(function (form_group) {
    form_group.classList.remove('focus');
  });
}
function toggleRequired(block, action) {
  var requiredElems = block.querySelectorAll('[data-required]');
  if (action === 'add') {
    requiredElems.forEach(function (item) {
      item.classList.add('required');
      validate(item);
    });
  } else {
    requiredElems.forEach(function (item) {
      item.classList.remove('required');
      item.classList.remove('has-error');
    });
  }
}
function debounce(func) {
  var _this = this;
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(_this, args);
    }, timeout);
  };
}

// text holder
var textHolderBlocks = document.querySelectorAll('.js-text-holder');
textHolderBlocks.forEach(function (textHolderBlock) {
  var textHolder = textHolderBlock.querySelector('.js-text-holder-content'),
    btn = textHolderBlock.querySelector('.js-text-holder-btn');
  var maxHeight = textHolder.getBoundingClientRect().height;
  var curentHeight = textHolder.querySelector('.editor').getBoundingClientRect().height;
  if (curentHeight <= maxHeight) {
    btn.classList.add('hide');
  }
  btn.addEventListener('click', function () {
    textHolder.classList.toggle('active');
    btn.classList.toggle('active');
    var text = btn.textContent;
    btn.querySelector('span').textContent = btn.dataset.text;
    btn.dataset.text = text;
  });
});

// donut animation
// const donuts = document.querySelectorAll('.donut .donut-progress');
// if (donuts.length) {
//     donuts.forEach(donut => {
//         setTimeout(() => {
//             donut.style.setProperty('--percent', donut.dataset.percent);
//         }, 500);
//     })
// }
// product page, key click
// const productKeyBlock = document.querySelector('#key-block');
// if (productKeyBlock) {
//     const btns = productKeyBlock.querySelectorAll('.content-top .group'),
//         items = productKeyBlock.querySelectorAll('.content-main .main-item');

//     btns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             const id = btn.dataset.id;
//             removeClass(btns, 'active');
//             removeClass(items, 'active');

//             btn.classList.add('active');
//             console.log(id);
//             const item = productKeyBlock.querySelector(`.content-main .main-item[data-id="${id}"]`);

//             if (item) {
//                 const styles = getComputedStyle(btn);
//                 const color = styles.getPropertyValue('--color').trim();
//                 const hoverColor = styles.getPropertyValue('--hover-color').trim();

//                 item.classList.add('active');
//                 item.style.setProperty('--color', color);
//                 item.style.setProperty('--hover-color', hoverColor);

//                 item.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'center',
//                 });
//             }

//         })
//     })

// }

// search
var searchBtb = document.querySelectorAll('.js-search-btn'),
  searchHolder = document.querySelector('.search-holder');
if (searchBtb.length > 0 && searchHolder) {
  searchBtb.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      searchHolder.classList.toggle('active');
      searchHolder.querySelector('input').focus();
    });
  });
  // searchBtb.addEventListener('click', () => {
  //     searchHolder.classList.toggle('active');
  // })

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-holder') && !e.target.closest('.js-search-btn')) {
      searchHolder.classList.remove('active');
    }
  });
}

// Tooltip
var tippyInstance = [];
window.addEventListener('load', onloadTooltip);
function onloadTooltip() {
  if (typeof analytic_text_json !== 'undefined') {
    if ((typeof analytic_text_json === "undefined" ? "undefined" : _typeof(analytic_text_json)) !== "object") {
      analytic_text_json = JSON.parse(analytic_text_json);
    }
  }
  var tooltips = document.querySelectorAll('.js-tooltip:not(._init)');
  if (tooltips.length > 0) {
    tooltips.forEach(function (tooltip) {
      var offset = tooltip.dataset.offset !== undefined ? tooltip.dataset.offset.split(',').map(function (str) {
        return parseInt(str, 10);
      }) : [];
      var interactive = tooltip.dataset.interactive !== undefined;
      var breakpoints = tooltip.dataset.breakpoints;
      var options = {
        maxWidth: 'none',
        interactive: interactive,
        onShow: function onShow(instance) {
          if (instance.props.content === null || instance.props.content.length === 0) {
            return false;
          }
          return instance;
        },
        onCreate: function onCreate(instance) {
          if (instance.props.content === null || instance.props.content.length === 0) {
            tooltip.remove();
            return false;
          }
          return instance;
        } // interactive: true,
      };
      if (offset.length > 0) {
        options.offset = offset;
      }
      if (tooltip.dataset.placement !== undefined) {
        options.placement = tooltip.dataset.placement;
      }
      // if (breakpoint_desktop.matches) {
      //     if (tooltip.dataset.deskPlacement !== undefined) {
      //         options.placement = tooltip.dataset.deskPlacement;
      //     }
      // }

      // Якщо потрібно вставити HTML структуру
      if (tooltip.dataset.content !== undefined) {
        var tooltip_content = document.querySelector("#".concat(tooltip.dataset.content));
        options.content = tooltip_content.innerHTML;
        options.allowHTML = true;
      } else if (tooltip.dataset.text !== undefined) {
        // Якщо потрібно вставити тільки текст
        options.content = tooltip.dataset.text;
      } else if (tooltip.dataset.analyticId !== undefined) {
        var id = tooltip.dataset.analyticId;
        options.allowHTML = true;
        if (typeof analytic_text_json !== 'undefined' && analytic_text_json[id] !== undefined && analytic_text_json[id] !== null) {
          options.content = analytic_text_json[id];
        }
      }
      if (breakpoints !== undefined) {
        if (breakpoints === '768' && !breakpoint_mob.matches) {
          tippyInstance.push(tippy(tooltip, options));
        }
      } else {
        tippyInstance.push(tippy(tooltip, options));
      }
      tooltip.addEventListener('click', function (e) {
        if (!e.target.classList.contains('allow-link')) {
          e.preventDefault();
        }
      });
      tooltip.classList.add('_init');
    });
  }
}

// const element = document.querySelector('.js-choice');
// const choices = new Choices(element);
var defaultSelect = document.querySelectorAll('.js-default-select');
defaultSelect.forEach(function (select) {
  new Choices(select, {
    searchEnabled: false
  });
});

// select-wheel-type

// zoom image
document.documentElement.addEventListener('click', function (e) {
  if (e.target.closest('.js-zoom')) {
    // showModal(e.target.closest('.js-zoom'));
    showZoomModal(e.target.closest('.js-zoom'));
  }
});
function showZoomModal(btn) {
  var src = btn.dataset.src;
  var modal = document.querySelector('.js-zoom-modal');
  modal.querySelector('img').src = src;
  modal.classList.add('active');
  modalOverlay.classList.add('active');
  document.body.classList.add('lock');
}