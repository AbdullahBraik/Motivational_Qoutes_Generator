// Typing animation
const typingText = document.getElementById("typing-text");
const messages = [
  "Welcome to Motivational Quotes!",
  "'One quote can change your day.'",
  "'Get inspired and stay motivated!'"
];

let typingIndex = 0;
let charIndex = 0;

function typeText() {
  if (charIndex < messages[typingIndex].length) {
    typingText.textContent += messages[typingIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 80);
  } else {
    setTimeout(() => {
      typingText.textContent = "";
      charIndex = 0;
      typingIndex = (typingIndex + 1) % messages.length;
      typeText();
    }, 2000);
  }
}

typeText();


const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author-text");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyBtn = document.getElementById("copy-btn");
const shareBtn = document.getElementById("share-btn");
const musicToggleBtn = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");

let quotesArray = [];

// Function to fetch quotes from JSON file
async function fetchQuotes() {
  try {
    const response = await fetch('quotes.json');  // Make sure quotes.json is in the same directory
    if (!response.ok) {
      throw new Error('Failed to load quotes file');
    }
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    console.error('Error loading quotes:', error);
    return [];  // Returning an empty array if fetching fails
  }
}

// Load quotes when page loads
async function loadQuotes() {
  quotesArray = await fetchQuotes();
  if (quotesArray.length > 0) {
    getRandomQuote(); // If quotes are successfully loaded, show a random quote
  } else {
    quoteText.textContent = "Sorry, failed to load quotes."; // Display error message if no quotes are loaded
    authorText.textContent = "";
  }
}

// Function to get a random quote
function getRandomQuote() {
  if (quotesArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const randomQuote = quotesArray[randomIndex];
    quoteText.textContent = `"${randomQuote.quote}"`;
    authorText.textContent = `– ${randomQuote.author}`;
  } else {
    quoteText.textContent = "No quotes available.";
    authorText.textContent = "";
  }
}

// Function to copy quote to clipboard
function copyQuote() {
  navigator.clipboard.writeText(`${quoteText.textContent} ${authorText.textContent}`)
    .then(() => {
      alert("Quote copied to clipboard!");
    })
    .catch((error) => {
      console.error("Error copying quote: ", error);
    });
}

// Function to share quote on Twitter
function shareQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)} ${encodeURIComponent(author)}`;
  window.open(twitterUrl, '_blank');
}

// Function to toggle background music on/off
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i> Music On';
  } else {
    bgMusic.pause();
    musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Music Off';
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", getRandomQuote);
copyBtn.addEventListener("click", copyQuote);
shareBtn.addEventListener("click", shareQuote);
musicToggleBtn.addEventListener("click", toggleMusic);

// Load quotes initially
loadQuotes();
