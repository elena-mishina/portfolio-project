$(document).ready(function () {

    //Валидация поля телефона 
    $(".phone").mask("+7(999)999-99-99");

    //Ф-ция для позиции курсора
    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    //Ф-ция для позиции курсора для нашего поля phone
    $('.phone').click(function () {
        $(this).setCursorPosition(3); // set position number
    });

    // Мобильное меню
    const toggleMenu = document.querySelector('.toggle-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('#overlay');
    const bodyEl = document.body;

    toggleMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        bodyEl.classList.toggle('no-scroll');
    });

    mobileMenu.addEventListener('click', function() {
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        overlay.classList.remove('active');
        bodyEl.classList.remove('no-scroll');
    });

    overlay.addEventListener('click', function() {
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        bodyEl.classList.remove('no-scroll');
    });

    // Подключение точек пагинации справа page-nav
	$('#page-nav').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {}
	});

    let containerEl = document.querySelector ('#projects-cards');
    let mixer = mixitup(containerEl, {
        classNames: {
            block: ""
        }
    });

    const filterToggles = document.querySelectorAll('.projects__menu button');
    const portfolioBigCards = document.querySelectorAll('.project__card');

    for (let i = 0; i < filterToggles.length; i++) {
        filterToggles[i].addEventListener('click', function () {
            if (i == 0) {
                for (let j = 0; j < 2; j++) {
                    portfolioBigCards[j].classList.add('project__card--big')
                }
            } else {
                for (let j = 0; j < 2; j++) {
                    portfolioBigCards[j].classList.remove('project__card--big')
                }
            }
        });
    }

    // form placeholder
    const formItems = document.querySelectorAll('.contact-form__field');
        
    for(let item of formItems){
        const thisParent = item.closest('.contact-form__item');
        const thisPlaceholder = thisParent.querySelector('.fake-placeholder');

        // Если инпут в фокусе		
        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('active');
        });

        // // Если инпут теряет фокус
        // item.addEventListener('blur', function(){

        //     if(item.value.length > 0){
        //         thisPlaceholder.classList.add('active');
        //     }
        //     else{
        //         thisPlaceholder.classList.remove('active');
        //     }
        // });

        // Если инпут теряет фокус
        item.addEventListener('blur', function(){
            
            if(item.classList.contains('phone')){
            	let phone = document.querySelector('.phone');
				let arr = [];
				for(let i = 0; i < phone.value.length; i++){
				    if(phone.value.charCodeAt(i) > 47 && phone.value.charCodeAt(i) < 58) arr.push(phone.value[i])}
				
				if(arr.length != 11) thisPlaceholder.classList.remove('active')
            }
            else {
            	if(item.value.length > 0){
                thisPlaceholder.classList.add('active');
	            	}
	            	else{
		                thisPlaceholder.classList.remove('active');
		            }
        		}
        })
    }

    //FORM VALIDATE
    $('.contact-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Введите email',
                email: 'Отсутствует символ @'
            },
            tel: {
                required: 'Введите номер телефона'
            },
            subject: {
                required: 'Введите тему сообщения'
            },
            message: {
                required: 'Введите текст сообщения'
            }
        },
        submitHandler: function (form) {
            ajaxFormSubmit();
        }
    });

    // Функция AJAX запрoса на сервер
	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Сохраняем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие данyые отправляем, в данном случае отправляем переменную string

			// Функция, если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false, чтобы прервать цепчку срабатывания остальных функций
		return false;
    }
    
    // ПАРАЛЛАКС ДВИЖЕНИЯ ЗА МЫШКОЙ

    let prxScene = document.querySelector('.contacts')
    let prxItem = document.querySelectorAll('.move-quotes');
    prxScene.addEventListener('mousemove', function (e) {
	let x = e.clientX / window.innerWidth;
	let y = e.clientY / window.innerHeight;
	for (let item of prxItem) {
		item.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
	    }
    });

    //Отображение/скрытие карточек проектов по загрузке страницы
	if($(window).width() <1200){
		$('.project__card.hide-card').hide();
		
		$('.projects__all-cards').on('click', function(){
			$('.project__card.hide-card').fadeIn();
			$(this).hide();
		})
	}
	else{
		$('.project__card.hide-card').fadeIn();
		$('.projects__all-cards').hide();
    }

	//Отображение/скрытие карточек проектов при ресайзе страницы
	$(window).on('resize', function(){
		if($(window).width() <1200){
			$('.project__card.hide-card').hide();
			$('.projects__all-cards').fadeIn();

			$('.projects__all-cards').on('click', function(){
				$('.project__card.hide-card').fadeIn();
				$(this).css('display', 'none');
			});
		}
		else{
			$('.project__card.hide-card').fadeIn();
			$('.projects__all-cards').hide();
		}
    });
    
    // Показать кнопку наверх
    $('backTop').hide();
    $(window).scroll(function(){
        if($(this).width() < 1200){
            if($(this).scrollTop() > 500){
                $('#backTop').fadeIn();
            }
        }
        else{
            $('#backTop').fadeOut();
        }
    });
})