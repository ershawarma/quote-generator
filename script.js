const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const newQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // To give string value of the content
    (!quote.author) ? 
        authorText.textContent = 'Unknown':
        authorText.textContent = quote.author;

    // Check quote length for styling
    (quote.text.length > 100) ? 
        quoteText.classList.add('long-quote') :
        quoteText.classList.remove('long-quote');

    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}   

// Get Quotes From Api
const getQuote = async () => {
    showLoadingSpinner();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
