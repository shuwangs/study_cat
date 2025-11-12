# StudyCat Chrome Extension

## Background
StudyCat is a browser-based productivity extension that gamifies focus and time management.

The extension helps users stay motivated and maintain concentration by tracking study sessions, rewarding consistent effort with virtual coins, and featuring an animated cat companion whose emotions respond dynamically to user behavior.

When users remain focused, the cat appears happy and playful, encouraging continued productivity. However, when users visit distracting websites, the cat becomes visibly upset and deducts coins as a playful reminder to return to work.

By combining behavioral feedback and gamified rewards, StudyCat transforms ordinary study sessions into an engaging and interactive experience that promotes sustainable focus habits.
## Requirements

1. Initial Setup – Cat Selection
     - When the extension is installed for the first time, the user is presented with a “Choose Your Study Cat” screen before any other view.
     - The system displays a set of available cats (for example Bobo, Mimi, Shadow).
     - The user must select one cat companion to proceed.
     - The selected cat is stored in local storage (chrome.storage.sync) and becomes the default companion for all future sessions.
     - Other cats remain locked until the user earns enough coins or completes milestones to unlock them.

2. Main Popup Menu
    - After setup—or whenever the extension icon is clicked—the user is shown the main popup interface, which allows the user to:
      a. Start, pause, or stop a study session.
      b. View current focus time, total coins, and cat emotion.
      c. Open Settings to edit blacklist or daily goals.
      d. Open Shop to unlock new cats or cosmetic items.

3. Study Session Tracking
     - When the user selects Start Study, the system begins tracking time in minutes.
     - The elapsed time accumulates as long as the timer remains active.
     - Pausing or stopping saves the progress for the day.
     - Total minutes are added to both daily and lifetime totals.

4. Coin Rewards
     - The system awards 1 coin per minute of active study.
     - When the user’s daily goal is reached, a bonus reward (e.g., +20 coins) is automatically added.
     - The coin balance is displayed beside the cat and persists across sessions.
     - Penalty for Distracting Websites
       - If the user visits a website listed in the blacklist while studying, the system deducts a fixed penalty (e.g., 10 coins).
       - The cat’s mood immediately changes to “angry,” and an alert or short sound plays as feedback.
       - When bankrupt (e.g coins < 5) is triggered, the selected cat will be rehomed. changed to default cat.

5. Cat Mood and Behavior
      - The companion cat’s animation dynamically reflects the user’s current behavior:
      - Happy: studying consistently without penalties.
      - Excited: daily goal achieved.
      - Angry: penalty triggered.
      - Sleepy: no active session or prolonged inactivity.

6. Blacklist Management
      - From the Settings page, users can:
      - Add or remove distracting domains (e.g., YouTube, Instagram).
      - Enable or disable penalty enforcement.
      - The system automatically applies these preferences in future sessions.

7. Daily Goal Setting
      - Users can define or update a daily study-time goal (e.g., 120 minutes).
      - The popup displays a progress bar toward the goal.
      - When completed, the cat performs a celebration animation.
        
8. Data Persistence
    - All key data—selected cat, coins, goals, focus minutes, and blacklist—is stored via chrome.storage.sync and automatically re-loaded each time the extension starts.

9. Statistics View (Optional)
      - The user can view simple charts summarizing study time and coins earned for recent days or weeks.

10. Cosmetic Shop (Optional)
    - Users may spend coins to purchase cosmetic items (hats, backgrounds, themes) or unlock new cats.
    - Purchases are permanently recorded in storage.

11. Notifications and Feedback 
    - Visual and sound effects reinforce important actions such as:
    - Session start / stop
    - Goal achievement
    - Penalty trigger

12.  Offline Operation (Optional)
     - All StudyCat functions—timer, coins, moods, storage—run locally inside the browser and do not require an internet connection or external server.