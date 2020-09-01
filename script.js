const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//show Loading

function showloadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide Loading
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Get Quote From API
async function getQuote() {
  showloadingSpinner();
  const proxyUrl = "https://evening-dawn-85917.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //if author is blank and unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "UnKnown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce Font Size for Long Quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    //stop loader, show Quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}
//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
