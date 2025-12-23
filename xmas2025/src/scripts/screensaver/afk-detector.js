// Default activity events for ongoing detection
const ACTIVITY_EVENTS_DEFAULT = [
  'pointerdown',
  'pointermove',
  'keydown',
  'wheel',
  'touchstart'
];

// Current active event list (can be replaced temporarily)
let ACTIVITY_EVENTS_CURRENT = [...ACTIVITY_EVENTS_DEFAULT];

// Timeout before marking user inactive (ms)
let inactivityTimeout = 20000;
let timerId = null;

// User starts in inactive mode
let isInactive = true;

// Track if first interaction has happened
let firstInteraction = true;

// Callback sets
const activeCallbacks = new Set();
const inactiveCallbacks = new Set();

// Utility: clear existing timer
function clearTimer() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

// Utility: start inactivity timer
function startTimer() {
  clearTimer();

  timerId = setTimeout(() => {
    if (!isInactive) {
      isInactive = true;
      emitInactive();
    }
  }, inactivityTimeout);
}

// Emit active callbacks
function emitActive() {
  activeCallbacks.forEach(cb => cb());
}

// Emit inactive callbacks
function emitInactive() {
  inactiveCallbacks.forEach(cb => cb());
}

// Handle any activity event
function handleActivity() {
  // On first interaction, swap to default event list
  if (firstInteraction) {
    firstInteraction = false;

    // Remove all current listeners
    ACTIVITY_EVENTS_CURRENT.forEach(event =>
      window.removeEventListener(event, handleActivity)
    );

    // Switch to default events
    ACTIVITY_EVENTS_CURRENT = [...ACTIVITY_EVENTS_DEFAULT];
    ACTIVITY_EVENTS_CURRENT.forEach(event =>
      window.addEventListener(event, handleActivity, { passive: true })
    );
  }

  if (isInactive) {
    isInactive = false;
    emitActive();
  }

  startTimer();
}

// Public API

/**
 * Start AFK detection
 * @param {object} options
 * @param {number} options.timeout - inactivity timeout in ms (default 20000)
 * @param {string[]} options.initialEvents - optional list of events to detect initially
 */
export function start({ timeout = 20000, initialEvents = null } = {}) {
  inactivityTimeout = timeout;

  if (initialEvents) {
    ACTIVITY_EVENTS_CURRENT = [...initialEvents];
  }

  ACTIVITY_EVENTS_CURRENT.forEach(event =>
    window.addEventListener(event, handleActivity, { passive: true })
  );

  startTimer();
}

/**
 * Stop AFK detection entirely
 */
export function stop() {
  clearTimer();

  ACTIVITY_EVENTS_CURRENT.forEach(event =>
    window.removeEventListener(event, handleActivity)
  );
}

/**
 * Register a callback for when the user becomes active
 * @param {Function} callback
 * @returns {Function} unsubscribe function
 */
export function onActive(callback) {
  activeCallbacks.add(callback);
  return () => activeCallbacks.delete(callback);
}

/**
 * Register a callback for when the user becomes inactive
 * @param {Function} callback
 * @returns {Function} unsubscribe function
 */
export function onInactive(callback) {
  inactiveCallbacks.add(callback);
  return () => inactiveCallbacks.delete(callback);
}
