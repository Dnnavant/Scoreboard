# American Football Scoreboard

A dynamic and visually appealing American football scoreboard built with HTML, CSS, and JavaScript.

## Features

- Real-time score tracking for both teams
- Digital timer with start/stop functionality
- Visual possession arrow indicator
- Timeout tracking for both teams (3 per half)
- Custom team names and logos
- Overtime period support (up to 3 periods)
- Responsive design that works on all screen sizes
- Modern UI with animations and transitions
- Easy-to-use control panel for score updates
- Score subtraction capability for error correction

## How to Use

1. **Game Setup**

   - Enter team names for both home and away teams
   - Upload team logos (supports any image format)
   - Set the quarter length (default: 15 minutes)
   - Click "Start Game" to begin

2. **Starting the Game**

   - Click the "Start" button to begin the game timer
   - Use the "Stop" button to pause the game
   - The timer starts at the specified quarter length

3. **Updating Scores**

   - Use the buttons in the control panel to add or subtract points:
     - Touchdown (+6/-6)
     - Field Goal (+3/-3)
     - Extra Point (+1/-1)
     - Two-Point Conversion (+2/-2)
   - Click the appropriate team's buttons to update their score
   - Use the subtract buttons to correct any scoring errors

4. **Tracking Possession**

   - Use the "Toggle Possession" button to switch the possession arrow between teams
   - The green arrow indicates which team currently has possession

5. **Managing Timeouts**

   - Each team has 3 timeouts per half
   - The green squares indicate available timeouts
   - When a timeout is used, the square turns red
   - A notification appears when a team runs out of timeouts

6. **Quarter Management**

   - Use the quarter selector to change quarters
   - Timeouts reset at the start of the third quarter
   - Quarter indicator shows current period (Q1-Q4, OT1-OT3)

7. **Overtime**

   - If the game is tied after 4 quarters, overtime begins
   - Set custom overtime period length (default: 10 minutes)
   - Up to 3 overtime periods available
   - Game ends if:
     - A team scores during overtime
     - After 3 overtime periods if still tied

8. **Resetting the Game**
   - Click the "Reset Game" button to:
     - Reset scores to 0
     - Reset the timer
     - Reset all timeouts
     - Reset possession arrow
     - Return to team setup

## Customization

### Team Setup

- Custom team names
- Custom team logos (any image format supported)
- Adjustable quarter length (1-60 minutes)
- Adjustable overtime length (1-15 minutes)

### Team Logos

- Upload any image format
- Images are automatically scaled and cropped to fit
- Maintains aspect ratio while filling the circular container
- Default helmet images provided

### Colors

The scoreboard uses a dark theme with:

- Background: Dark gray (#1a1a1a)
- Scoreboard container: Slightly lighter gray (#2a2a2a)
- Digital numbers: Green (#00ff00)
- Buttons: Gray (#444) with hover effect (#555)
- Timeout indicators: Green (available) / Red (used)
- Possession arrow: Green

## Technical Details

- Built with vanilla JavaScript (no external dependencies)
- Uses CSS Grid and Flexbox for layout
- Responsive design with mobile-first approach
- Smooth animations for:
  - Score updates
  - Possession changes
  - Timeout usage
  - Quarter transitions
- Digital-7 font for authentic scoreboard look
- Local storage for game state persistence
- FileReader API for image uploads

## Browser Support

The scoreboard works on all modern browsers:

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## File Structure

```
Scoreboard/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── images/            # Image assets
│   ├── HomeHelmet.png  # Default home team logo
│   └── AwayHelmet.png  # Default away team logo
└── README.md          # This documentation
```
