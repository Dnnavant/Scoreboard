// Game State
const gameState = {
	homeScore: 0,
	awayScore: 0,
	timeRemaining: 900, // 15 minutes in seconds
	isRunning: false,
	possession: "home",
	homeTimeouts: 3,
	awayTimeouts: 3,
	currentQuarter: 1,
	quarterLength: 15, // Default quarter length in minutes
	homeTeam: "HOME",
	awayTeam: "AWAY",
	overtimePeriod: 0, // Track number of overtime periods
	isOvertime: false,
};

// DOM Elements
const homeScoreElement = document.querySelector(".home .score");
const awayScoreElement = document.querySelector(".away .score");
const timerElement = document.querySelector(".timer");
const quarterIndicator = document.querySelector(".quarter-indicator");
const startButton = document.getElementById("startTimer");
const stopButton = document.getElementById("stopTimer");
const possessionArrow = document.querySelector(".arrow");
const togglePossessionButton = document.getElementById("togglePossession");
const resetButton = document.getElementById("resetGame");
const quarterSelector = document.getElementById("quarterSelector");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const homeTeamName = document.querySelector(".home .team-name");
const awayTeamName = document.querySelector(".away .team-name");

// Popup Elements
const teamSetupPopup = document.getElementById("teamSetupPopup");
const winnerPopup = document.getElementById("winnerPopup");
const timeoutPopup = document.getElementById("timeoutPopup");
const overtimePopup = document.getElementById("overtimePopup");
const teamSetupForm = document.getElementById("teamSetupForm");
const overtimeForm = document.getElementById("overtimeForm");
const winnerMessage = document.getElementById("winnerMessage");
const timeoutMessage = document.getElementById("timeoutMessage");
const overtimeMessage = document.getElementById("overtimeMessage");
const closeWinnerPopup = document.getElementById("closeWinnerPopup");
const closeTimeoutPopup = document.getElementById("closeTimeoutPopup");

// Timer functionality
let timerInterval;

// Image upload elements
const homeTeamLogoInput = document.getElementById("homeTeamLogo");
const awayTeamLogoInput = document.getElementById("awayTeamLogo");
const homeTeamLogoPreview = document.getElementById("homeTeamLogoPreview");
const awayTeamLogoPreview = document.getElementById("awayTeamLogoPreview");

// Show team setup popup on page load
showTeamSetupPopup();

// Function to show team setup popup
function showTeamSetupPopup() {
	teamSetupPopup.classList.add("active");
}

// Handle image upload previews
homeTeamLogoInput.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = document.createElement("img");
			img.src = e.target.result;
			homeTeamLogoPreview.innerHTML = "";
			homeTeamLogoPreview.appendChild(img);
		};
		reader.readAsDataURL(file);
	}
});

awayTeamLogoInput.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = document.createElement("img");
			img.src = e.target.result;
			awayTeamLogoPreview.innerHTML = "";
			awayTeamLogoPreview.appendChild(img);
		};
		reader.readAsDataURL(file);
	}
});

// Handle team setup form submission
teamSetupForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// Get form values
	const homeTeam = document.getElementById("homeTeamName").value;
	const awayTeam = document.getElementById("awayTeamName").value;
	const quarterLength = parseInt(
		document.getElementById("quarterLength").value
	);

	// Get logo images
	const homeLogo = homeTeamLogoPreview.querySelector("img");
	const awayLogo = awayTeamLogoPreview.querySelector("img");

	// Update game state
	gameState.homeTeam = homeTeam;
	gameState.awayTeam = awayTeam;
	gameState.quarterLength = quarterLength;

	// Update display
	homeTeamName.textContent = homeTeam;
	awayTeamName.textContent = awayTeam;

	// Update team logos
	if (homeLogo) {
		const homeTeamLogo = document.querySelector(".home .team-logo img");
		homeTeamLogo.src = homeLogo.src;
	}
	if (awayLogo) {
		const awayTeamLogo = document.querySelector(".away .team-logo img");
		awayTeamLogo.src = awayLogo.src;
	}

	// Set initial time
	gameState.timeRemaining = quarterLength * 60;
	updateTimer();

	// Close popup
	teamSetupPopup.classList.remove("active");
});

// Handle winner popup close
closeWinnerPopup.addEventListener("click", () => {
	winnerPopup.classList.remove("active");
	resetGame();
});

// Handle timeout popup close
closeTimeoutPopup.addEventListener("click", () => {
	timeoutPopup.classList.remove("active");
});

