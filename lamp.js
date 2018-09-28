lamp = {};

lamp.canvas = document.getElementById("lamp-canvas");
lamp.canvas.width = window.innerWidth;
lamp.canvas.height = window.innerHeight;

lamp.ctx = lamp.canvas.getContext("2d");

lamp.can_draw_lamp = false;

lamp.images = {};

lamp.images.lamp = new Image();
lamp.images.lamp.src = "lamp.png";
lamp.images.lamp.onload = function() {
	lamp.can_draw_lamp = true;
}

lamp.images.moth = new Image();
lamp.images.moth.src = "moth.png";
lamp.images.moth.onload = function() {
	lamp.images.moth.can_draw = true;
}

lamp.lamps = [];

lamp.mouse = {"x": 0, "y": 0};

lamp.add_lamp = function() {
	var l = {};
	l.x = lamp.mouse.x;
	l.y = lamp.mouse.y;
	l.moth = lamp.add_moth();

	lamp.lamps.push(l);
}

lamp.add_moth = function() {
	var moth = {};

	var which = Math.floor(Math.random() * 4);

	if (which == 0) {
		moth.x = -1000;
		moth.y = lamp.canvas.height / 2;
	} else if (which == 1) {
		moth.x = lamp.canvas.width + 1000;
		moth.y = lamp.canvas.height / 2;
	} else if (which == 2) {
		moth.x = lamp.canvas.width / 2;
		moth.y = -1000;
	} else if (which == 3) {
		moth.x = lamp.canvas.width / 2;
		moth.y = lamp.canvas.height + 1000;
	}

	var which_speed = Math.floor(Math.random() * 5);
	moth.speed = 3 + which_speed;

	return moth;
}

lamp.get_mouse_pos = function(e) {
	var rect = lamp.canvas.getBoundingClientRect();

	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	}
}

lamp.update = function() {
	lamp.ctx.clearRect(0, 0, lamp.canvas.width, lamp.canvas.height);

	// Put lamp at mouse
	if (lamp.can_draw_lamp) {
		lamp.ctx.drawImage(lamp.images.lamp, lamp.mouse.x, lamp.mouse.y, 30, 30);
	}

	// Draw placed lamps
	lamp.lamps.forEach(function(l) {
		lamp.ctx.drawImage(lamp.images.lamp, l.x, l.y, 100, 100);

		// draw moth
		if (lamp.images.moth.can_draw) {
			if (l.moth.x > l.x) {
				l.moth.x -= l.moth.speed;
			}

			if (l.moth.x < l.x) {
				l.moth.x += l.moth.speed;
			}

			if (l.moth.y > l.y) {
				l.moth.y -= l.moth.speed;
			}

			if (l.moth.y < l.y) {
				l.moth.y += l.moth.speed;
			}

			lamp.ctx.drawImage(lamp.images.moth, l.moth.x, l.moth.y, 200, 200);
		}
	});

	requestAnimationFrame(lamp.update);
}

document.body.onload = lamp.update;

lamp.canvas.addEventListener('mousemove', function(e) {
	lamp.mouse = lamp.get_mouse_pos(e);
})

window.addEventListener('click', function() {
	lamp.add_lamp();
});
