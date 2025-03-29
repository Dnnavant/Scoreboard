# American Football Scoreboard

A dynamic and visually appealing American football scoreboard built with HTML, CSS, and JavaScript.

## Features

- Real-time score tracking for both teams
- Digital timer with start/stop functionality
- Visual possession arrow indicator
- Timeout tracking for both teams (3 per half)
- Responsive design that works on all screen sizes
- Modern UI with animations and transitions
- Easy-to-use control panel for score updates

## How to Use

1. **Starting the Game**

   - Click the "Start" button to begin the game timer
   - Use the "Stop" button to pause the game
   - The timer starts at 15:00 (15 minutes)

2. **Updating Scores**

   - Use the buttons in the control panel to add points:
     - Touchdown (+6)
     - Field Goal (+3)
     - Extra Point (+1)
     - Two-Point Conversion (+2)
   - Click the appropriate team's buttons to update their score

3. **Tracking Possession**

   - Use the "Toggle Possession" button to switch the possession arrow between teams
   - The green arrow indicates which team currently has possession

4. **Managing Timeouts**

   - Each team has 3 timeouts per half
   - The green squares indicate available timeouts
   - When a timeout is used, the square turns red

5. **Resetting the Game**
   - Click the "Reset Game" button to:
     - Reset scores to 0
     - Reset the timer to 15:00
     - Reset all timeouts
     - Reset possession arrow

## Customization

### Team Logos

To add team logos:

1. Replace the `placeholder-logo.png` file with your team logo
2. Make sure the logo is square and ideally 200x200 pixels
3. The logo will automatically be cropped to a circle

### Colors

The scoreboard uses a dark theme with:

- Background: Dark gray (#1a1a1a)
- Scoreboard container: Slightly lighter gray (#2a2a2a)
- Digital numbers: Green (#00ff00)
- Buttons: Gray (#444) with hover effect (#555)

## Technical Details

- Built with vanilla JavaScript (no external dependencies)
- Uses CSS Grid and Flexbox for layout
- Responsive design with mobile-first approach
- Smooth animations for score updates and possession changes
- Digital-7 font for authentic scoreboard look

## Browser Support

The scoreboard works on all modern browsers:

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera
