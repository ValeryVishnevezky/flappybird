let gBirdHeight
let gPipeRight
let gGameInterval
let gPipeInterval
let gPipeMoveInterval
let isGameOn

function onInit() {
	renderGame()
	gBirdHeight = 500
	gPipeRight = 0
	isGameOn = true
	// setPipeHeight()
}

function renderStart() {
	document.querySelector('.start-page').classList.remove('hidden')
}

function renderGame() {
	let strHTML = `
		<img class="bird" src="img/flappy-bird.png" alt="flappy bird" />
			<div class="pipe pipe-top"></div>
			<div class="pipe pipe-bottom"></div>
	`
	document.querySelector('.start-page').classList.add('hidden')
	let game = document.querySelector('.game-action')
	game.innerHTML = strHTML
	game.classList.remove('hidden')
}

function onGameAreaClick() {
	if (!isGameOn) return
	clearInterval(gGameInterval)

	const gameBird = document.querySelector('.bird')
	gameBird.classList.remove('fall')
	gameBird.style.transform = 'rotate(-40deg)'

	gBirdHeight += 180
	console.log('gBirdHeight', gBirdHeight)
	gameBird.style.bottom = gBirdHeight + 'px'

	setTimeout(() => {
		gameBird.classList.add('fall')
	}, 300)

	gGameInterval = setInterval(() => {
		gBirdHeight -= 5
		gameBird.style.bottom = gBirdHeight + 'px'

		// if (checkGameOver(document.querySelectorAll('.pipe-top, .pipe-bottom'))) return	
		if (gBirdHeight === 0) {
		// 	isGameOn = false
			clearInterval(gGameInterval)
		// 	clearInterval(gPipeInterval)
		// 	clearInterval(gPipeMoveInterval)
		}
	}, 16)
}

function setPipeHeight() {
	if (!isGameOn) return

	const pipes = document.querySelectorAll('.pipe-top, .pipe-bottom')
	pipes.forEach(pipe => {
		pipe.style.height = getRandomInt(100, 300) + 'px'
	})
	gPipeInterval = setInterval(startPipeMovement, 1000)
}

function startPipeMovement() {
	if (!isGameOn) return

	gPipeMoveInterval = setInterval(() => {
		if (!isGameOn) return

		const pipes = document.querySelectorAll('.pipe-top, .pipe-bottom')
		gPipeRight += 3

		pipes.forEach(pipe => {
			pipe.style.right = gPipeRight + 'px'
		})

		// if (checkGameOver(pipes)) return

		if (gPipeRight >= 710) {
			gPipeRight = 0
			clearInterval(gPipeInterval)
			clearInterval(gPipeMoveInterval)

			setPipeHeight()
		}
	}, 16)
}

function checkGameOver(pipes) {
	const game = document.querySelector('.game-action')
	const gameHeight = game.offsetHeight
	const bird = document.querySelector('.bird')
	const birdHeight = bird.offsetHeight
	const birdTop = gBirdHeight - birdHeight
	const birdBottom = gBirdHeight
	const birdRight = 450
	const birdLeft = 450 - bird.offsetWidth

	const pipeTopHeight = gameHeight - pipes[0].offsetHeight
	const pipeBottomStart = pipes[1].offsetHeight
	const pipeLeft = gPipeRight
	const pipeRight = gPipeRight + 80

	if ((birdTop >= pipeTopHeight || birdBottom <= pipeBottomStart) && (birdRight >= pipeLeft || birdLeft <= pipeRight)) {
		console.log(`birdTop ${birdTop} >= pipeTopHeight ${pipeTopHeight}`, birdTop >= pipeTopHeight)
		console.log(`birdBottom ${birdBottom} <= pipeBottomStart ${pipeBottomStart}`, birdBottom <= pipeBottomStart)
		console.log(`birdRight ${birdRight} >= pipeLeft ${pipeLeft}`, birdRight >= pipeLeft)
		console.log(`birdLeft ${birdLeft} <= pipeRight ${pipeRight}`, birdLeft <= pipeRight)
		isGameOn = false
		console.log('isGameOn', isGameOn)
		clearInterval(gGameInterval)
		clearInterval(gPipeInterval)
		clearInterval(gPipeMoveInterval)
		return true
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}
