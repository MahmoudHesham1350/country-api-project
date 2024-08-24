addEventListener("DOMContentLoaded", function(){
    document.querySelector(".search").onclick = async function(){
        const search = document.querySelector(".input").value.trim();
        if (search) {
            const countryData = await get(search);
            view_country(countryData);
        }
    }
})

async function get(country){
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!response.ok) {
            throw new Error("Country not found");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert("Country not found. Please check your input.");
    }
}

function view_country(data){
    if (!data || data.length === 0) return;

    const country = data[0]; 

    document.querySelector(".result-box").style.display = "block";

    document.querySelector('.name').textContent = country.name.common;
    document.querySelector('.capital').textContent = country.capital[0];
    document.querySelector('.continent').textContent = country.continents[0];
    document.querySelector('.population').textContent = country.population.toLocaleString();
    const currencies = country.currencies;
    const currencyText = Object.keys(currencies)
      .map(key => {
        const currency = currencies[key];
        return `${currency.name} (${currency.symbol})`;
      })
      .join(', ');
    
    document.querySelector('.currency').textContent = currencyText;
    
    
    document.querySelector('.language').textContent = Object.values(country.languages).join(', ');

    document.querySelector('.flag').src = country.flags.svg;
}
