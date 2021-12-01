var modal = document.getElementById('myModal');
var modalchitiet = document.getElementById('chitietModal');
    var btn = document.getElementById("myBtn");
    var btnchitiet = document.getElementById("chitietBtn");
    var span = document.getElementsByClassName("suaclose")[0];
    var spanchitiet = document.getElementsByClassName("chitietclose")[0];
    btn.onclick = function () {
        modal.style.display = "block";
    }
    btnchitiet.onclick = function () {
        modalchitiet.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    spanchitiet.onclick = function () {
        modalchitiet.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
   