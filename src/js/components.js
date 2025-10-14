const header = document.querySelector('header');
let recalcAccordionHeight;

window.addEventListener('load', () => {
    // Custom VH
    let vh = window.innerHeight * 0.01;
    let vw = document.documentElement.clientWidth;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        let vw = document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    });

    if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
        document.documentElement.style.setProperty('--header-height-holder', `${header.getBoundingClientRect().height}px`);
    }
})

// Remove class
function removeClass(nodes, className) {
    nodes.forEach(node => {
        node.classList.remove(className);
    })
}

function addClass(nodes, className) {
    nodes.forEach(node => {
        node.classList.add(className);
    })
}
const supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;



// burger click
const burgers = document.querySelectorAll('.js-burger'),
    headerOverlay = document.querySelector('.header-overlay'),
    btnMenuProducts = document.querySelector('.js-show-menu-products'),
    btnCloseMenuProducts = document.querySelector('.js-btn-close-menu-products');


if (burgers.length > 0) {
    burgers.forEach(burger => {
        burger.addEventListener('click', () => {
            if (burger.closest('.menu-products')) {
                header.classList.remove('show-menu-products');
                header.classList.remove('show-menu');
                document.body.classList.remove('lock');
            } else {
                header.classList.toggle('show-menu');
                document.body.classList.toggle('lock');
            }
        })
    })
}
if (btnMenuProducts) {
    btnMenuProducts.addEventListener('click', () => {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            document.body.classList.toggle('lock');
        } else {
            document.body.classList.add('lock');
        }

        header.classList.toggle('show-menu-products');
        headerOverlay.classList.toggle('active');
    })
}
if (btnCloseMenuProducts) {
    btnCloseMenuProducts.addEventListener('click', () => {
        header.classList.toggle('show-menu-products');
    })
}
if (headerOverlay) {
    headerOverlay.addEventListener('click', () => {
        document.body.classList.remove('lock');
        header.classList.remove('show-menu-products');
        headerOverlay.classList.remove('active');
    })
}

// lang switcher
const langSwitcher = document.querySelector('.lang-switcher');
if (langSwitcher) {
    langSwitcher.querySelector('span').addEventListener('click', () => {
        langSwitcher.classList.toggle('active');
    })
}

document.documentElement.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switcher')) {
        langSwitcher.classList.remove('active');
    }
})

const btnScrollTopFixed = document.querySelector('._js-scroll-top');

if (btnScrollTopFixed) {
    btnScrollTopFixed.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}

// modals
const btnShowModal = document.querySelectorAll('.js-show-modal'),
    modalOverlay = document.querySelector('.modal-overlay'),
    modalClose = document.querySelectorAll('.js-modal-close');

if (btnShowModal.length > 0) {
    btnShowModal.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(`.js-modal-${btn.dataset.modal}`);
            showModal(modal);
        })
    })
}
if (modalClose.length > 0) {
    modalClose.forEach(close => {
        close.addEventListener('click', () => {
            close.closest('.js-modal').classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.classList.remove('lock');
        })
    })
}
if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
        closeAllModals();
        modalOverlay.classList.remove('active');
        document.body.classList.remove('lock');
    })
}

function closeAllModals() {
    document.querySelectorAll('.js-modal').forEach(modal => {
        modal.classList.remove('active');
    })
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
document.documentElement.addEventListener('click', (e) => {    
    if (e.target.closest('.js-zoom-modal') && !e.target.closest('.modal-content')) {
        closeModal(e.target.closest('.js-zoom-modal'));
    }
})

function closeModal(modal) {
    if (modal) {
        modalOverlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.classList.remove('lock');

    }
}

function showAlert(type, title, description, showBtn = false, btnText = '', additionalClass = '') {
    // type: success, error
    let alert = document.querySelector(`.modal-alert.alert-${type}`);

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
        alert.classList.forEach(className => {
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
window.addEventListener('load', () => {
    const accordionBlocks = document.querySelectorAll('.js-accordion');
    if (accordionBlocks.length > 0) {
        accordionBlocks.forEach(accordionBlock => {
            const btns = accordionBlock.querySelectorAll('.js-accordion-btn'),
                content = accordionBlock.querySelector('.js-accordion-content');

            accordionBlock.style.setProperty('--max-height', `${content.getBoundingClientRect().height}px`);
            accordionBlock.classList.add('_init');


            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    accordionBlock.classList.toggle('active');
                    if (btn.dataset.text && btn.dataset.text !== '') {
                        const btnSpan = btn.querySelector('span');
                        const text = btnSpan.textContent;
                        btnSpan.textContent = btn.dataset.text;
                        btn.dataset.text = text;
                    }
                })
            })
        })
    }
})

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
    let mask_phones = document.querySelectorAll('._js-mask-phone');
    if (mask_phones.length !== 0) {
        mask_phones.forEach(phone => {
            let mask = new Inputmask({
                showMaskOnHover: false,
                regex: '^\\+38(03[9-9]|04[4-4]|05[0-0]|063|066|067|068|07[3-3]|09[1-9])[0-9]{7}',
                placeholder: " ",
                onBeforeMask: function (value, opts) {
                    return value.replace(/^(0|\+?380)/, "");
                },
            });
            mask.mask(phone);
        })
    }
}

function initMaskPhoneVanilla() {
    let mask_phones = document.querySelectorAll('._js-mask-phone-vanilla');
    if (mask_phones.length !== 0) {
        mask_phones.forEach(phone => {
            let mask = new Inputmask({
                showMaskOnHover: false,
                //mask: "+38 (999) 999-99-99",
                mask: "+389999999999",
                placeholder: " ",
                onBeforeMask: function (value, opts) {
                    return value.replace(/^(0|\+?380)/, "");
                },
            });
            mask.mask(phone);
        })
    }
}

function initMaskNumbers() {
    let mask_phones = document.querySelectorAll('._js-mask-numbers');
    if (mask_phones.length !== 0) {
        mask_phones.forEach(phone => {
            let mask = new Inputmask({
                showMaskOnHover: false,
                regex: '^[0-9]+$',
                placeholder: " ",
                onBeforeMask: function (value, opts) {
                    return value.trim();
                },
            });
            mask.mask(phone);
        })
    }
}


// Mask Email
function initMaskEmail() {
    let mask_email = document.querySelectorAll('._js-mask-email');

    if (mask_email.length !== 0) {
        mask_email.forEach(email => {
            let mask = new Inputmask({
                showMaskOnHover: false,
                mask: "*{1,100}[.*{1,100}][.*{1,100}][.*{1,100}]@*{1,50}[.*{2,20}][.*{1,20}]",
                placeholder: " ",
                greedy: false,
                onBeforePaste: function (pastedValue, opts) {
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
        })
    }
}

function initIntlTel() {
    let inputs = document.querySelectorAll('._js-mask-numbers');

    inputs.forEach(input => {
        window.intlTelInput(input, {
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            // initialCountry: 'ua',
            separateDialCode: true,
            autoInsertDialCode: true,
            nationalMode: false,
            // showFlags: false
            // preferredCountries: ['ua', 'pl'],
        });
    })
}

// tabs
const tabs = document.querySelectorAll('.js-tab');
if (tabs.length) {
    tabs.forEach(tab => {
        const btns = tab.querySelectorAll('.js-tab-btn'),
            items = tab.querySelectorAll('.js-tab-item');

        if (btns.length > 0) {
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    removeClass(btns, 'active');
                    removeClass(items, 'active');

                    btn.classList.add('active');
                    tab.querySelector(`.js-tab-item[data-id="${btn.dataset.id}"]`).classList.add('active');
                })
            })
        }
    })
}

// Delete margin in editor block
if (document.querySelector('.js-custom-editor')) {
    document.querySelectorAll('.js-custom-editor').forEach(block => {
        if (block.firstElementChild) {
            block.firstElementChild.style.marginTop = '0px';
        }
        if (block.lastElementChild) {
            block.lastElementChild.style.marginBottom = '0px';
        }
    })
}

// show clear btn for input
const inputTextBlocks = document.querySelectorAll('.form-group.text');
inputTextBlocks.forEach(block => {
    const input = block.querySelector('.form-group__input'),
        btnClear = block.querySelector('.btn-clear');

    input.addEventListener('input', () => {
        if (input.value.length > 0) {
            block.classList.add('has-value');
        } else {
            block.classList.remove('has-value');
        }
    })
    if (input.value.length > 0) {
        block.classList.add('has-value');
    } else {
        block.classList.remove('has-value');
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            input.value = '';
            block.classList.remove('has-value');
            input.focus();
        })
    }
})

// Validate inputs
let form_groups_required = document.querySelectorAll('.form-group.required, .form-group.valid-not-required, .form-group__radios.required');
form_groups_required.forEach(form_group => validate(form_group))

