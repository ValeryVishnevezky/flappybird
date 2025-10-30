let gBirdHeight
let gGameInterval

function onInit() {
	renderGame()
	gBirdHeight = document.querySelector('.game-action').offsetHeight / 2
	// document.querySelector('.game-bird').style.bottom = gBirdHeight
}

function renderStart() {
	document.querySelector('.start-page').classList.remove('hidden')
}

function renderGame() {
	let strHTML = `
		<img class="game-bird" src="img/flappy-bird.png" alt="flappy bird" />
	`
	document.querySelector('.start-page').classList.add('hidden')
	let game = document.querySelector('.game-action')
	game.innerHTML = strHTML
	game.classList.remove('hidden')
}

function onGameAreaClick(ev) {
	ev.preventDefault()
	clearInterval(gGameInterval)

	const gameBird = document.querySelector('.game-bird')
	gameBird.classList.remove('fall')
	gameBird.style.transform = 'rotate(-40deg)'
	
	gBirdHeight += 180
	gameBird.style.bottom = gBirdHeight + 'px'
	
	setTimeout(() => {
		gameBird.classList.add('fall')
	}, 300)

	gGameInterval = setInterval(() => {
		gBirdHeight -= 1
		gameBird.style.bottom = gBirdHeight + 'px'
		if (gBirdHeight <= 120) {
			clearInterval(gGameInterval)
		}
	}, 1)
}
