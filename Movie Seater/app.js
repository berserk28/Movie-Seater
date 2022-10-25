const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const selected_seats = document.getElementById('selected-seats');
const total_money = document.getElementById('total-price');

populateUI();

// function that get items from local storage and populate the UI
function populateUI(){
    
    // Populate seat selected
    let seats_selected =JSON.parse(localStorage.getItem('selected-seat-index'))
    console.log(seats_selected)
    //   1- we check local storage seat exist and its not empty 
    if(seats_selected != null && seats_selected.length > 0){
    //   2- we use for each on all seats and when the condition is true wee add class
       seats.forEach(function(seat,index){
        if(seats_selected.indexOf(index) > -1){
            seat.classList.add('selected')
        }
       }) 
    }
    // populate the movie name and total seat & price
    const movie_index = localStorage.getItem('selected-movie-index')
    if(movie_index !== null){
        document.getElementById('movie-name').selectedIndex=movie_index;
    }
    const movie_value = JSON.parse(localStorage.getItem('selected-movie-value'))
    
    total_money.innerHTML=movie_value*seats_selected.length;
    selected_seats.innerHTML= seats_selected.length;
    
}
    

// function that calculate the number of seats selected .
function numberOfseats(){
    const selected = document.querySelectorAll('.row .seat.selected');
    return selected.length;
}

// function that calculate the total payement of ticket
function total(nbr){
    const movie_cost = document.getElementById('movie-name').value;
    return nbr*movie_cost;
}

// ----------------- event listen when u select new movie to update the total --------------------
document.getElementById('movie-name').addEventListener('change',change);

function change(e){
    selected_seats.innerHTML=numberOfseats();
    total_money.innerHTML=total(numberOfseats())+ '$';

    // save the movie index and price in Local Storage
    localStorage.setItem('selected-movie-index',e.target.selectedIndex);
    localStorage.setItem('selected-movie-value',e.target.value)
}
// ----------------  event listner when u click for seat -------------------------
document.querySelector('.showcase').addEventListener('click',doit);
function doit(e){
    const target = e.target; 
    if(target.className === 'seat' || target.className === 'seat selected'){
        target.classList.toggle('selected');
        // show how many seats are
        selected_seats.innerHTML=numberOfseats();
        total_money.innerHTML=total(numberOfseats())+'$';
    }  
    // save the index of selected seats in Local Storage
    const seats_selected = document.querySelectorAll('.row .seat.selected');
    const hhh = [...seats_selected];
    const arr = hhh.map(function(seat){
        return [... seats].indexOf(seat);
    })
    localStorage.setItem('selected-seat-index',JSON.stringify(arr));
}