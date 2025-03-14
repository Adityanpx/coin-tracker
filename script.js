const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

// Fetch Data Using `.then()`
function fetchCryptoDataThen() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(cryptoData);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Fetch Data Using `async/await`
async function fetchCryptoDataAsync() {
    try {
        const response = await fetch(API_URL);
        cryptoData = await response.json();
        renderTable(cryptoData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to Render Table
function renderTable(data) {
    const tableBody = document.getElementById("cryptoTable");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach(coin => {
        const row = `
            <tr>
                <td>${coin.id}</td>
                <td><img src="${coin.image}" width="30"></td>
                <td>${coin.name}</td>
                <td>${coin.symbol.toUpperCase()}</td>
                <td>$${coin.current_price.toLocaleString()}</td>
                <td>$${coin.market_cap.toLocaleString()}</td>
                <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Search Functionality
function searchCrypto() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
}

// Sort By Market Cap
function sortByMarketCap() {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
}

// Sort By 24h Percentage Change
function sortByPriceChange() {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
}

// Call the function to fetch data
fetchCryptoDataAsync();  // Using async/await by default
// fetchCryptoDataThen(); // Uncomment this to use `.then()`
