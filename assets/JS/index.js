const container = document.getElementById("container 1");

document.addEventListener("DOMContentLoaded", () => {
	var blocks = "";
	for (var i = 0; i < 81; i++)
		blocks += `<button id="${i}" onClick="increment(${i})">0</button>`;

	container.innerHTML = blocks;

	blocks = "";
	for (var i = 0; i < 81; i++) blocks += `<button></button>`;
	document.getElementById("container 2").innerHTML = blocks;
});

var static = undefined;
var current;

function increment(id) {
	if (static == undefined) static = id;
	else {
		const Button = document.getElementById(static);
		Button.innerText = current;
		static = id;
	}

	const Button = document.getElementById(id);
	current = Button.innerText;

	if (Button.innerHTML != `<input type="text" id="val">`) {
		Button.innerHTML = `<input type="text" id="val">`;
	}

	const num = document.getElementById("val");
	num.focus();
	num.oninput = function () {
		if (isValid(num.value)) {
			Button.innerText = num.value;
		} else Button.innerText = current;
		static = undefined;

		Button.style.backgroundColor =
			Button.innerHTML != 0 ? "darkorange" : "whitesmoke";
	};
}

function isValid(val) {
	if (val < "0" || val > "9" || val.length > 1) return false;
	else return true;
}
