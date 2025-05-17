const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("Search");
let cryptoData = [];

async function getData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        cryptoData = data;
        renderTable(data);
    } catch(error) {
        console.log("Error is:", error);
    }
};

function getDataWithThen() {
    document.getElementById("tbody").innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(data);
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("tbody").innerHTML = `<tr><td colspan='6'>Error loading data: ${error.message}</td></tr>`;
        });
}

function renderTable(data) {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    data.forEach(coin => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td class="name-cell">
                <img src="${coin.image}" width="20" height="20"/>
            </td>
            <td>$${coin.current_price.toLocaleString()}</td>
                        <td>$${coin.market_cap}</td>
                                    <td>$${coin.total_volume}</td>


        `;

        tbody.appendChild(row);
    });
}

function search () {
    let text = searchInput.value.toLocaleLowerCase();
     filteredData = cryptoData.filter(data => 
        data.name.toLocaleLowerCase().includes(text)

    );
    
    renderTable(filteredData)

}

function  sortByMc (){
    let filteredData = cryptoData.sort((a,b) => a.market_cap-b.market_cap );
    renderTable(filteredData)

}

function sortByPc () {
    let filteredData = cryptoData.sort((a,b)=> a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
    renderTable(filteredData);
}

searchBtn.addEventListener("click", search)
searchInput.addEventListener("input", search)
document.getElementById("sortbyMc").addEventListener("click", sortByMc);
document.getElementById("sortByPc").addEventListener("click", sortByPc);

getData();