// Handle overtime form submission
overtimeForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const overtimeLength = parseInt(
		document.getElementById("overtimeLength").value
	);

	// Update game state for overtime
	gameState.isOvertime = true;
	gameState.overtimePeriod++;
	gameState.timeRemaining = overtimeLength * 60;

	// Update display
	updateQuarterIndicator();
	updateTimer();

	// Close popup and start overtime
	overtimePopup.classList.remove("active");
	startTimer();
});

function updateTimer() {
	const minutes = Math.floor(gameState.timeRemaining / 60);
	const seconds = gameState.timeRemaining % 60;
	timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;

	// Update input fields
	minutesInput.value = minutes;
	secondsInput.value = seconds;
}

function updateQuarterIndicator() {
	if (gameState.isOvertime) {
		quarterIndicator.textContent = `OT${gameState.overtimePeriod}`;
		quarterSelector.value = `OT${gameState.overtimePeriod}`;
	} else {
		quarterIndicator.textContent = `Q${gameState.currentQuarter}`;
		quarterSelector.value = gameState.currentQuarter;
	}
}

function startTimer() {
	if (!gameState.isRunning) {
		gameState.isRunning = true;
		startButton.disabled = true;
		stopButton.disabled = false;
		timerInterval = setInterval(() => {
			if (gameState.timeRemaining > 0) {
				gameState.timeRemaining--;
				updateTimer();

				// Check for quarter/period change
				if (gameState.timeRemaining === 0) {
					if (gameState.isOvertime) {
						// Check if game is still tied after overtime
						if (gameState.homeScore === gameState.awayScore) {
							if (gameState.overtimePeriod < 3) {
								// Show overtime popup for next period
								showOvertimePopup();
								return;
							} else {
								// Game ends in tie after 3 overtimes
								stopTimer();
								showWinnerPopup();
								return;
							}
						} else {
							// Game is over - we have a winner
							stopTimer();
							showWinnerPopup();
							return;
						}
					} else {
						gameState.currentQuarter++;
						if (gameState.currentQuarter === 3) {
							// Reset timeouts for third quarter
							gameState.homeTimeouts = 3;
							gameState.awayTimeouts = 3;
							// Reset all timeout boxes visually
							document.querySelectorAll(".timeout-box").forEach((box) => {
								box.classList.remove("used");
							});
						}

						// Check if game is over (after quarter 4)
						if (gameState.currentQuarter > 4) {
							if (gameState.homeScore === gameState.awayScore) {
								// Game is tied - show overtime popup
								stopTimer();
								showOvertimePopup();
								return;
							} else {
								// Game is over - we have a winner
								stopTimer();
								showWinnerPopup();
								return;
							}
						}

						// Reset timer for next quarter
						gameState.timeRemaining = gameState.quarterLength * 60;
						updateTimer();
						updateQuarterIndicator();
					}
				}
			} else {
				stopTimer();
			}
		}, 1000);
	}
}

function stopTimer() {
	gameState.isRunning = false;
	clearInterval(timerInterval);
	startButton.disabled = false;
	stopButton.disabled = true;
}

// Score update functionality
function updateScore(team, points) {
	const scoreElement = team === "home" ? homeScoreElement : awayScoreElement;
	if (team === "home") {
		gameState.homeScore += points;
	} else {
		gameState.awayScore += points;
	}

	scoreElement.textContent =
		team === "home" ? gameState.homeScore : gameState.awayScore;
	scoreElement.classList.add("score-update");

	setTimeout(() => {
		scoreElement.classList.remove("score-update");
	}, 300);
}

// Possession arrow functionality
function updatePossessionArrow() {
	possessionArrow.classList.toggle("away", gameState.possession === "away");
}

function togglePossession() {
	gameState.possession = gameState.possession === "home" ? "away" : "home";
	updatePossessionArrow();
}

// Timeout functionality
function useTimeout(team) {
	const timeouts =
		team === "home" ? gameState.homeTimeouts : gameState.awayTimeouts;
	if (timeouts > 0) {
		if (team === "home") {
			gameState.homeTimeouts--;
		} else {
			gameState.awayTimeouts--;
		}
		const timeoutBoxes = document.querySelectorAll(`.${team} .timeout-box`);
		timeoutBoxes[timeouts - 1].classList.add("used");

		// Stop the clock when timeout is used
		if (gameState.isRunning) {
			stopTimer();
		}

		// Check if team has no timeouts left
		if (
			(team === "home" && gameState.homeTimeouts === 0) ||
			(team === "away" && gameState.awayTimeouts === 0)
		) {
			showTimeoutPopup(team);
		}
	}
}

// Show timeout popup
function showTimeoutPopup(team) {
	const teamName = team === "home" ? gameState.homeTeam : gameState.awayTeam;
	timeoutMessage.textContent = `${teamName} has no timeouts remaining!`;
	timeoutPopup.classList.add("active");
}

