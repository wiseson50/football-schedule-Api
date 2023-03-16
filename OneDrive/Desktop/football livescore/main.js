const getData = () =>{
    fetch(
        'https://www.scorebat.com/video-api/v3/feed/ ?token=MTc5NzdfMTY1MDgwNjEyMF85Yjk1NTZjNDY5MWQ0MzczOGJlOGNiYTI2MWI4OGVkN2M2YzU4NmY3'
    ).then((response)=> {
        return response.json()
    }). then((result) =>{
 console.log(result.response)

//  createHtmlTable(result.response);
//  createDropDown(result.response);

controller(result.response);

});
    
};

const createHtmlTable = (games)=>{
    let table = document.getElementById('table');
    table.innerText='';

    games.forEach((game, i) => {
       let row = document.createElement('tr');
       table.appendChild(row);

       let column = document.createElement('td');
       column.innerText=game.title;
       row.appendChild(column);

       let column2 = document.createElement('td');
       column2.innerText=game.competition;
       row.appendChild(column2);

       //for Date reforming
       let column3 = document.createElement('td');

       const gameDate = new Date(game.date).toLocaleDateString('de-DE', {
        day:'2-digit',
        month:'long',
        year:'2-digit'
       })
       column3.innerText=gameDate;
       row.appendChild(column3);


           })
               };       //to generate dropDown options

let createDropDown = (games) =>{
const dropDown = document.getElementById('leagueDropdown');

let competitions = games.map((game)=>{
    return game.competition;
})

const uniqueCompetitions = [...new Set(competitions)]
// console.log(uniqueCompetition)

uniqueCompetitions.forEach((uniqueCompetition)=>{
    let option = document.createElement('option')
option.innerText = uniqueCompetition;
option.value = uniqueCompetition;
dropDown.appendChild(option);
});

}

function controller(games) {
   createHtmlTable(games);
   createDropDown(games);
   setEventListeners(games);

}
 
const setEventListeners = (games)=>{
document.querySelector('#date').addEventListener('change', (event) =>{
    // console.log('date picker works')
    filterByDate(games);
});
document.querySelector('#leagueDropdown').addEventListener('change', (event)=>{
    // console.log('dropdown is working')
    filterByDropDown(games);
})
}

//filter by date

const filterByDate = (games)=>{
    const datePickerValue = document.querySelector('#date').value;
    const gameDate = new Date(datePickerValue).setHours(0, 0, 0, 0);
    console.log(gameDate)

    // console.log(gameDate);

    const filteredGames = games.filter((game) =>{
        const filterDate = new Date(game.date).setHours(0, 0, 0, 0);
        return  filterDate === gameDate;
    });
    console.log('filteredGames', filteredGames);
    createHtmlTable(filteredGames);
};


//fiter by dropDown

const filterByDropDown = (games)=>{
    const dropDownValue = document.querySelector('#leagueDropdown').value;
console.log(dropDownValue)


const filteredGames = games.filter((game) => {
return game.competition === dropDownValue;
})


// console.log('filteredGames')
createHtmlTable(filteredGames);
};



getData()
