;(function () {

	const navSubBtnIconDown = $('.Nav__subBtnIconDown');
	const navSubBtnIconUp = $('.Nav__subBtnIconUp');
	const navSubContent = $(".Nav__subContent");
	const navMenu = $('.Nav__menu');

	let navMenuDisplayState = () => {
		if ($(window).outerWidth() >= 992) {
			navMenu.css("display", '')
		} else {
			navMenu.css("display", "none")
		}
	};
	let navSlideUp = () => {
		navSubContent.slideUp("slow")
		navSubBtnIconUp.addClass('Nav__subBtnIcon_active')
		navSubBtnIconDown.removeClass('Nav__subBtnIcon_active')
	};
	let navSlideDown = () => {
		navSubContent.slideDown("slow")
		navSubBtnIconUp.removeClass('Nav__subBtnIcon_active')
		navSubBtnIconDown.addClass('Nav__subBtnIcon_active')
	}
	let navInit = () => {
		navMenuDisplayState()
		navSubBtnIconUp.addClass('Nav__subBtnIcon_active')
	}

	;
	$(window).resize(() => {
		navMenuDisplayState();
	});
	$(window).scroll(() => {
		if($(window).scrollTop() > 40){
			$('.Nav').addClass('Nav_sticky')
		
		} else{
			$('.Nav').removeClass('Nav_sticky')
		}
	});

	$(".Nav__sub").on("click", (e) => {
		const t = e.target;
		const target = $(t);
		let navSubContent = target.parents(".Nav__sub").children('.Nav__subContent')
		if (navSubContent.is(':hidden')) {
			navSlideDown();
		} else {
			navSlideUp()
		}
	});
	$('.Nav__btn').on('click', () => {
		$(navMenu).slideToggle('slow');
	})
	$(document).mouseup((e) => {
		if (!navSubContent.is(e.target) &&
			navSubContent.has(e.target).length === 0) {
			navSlideUp();
		}
	})
	navInit()
}());