// Add click event listeners for timeout boxes
document.querySelectorAll(".timeout-box").forEach((box) => {
	box.addEventListener("click", () => {
		if (!box.classList.contains("used")) {
			const team = box.dataset.team;
			useTimeout(team);
		}
	});
});

// Add new function to reset timeouts
function resetTimeouts() {
	gameState.homeTimeouts = 3;
	gameState.awayTimeouts = 3;

	// Reset timeout boxes visually
	document.querySelectorAll(".timeout-box").forEach((box) => {
		box.classList.remove("used");
	});
}

function setTimerFromInput() {
	const minutes = parseInt(minutesInput.value) || 0;
	const seconds = parseInt(secondsInput.value) || 0;

	// Validate input
	if (minutes < 0) minutesInput.value = 0;
	if (seconds < 0) secondsInput.value = 0;
	if (seconds > 59) secondsInput.value = 59;

	// Convert to total seconds
	gameState.timeRemaining = minutes * 60 + seconds;
	updateTimer();
}

// Add input event listeners
minutesInput.addEventListener("change", setTimerFromInput);
secondsInput.addEventListener("change", setTimerFromInput);

// Reset functionality
function resetGame() {
	// Clear interval if running
	if (gameState.isRunning) {
		clearInterval(timerInterval);
	}

	// Reset game state
	gameState = {
		timeRemaining: gameState.quarterLength * 60,
		currentQuarter: 1,
		isRunning: false,
		intervalId: null,
		homeScore: 0,
		awayScore: 0,
		possession: "home",
		quarterLength: gameState.quarterLength,
		homeTeam: gameState.homeTeam,
		awayTeam: gameState.awayTeam,
		homeTimeouts: 3,
		awayTimeouts: 3,
		overtimePeriod: 0,
		isOvertime: false,
	};

	// Reset display
	updateTimer();
	quarterIndicator.textContent = "Q1";
	quarterSelector.value = "1";
	homeScoreElement.textContent = "0";
	awayScoreElement.textContent = "0";
	possessionArrow.classList.remove("away");

	// Reset buttons
	startButton.disabled = false;
	stopButton.disabled = true;

	// Reset timeouts
	resetTimeouts();

	// Close all popups
	winnerPopup.classList.remove("active");
	timeoutPopup.classList.remove("active");
	overtimePopup.classList.remove("active");

	// Reset image previews
	homeTeamLogoPreview.innerHTML = "";
	awayTeamLogoPreview.innerHTML = "";
	homeTeamLogoInput.value = "";
	awayTeamLogoInput.value = "";

	// Reset team logos to default
	const homeTeamLogo = document.querySelector(".home .team-logo img");
	const awayTeamLogo = document.querySelector(".away .team-logo img");
	homeTeamLogo.src = "./images/HomeHelmet.png";
	awayTeamLogo.src = "./images/AwayHelmet.png";

	// Show team setup popup
	showTeamSetupPopup();
}

// Event Listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
togglePossessionButton.addEventListener("click", togglePossession);
resetButton.addEventListener("click", resetGame);

// Score buttons
document.querySelectorAll(".score-btn").forEach((button) => {
	button.addEventListener("click", () => {
		const team = button.dataset.team;
		const points = parseInt(button.dataset.points);
		updateScore(team, points);
	});
});

// Add quarter selector event listener
quarterSelector.addEventListener("change", () => {
	const newQuarter = parseInt(quarterSelector.value);
	if (newQuarter !== gameState.currentQuarter) {
		gameState.currentQuarter = newQuarter;
		quarterIndicator.textContent = `Q${newQuarter}`;
		gameState.timeRemaining = gameState.quarterLength * 60;
		updateTimer();
	}
});

// Initialize the game
updateTimer();
updateQuarterIndicator();
updatePossessionArrow();

// Show winner popup
function showWinnerPopup() {
	const winner =
		gameState.homeScore > gameState.awayScore
			? gameState.homeTeam
			: gameState.awayScore > gameState.homeScore
			? gameState.awayTeam
			: "It's a tie!";

	winnerMessage.textContent =
		winner === "It's a tie!"
			? "It's a tie!"
			: `Congratulations ${winner}! You won the game!`;

	winnerPopup.classList.add("active");
}

// Show overtime popup
function showOvertimePopup() {
	const nextPeriod = gameState.overtimePeriod + 1;
	overtimeMessage.textContent = `The game is tied! Starting Overtime Period ${nextPeriod}`;
	overtimePopup.classList.add("active");
}
