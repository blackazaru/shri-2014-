/**
 * Created by danik on 19.9.14.
 */

var COUNT_BALL = 350;       // Колличество шариков на экране
var RADIUS = 150;           // Убегают шарики от курсора на растоянии 200
var d = document.documentElement,
    width = d.clientWidth,
    height = d.clientHeight;

var coordinates = [0, 0];
var svg = d3.select('body').append('svg')
    .attr('width', width * 0.98)
    .attr('height', height * 0.96)
    .on("mousemove", function (d, i) {
        coordinates = d3.mouse(this)
    });
// Запоминаем наши шарики
var circles = [];

// Создаем и придаем шарикам цвет, радиус и скорость
for (var i = 0; i < COUNT_BALL; i++) {
    circles[i] = svg.append('circle')
        .attr('cx', random(0,width))
        .attr('cy', random(0,height))
        .attr("speed", random(20,40))
        .attr('r', random(4,16))
        .style("fill", "red");
}

// С интервалом передвигаем шарики
setInterval(function () {
    for (var i = 0; i < circles.length; i++) {
        //Определяем новые кординаты
        var x = setX(circles[i], getSpeed(circles[i]));
        var y = setY(circles[i], getSpeed(circles[i]));
        // Если шарик вызех за экран - вернуть его в рандомные кординаты,
        // иначе переместить шарик в его новые кординаты
        if (x >= width || x <= 0 || y >= height || y <= 0) {
            var l = 0;
            while (l <= RADIUS + 10) {
                x = random(0,width);
                y = random(0,height);
                var hx = mouse_x - x;
                var hy = y - mouse_y;
                l = dist(hx, hy);
            }
            circles[i]
                .attr("cx", x)
                .attr("cy", y);
        } else {
            circles[i].transition()
                .style("fill", getColor())
                .attr("cx", x)
                .attr("cy", y);
        }

        // Убираем шарики от мышки на растояние RADIUS
        var mouse_x = coordinates[0];
        var mouse_y = coordinates[1];
        hx = mouse_x - getX(circles[i]);
        hy = getY(circles[i]) - mouse_y;
        l = dist(hx, hy);
        if (l <= RADIUS - 10) {
            var alpha = hy / l;
            var dy = alpha * RADIUS;
            var dx = Math.sqrt(Math.abs(RADIUS * RADIUS) - Math.abs(dy * dy));
            if (hx > 0) {
                dx = -dx;
            }

            circles[i].transition()
                .attr("cx", mouse_x + dx)
                .attr("cy", mouse_y + dy);
        }


    }
}, 150);

function random(s,f) {
    return (Math.random() * (f-s)) + s;
}
function dist(x1, x2) {
    return Math.sqrt(Math.abs(x1 * x1) + Math.abs(x2 * x2))
}
function getSpeed(circle) {
    return parseInt(circle.attr("speed"));
}
function getX(circle) {
    return parseInt(circle.attr("cx"));
}
function getY(circle) {
    return parseInt(circle.attr("cy"));
}
function setX(circle, speed) {
    return getX(circle) + (speed * Math.random() - speed * Math.random());
}
function setY(circle, speed) {
    return getY(circle) + (speed * Math.random() - speed * Math.random());
}
function getColor() {
    return "rgb(255, " + Math.random() * 255 + ", 0)";
}


