$(document).ready(function () {

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

        // Если инпут теряет фокус
        item.addEventListener('blur', function(){

            if(item.value.length > 0){
                thisPlaceholder.classList.add('active');
            }
            else{
                thisPlaceholder.classList.remove('active');
            }
        });
    }

    //FORM VALIDATE
    $('.contact-form').validate({
        rules: {
            email: {
                required: true,
                email: true
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

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

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
})