function validate(form_group) {
    // console.log(form_group);

    const valid_type_arr = form_group.dataset.valid.split(',');

    if (valid_type_arr.length > 0) {
        let error_count = 0;
        for (let i = 0; i < valid_type_arr.length; i++) {
            let valid_type = valid_type_arr[i];
            if (valid_type_arr[i].indexOf('maxlength') !== -1) {
                valid_type = 'maxlength';
            }

            switch (valid_type) {
                case 'empty': {
                    form_group.querySelector('input, textarea').addEventListener('blur', () => {
                        if (form_group.classList.contains('required')) {
                            if (i === 0) {
                                error_count = +!validateField(form_group, valid_type);
                            } else {
                                if (error_count === 0) {
                                    error_count = +!validateField(form_group, valid_type);
                                }
                            }
                        }
                    })
                    break;
                }
                case 'mask': {
                    form_group.querySelector('input').addEventListener('blur', () => {
                        if (form_group.classList.contains('required')) {
                            if (i === 0) {
                                error_count = +!validateField(form_group, valid_type);
                            } else {
                                if (error_count === 0) {
                                    error_count = +!validateField(form_group, valid_type);
                                }
                            }
                        }
                    })
                    break;
                }
                case 'checkbox': {
                    form_group.querySelector('input').addEventListener('change', () => {
                        if (form_group.classList.contains('required')) {
                            if (i === 0) {
                                error_count = +!validateField(form_group, valid_type);
                            } else {
                                if (error_count === 0) {
                                    error_count = +!validateField(form_group, valid_type);
                                }
                            }
                        }
                    })
                    break;
                }
                case 'maxlength': {
                    form_group.querySelector('input, textarea').addEventListener('blur', () => {
                        if (i === 0) {
                            error_count = +!validateField(form_group, valid_type_arr[i]);
                        } else {
                            if (error_count === 0) {
                                error_count = +!validateField(form_group, valid_type_arr[i]);
                            }
                        }
                    })
                    break;
                }
                case 'cyrillic': {
                    form_group.querySelector('input, textarea').addEventListener('blur', () => {
                        if (i === 0) {
                            error_count = +!validateField(form_group, valid_type);
                        } else {
                            if (error_count === 0) {
                                error_count = +!validateField(form_group, valid_type);
                            }
                        }
                    })
                    break;
                }
                case "radios": {
                    form_group.querySelectorAll('input[type="radio"]').forEach(input => {
                        input.addEventListener('change', () => {
                            if (i === 0) {
                                error_count = +!validateField(form_group, valid_type);
                            } else {
                                if (error_count === 0) {
                                    error_count = +!validateField(form_group, valid_type);
                                }
                            }
                        })
                    })
                    break;
                }
            }
        }
    }
}

