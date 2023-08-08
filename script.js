var form = document.getElementById('expenses-form');
var expensename = document.getElementById('expense-name');
var amount = document.getElementById('amount');
var category = document.getElementById('category');
var date = document.getElementById('ex-date');
var tableItems = document.getElementById('tableitems'); 
var tableDiv = document.getElementById('results');
var filterForm = document.getElementById('filter-form');
var filterName = document.getElementById('filter-name');
var filterCategory =document.getElementById('filter-category');
var totalValue = document.getElementById('totalValue');

var noteCount = 0;
var newNote  = '';
var sum = 0;
var isUpdate = false;
var text1,text2,text3,text4;

window.onload = updateTable;

//Add EventListener
form.addEventListener('submit', addExpenses);
filterForm.addEventListener('submit',filterTable);
tableItems.addEventListener('click',removeNotes);
tableItems.addEventListener('click', updateNotes);


//Update table function
function updateTable(){
    if(noteCount > 0){
        tableDiv.style.display='';
        
        if(isUpdate){
            text1.textContent = expensename.value;
            text2.textContent = amount.value;
            text3.textContent = category.value;
            text4.textContent = date.value;

            isUpdate = false;
            noteCount--;
            


        }
        else{
            tableItems.appendChild(newNote);
        }
    }
    else{
        tableDiv.style.display=' none';
    }
}

//Add  note
function addExpenses(e){
    //stop initial behavior
    e.preventDefault();
    
    //create table row
    var tr = document.createElement('tr');
    tr.className= 'item';

    //create table data
    var td1 = document.createElement('td');
    td1.className = 'item-name';
    td1.appendChild(document.createTextNode(expensename.value));

    var td2 = document.createElement('td');
    td2.className = 'item-amount';
    td2.appendChild(document.createTextNode(amount.value));

    var td3 = document.createElement('td');
    td3.className = 'item-category';
    td3.appendChild(document.createTextNode(category.value));

    var td4 =document.createElement('td');
    td4.className='item-date';
    td4.appendChild(document.createTextNode(date.value));

    //update and delete buttons
    var td5 = document.createElement('td');
    td5.className='item-button1';
    var update= document.createElement('button');
    update.appendChild(document.createTextNode('Update'));
    update.setAttribute('id','updatebtn');   
    td5.appendChild(update);
    
    var td6 =document.createElement('td');
    td6.className = 'item-button2';
    var dlt = document.createElement('button');
    dlt.appendChild(document.createTextNode('Delete'));
    dlt.setAttribute('id','deletebtn');
    td6.appendChild(dlt);

    
    // append all table data to table row
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    //increase the note count
    noteCount++;

    //add the inserted data to new note
    newNote =tr;
    
    //call the function to update/delete note
    updateTable(); 
    totalValues();
    resetAll();
    
}


function totalValues(){
   // sum = sum + parseInt(amount.value);
    //totalValue.innerHTML= 'Total Amount is : '+sum;
    //console.log(sum);
    var table = document.getElementById("tableitems");
    sumVal = 0;
            
    for(var i = 1; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseInt(table.rows[i].cells[1].innerHTML);
    }
    
    document.getElementById("totalValue").innerHTML = "Total amount is :  Rs." + sumVal;
    console.log(sumVal);
}

// filter function
function filterTable(e){
    e.preventDefault();
    // text to lowercase
    var searchText = filterName.value.toLowerCase(); 
    var searchCategory = filterCategory.value;
    //get title from tr
    var list = tableItems.getElementsByClassName('item');

    var listArray = Array.from(list);
     // check each array item
     listArray.forEach(function (itm){
        // get the title text from the above array
        var titletext = itm.children[0].textContent;
        var categorytext =itm.children[2].textContent;
        // matching the title text vs searching text
        if(titletext.toLowerCase().indexOf(searchText) != -1){

            if(categorytext.indexOf(searchCategory) != -1){

                itm.style.display ='';
            }
            else{
                itm.style.display = 'none';
            }            
        }
        else{
            itm.style.display = 'none';
        }
    });
 

}

//Remove Notes
function removeNotes(e){

    if(e.target.id === 'deletebtn'){
        if(confirm('Do you want delete this record ? ')){
            var tr = e.target.parentElement.parentElement;
            tableItems.removeChild(tr);
            totalValues();
            noteCount--;
            if(noteCount === 0){
                updateTable();
                
            }
        }
    }
}

function updateNotes(e){

    if(e.target.id === 'updatebtn'){
        var tr = e.target.parentElement.parentElement;
         text1 = tr.children[0];
        expensename.value = text1.textContent;

         text2 = tr.children[1];
        amount.value = text2.textContent;

         text3 = tr.children[2];
        category.value = text3.textContent;

         text4 = tr.children[3];
        date.value = text4.textContent;

        isUpdate = true;
    }
}

//Reset all fields
function resetAll(){
    expensename.value ='';
    amount.value = '';
    category.value ='';
    date.value = '';
    isUpdate = false;
    newNote = '';
}