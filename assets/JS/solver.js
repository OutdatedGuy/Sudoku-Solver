const container2 = document.getElementById("container 2");
const unSolvable = document.getElementById("not-solvable");

var timedOut;

function isSafe(arr, x, y, num) {
	for (var i = 0; i < 9; i++) if (arr[i][y] == num) return false;

	for (var i = 0; i < 9; i++) if (arr[x][i] == num) return false;

	var row = x - (x % 3);
	var col = y - (y % 3);
	for (var i = 0; i < 3; i++)
		for (var j = 0; j < 3; j++)
			if (arr[row + i][col + j] == num) return false;

	return true;
}

function Sudoku(arr, x, y) {
	if (timedOut) return false;

	if (y > 8) x++, (y = 0);
	if (x >= 9) return true;

	for (var i = 1; i < 10; i++) {
		if (arr[x][y] != 0) return Sudoku(arr, x, y + 1);

		if (isSafe(arr, x, y, i)) {
			arr[x][y] = i;

			if (Sudoku(arr, x, y + 1)) return true;

			arr[x][y] = 0;
		}
	}

	return false;
}

function isSolvable(arr) {
	var check = [];

	for (var i = 0; i < 9; i++) {
		for (var k = 0; k < 10; k++) check[k] = 0;

		for (var j = 0; j < 9; j++) {
			if (check[arr[i][j]] != 0 && arr[i][j] != 0) return false;
			check[arr[i][j]]++;
		}
	}

	for (var i = 0; i < 9; i++) {
		for (var k = 0; k < 10; k++) check[k] = 0;

		for (var j = 0; j < 9; j++) {
			if (check[arr[j][i]] != 0 && arr[j][i] != 0) return false;
			check[arr[j][i]]++;
		}
	}

	for (var row = 0; row < 9; row += 3) {
		for (var col = 0; col < 9; col += 3) {
			for (var k = 0; k < 10; k++) check[k] = 0;
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					if (
						check[arr[row + i][col + j]] != 0 &&
						arr[row + i][col + j] != 0
					)
						return false;
					check[arr[row + i][col + j]]++;
				}
			}
		}
	}

	return true;
}

function getNumbers(arr) {
	for (var i = 0, k = 0; i < 9; i++)
		for (var j = 0; j < 9; j++, k++)
			arr[i][j] = document.getElementById(k).innerText;
}

function solve() {
	var arr = [];

	for (var i = 0; i < 9; i++) arr[i] = [];

	getNumbers(arr);

	timedOut = false;
	var counter = setTimeout(() => {
		timedOut = true;
	}, 2000);

	if (!isSolvable(arr) || !Sudoku(arr, 0, 0)) {
		unSolvable.innerHTML = `<p>Given Sudoku is not SOLVABLE!!!</p>`;
		container2.innerHTML = ``;

		document.getElementById("useless").focus();

		clearTimeout(counter);

		return 0;
	}

	var blocks = "";
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++) {
			if (typeof arr[i][j] == "number")
				blocks += `<button id="A-${i}-${j}">${arr[i][j]}</button>`;
			else blocks += `<button class="pre">${arr[i][j]}</button>`;
		}

	container2.innerHTML = blocks;
	unSolvable.innerHTML = ``;

	document.getElementById("A-6-4").focus();

	// clearTimeout(counter);

	return 0;
}
