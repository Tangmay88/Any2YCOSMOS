$(document).ready(function() {

	var box = $(".box"),
		orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
		temp = orginal,
		x = [],
		sec = 0,
		date1, date2,
		moves = 0,
		mm = 0,
		ss = 0,
		upIMG,
		images = [
			"images/img_Puzzle/cosmos.jpg",
			"images/img_Puzzle/sun_1.jpg",
			"images/img_Puzzle/cygnus_2.jpg",
			"images/img_Puzzle/bbrun.jpg",
			"images/img_Puzzle/cygnus.jpg",
			"images/img_Puzzle/kiss.jpg",
			"images/img_Puzzle/unititled.jpg"
		],
		musicList = [
			"music/yougetlucky.mp3",
			"music/kissถึง.mp3",
			"music/เฉี่ยว.mp3",
			"music/babyrun.mp3",
			"music/เฉี่ยว.mp3",
			"music/kissถึง.mp3",
			"music/แอบเผลอ.mp3",
			"music/yougetlucky.mp3"
		],
		img = 0;

	var music = new Audio();
	music.loop = true;

	$('.me').css({ "background-image": 'url(' + images[0] + ')' });

	$(".start").click(function() {
		$(".start").addClass('prevent_click');
		$(".start").delay(100).slideUp(500);
		$(".full").hide();
		$(".pre_img").addClass("prevent_click");

		date1 = new Date();
		Start();

		// 🔊 เล่นเพลง
		if (img === 7 && upIMG) {
			music.src = musicList[7];
		} else {
			music.src = musicList[img];
		}
		music.play();

		return 0;
	});

	function Start() {
		randomTile();
		changeBG(img);
		var count = 0, a, b;

		$(".me").click(function() {
			count++;
			if (count == 1) {
				a = $(this).attr("data-bid");
				$('.me_' + a).css({ "opacity": ".65" });
			} else {
				b = $(this).attr("data-bid");
				$('.me_' + a).css({ "opacity": "1" });

				if (a !== b) {
					$(".me_" + a).addClass("me_" + b).removeClass("me_" + a);
					$(this).addClass("me_" + a).removeClass("me_" + b);
					$(".me_" + a).attr("data-bid", a);
					$(".me_" + b).attr("data-bid", b);
				}

				moves++;
				swapping(a, b);
				checkCorrect(a);
				checkCorrect(b);
				a = b = count = 0;
			}

			if (arraysEqual(x)) {
				date2 = new Date();
				timeDifferece();
				showScore();
				music.pause();
				return 0;
			}
		});
	}

	function randomTile() {
		for (let i = orginal.length - 1; i >= 0; i--) {
			let flag = getRandom(0, i);
			x[i] = temp[flag];
			temp[flag] = temp[i];
			temp[i] = x[i];
		}
		for (let i = 0; i < orginal.length; i++) {
			box.append('<div class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>');
			if ((i + 1) % 6 == 0) box.append("<br>");
		}
		return 0;
	}

	function arraysEqual(arr) {
		for (let i = orginal.length - 1; i >= 0; i--) {
			if (arr[i] != i) return false;
		}
		return true;
	}

	function checkCorrect(N1) {
		var pos = x.indexOf(parseInt(N1, 10));
		if (pos != N1) return;
		$(".me_" + N1).addClass("correct prevent_click");
	}

	function swapping(N1, N2) {
		var first = x.indexOf(parseInt(N1, 10));
		var second = x.indexOf(parseInt(N2, 10));
		x[first] = parseInt(N2, 10);
		x[second] = parseInt(N1, 10);
		return 0;
	}

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function timeDifferece() {
		var diff = date2 - date1;
		var msec = diff;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		ss = Math.floor(msec / 1000);
		return 0;
	}

	function changeBG(img) {
		if (img != 7) {
			$('.me').css({ "background-image": "url(" + images[img] + ")" });
		} else {
			$('.me').css({ "background-image": "url(" + upIMG + ")" });
		}
	}

	$('.pre_img li').hover(function() {
		img = parseInt($(this).attr("data-bid")); // ✅ ทำให้ img เป็นตัวเลข
		changeBG(img);
	});

	function showScore() {
		$('#min').html(mm);
		$('#sec').html(ss);
		$('#moves').html(moves);
		setTimeout(function() {
			$('.cover').slideDown(350);
		}, 1050);
	}

	$('.OK').click(function() {
		$('.cover').slideUp(350);
	});

	$('.reset').click(function() {
		$(".tile").remove();
		$("br").remove();
		$(".full").show();
		$(".start").show();
		$(".pre_img, .start").removeClass("prevent_click");

		temp = orginal;
		x = [];
		moves = ss = mm = 0;

		music.pause(); // 🔇 หยุดเพลง
	});

	$("#upfile1").click(function () {
		$("#file1").trigger('click');
	});

	$("#file1").change(function() {
		readURL(this);
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				upIMG = e.target.result;
				img = 7; // ✅ ตั้งให้ใช้ช่องเพลง 8
				changeBG(7);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
});