function validateField(form_group, valid_type) {
    let maxlength;
    if (valid_type.indexOf('maxlength') !== -1) {
        maxlength = valid_type.split('-')[1];
        valid_type = 'maxlength';
    }
    switch (valid_type) {
        case 'empty': {
            const input = form_group.querySelector('input, textarea');

            if (input.value.trim() === "") {
                form_group.classList.add('has-error');
                form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.empty;

                return false;
            } else {
                form_group.classList.remove('has-error');
            }

            return true;
        }
        case 'mask': {
            const input = form_group.querySelector('input');

            if (input.inputmask.isComplete()) {
                form_group.classList.remove('has-error');
            } else {
                form_group.classList.add('has-error');
                form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.empty;
                return false;
            }
            return true;
        }
        case 'checkbox': {
            const input = form_group.querySelector('input');
            if (input.checked) {
                form_group.classList.remove('has-error');
            } else {
                form_group.classList.add('has-error');
                form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.empty;
                return false;
            }
            return true;
        }
        case 'select': {
            let select_target = form_group.querySelector('[data-select]');
            let val = '';

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
        case 'maxlength': {
            const input = form_group.querySelector('input, textarea');

            if (input.value.length > maxlength) {
                form_group.classList.add('has-error');
                form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.maxlength;
                return false;
            } else {
                form_group.classList.remove('has-error');
            }

            return true;
        }
        case 'cyrillic': {
            const input = form_group.querySelector('input, textarea');
            // let regex = /^[а-яіїє' -]+$/gi;
            let regex = /^([а-яіїє' -]+)?$/gi;


            if (!regex.test(input.value)) {
                form_group.classList.add('has-error');
                form_group.querySelector('.help-block').innerHTML = form_group.querySelector('.help-block').dataset.cyrillic;

                return false;
            } else {
                form_group.classList.remove('has-error');
            }

            return true;
        }
        case 'radios': {
            const radio = form_group.querySelector('input[type="radio"]:checked');
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
        const valid_type_arr = form_group.dataset.valid.split(',');
        let error_valid_count = 0;

        for (let i = 0; i < valid_type_arr.length; i++) {
            let valid_type = valid_type_arr[i];

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

        return (error_valid_count > 0) ? true : false;
    } else {
        return false;
    }

}

function validateForm(form) {
    let required_fields = form.querySelectorAll('.required');
    let errors = 0;
    let errors_fields = [];

    required_fields.forEach(form_group => {
        const valid_type_arr = form_group.dataset.valid.split(',');
        let error_valid_count = 0;

        for (let i = 0; i < valid_type_arr.length; i++) {
            let valid_type = valid_type_arr[i];

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
            block: "center",
        });
        return false;
    }
}

function resetForm(form) {
    form.reset();
    let form_groups = form.querySelectorAll('.form-group');

    form_groups.forEach(form_group => {
        form_group.classList.remove('focus');
    })
}

function toggleRequired(block, action) {
    let requiredElems = block.querySelectorAll('[data-required]');

    if (action === 'add') {
        requiredElems.forEach(item => {
            item.classList.add('required');
            validate(item);
        })
    } else {
        requiredElems.forEach(item => {
            item.classList.remove('required');
            item.classList.remove('has-error');
        })
    }
}
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

// text holder
const textHolderBlocks = document.querySelectorAll('.js-text-holder');
textHolderBlocks.forEach(textHolderBlock => {
    const textHolder = textHolderBlock.querySelector('.js-text-holder-content'),
        btn = textHolderBlock.querySelector('.js-text-holder-btn');


    const maxHeight = textHolder.getBoundingClientRect().height;
    const curentHeight = textHolder.querySelector('.editor').getBoundingClientRect().height;

    if (curentHeight <= maxHeight) {
        btn.classList.add('hide');
    }

    btn.addEventListener('click', () => {
        textHolder.classList.toggle('active');
        btn.classList.toggle('active');
        const text = btn.textContent;
        btn.querySelector('span').textContent = btn.dataset.text;
        btn.dataset.text = text;
    })
})

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
const searchBtb = document.querySelectorAll('.js-search-btn'),
    searchHolder = document.querySelector('.search-holder');

if (searchBtb.length > 0 && searchHolder) {
    searchBtb.forEach(btn => {
        btn.addEventListener('click', (e) => {
            searchHolder.classList.toggle('active');
            searchHolder.querySelector('input').focus();
        })
    })
    // searchBtb.addEventListener('click', () => {
    //     searchHolder.classList.toggle('active');
    // })

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-holder') && !e.target.closest('.js-search-btn')) {
            searchHolder.classList.remove('active');
        }
    })
}

// Tooltip
let tippyInstance = [];
window.addEventListener('load', onloadTooltip)
function onloadTooltip() {
    if (typeof analytic_text_json !== 'undefined') {
        if (typeof analytic_text_json !== "object") {
            analytic_text_json = JSON.parse(analytic_text_json);
        }
    }

    let tooltips = document.querySelectorAll('.js-tooltip:not(._init)');
    if (tooltips.length > 0) {
        tooltips.forEach(tooltip => {
            let offset = tooltip.dataset.offset !== undefined ? tooltip.dataset.offset.split(',').map(str => parseInt(str, 10)) : [];
            const interactive = tooltip.dataset.interactive !== undefined;
            const breakpoints = tooltip.dataset.breakpoints;


            let options = {
                maxWidth: 'none',
                interactive: interactive,
                onShow(instance) {
                    if (instance.props.content === null || instance.props.content.length === 0) {
                        return false
                    }

                    return instance;
                },
                onCreate(instance) {
                    if (instance.props.content === null || instance.props.content.length === 0) {
                        tooltip.remove();
                        return false
                    }

                    return instance;
                },
                // interactive: true,
            }
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
                let tooltip_content = document.querySelector(`#${tooltip.dataset.content}`);

                options.content = tooltip_content.innerHTML;
                options.allowHTML = true;

            } else if (tooltip.dataset.text !== undefined) { // Якщо потрібно вставити тільки текст
                options.content = tooltip.dataset.text;
            } else if (tooltip.dataset.analyticId !== undefined) {
                const id = tooltip.dataset.analyticId;
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

            tooltip.addEventListener('click', (e) => {
                if (!e.target.classList.contains('allow-link')) {
                    e.preventDefault();
                }
            })

            tooltip.classList.add('_init');

        })
    }
}

// const element = document.querySelector('.js-choice');
// const choices = new Choices(element);
let defaultSelect = document.querySelectorAll('.js-default-select');
defaultSelect.forEach(select => {
    new Choices(select, {
        searchEnabled: false
    });
})

// select-wheel-type

// zoom image
document.documentElement.addEventListener('click', (e) => {
    if (e.target.closest('.js-zoom')) {
        // showModal(e.target.closest('.js-zoom'));
        showZoomModal(e.target.closest('.js-zoom'));
    }
})

function showZoomModal(btn){
    const src = btn.dataset.src;
    const modal = document.querySelector('.js-zoom-modal');

    modal.querySelector('img').src = src;
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.classList.add('lock');
}