//Dome Menupoletio
let searchListData = document.querySelector('#searchListData');
let userInput = document.querySelector('#user-input');
let addButton = document.querySelector('#add-button');
let saveButton = document.querySelector('#save-button');
let allDeleteButton = document.querySelector('#delete-all-button');
let resultLi = document.querySelector('#result');
let resultAddButton = document.querySelector('#result-add-button');
let todoResultUL = document.querySelector('ul.todo-result');
let formSubmit = document.querySelector('form');

formSubmit.addEventListener('submit', e => e.preventDefault())
//Save data in localStorage
let todoListData = [];
if(localStorage.getItem('todoListData') === null){
  localStorage.setItem('todoListData', todoListData)
}else{
  let localStorageData = JSON.parse(localStorage.getItem('todoListData'))
  todoListData = [...localStorageData]
}


function localStoreg(){
  localStorage.setItem('todoListData', JSON.stringify(todoListData))
  relodeForEach()
}
localStoreg()

//Loop ToDo list data
function relodeForEach(){
  todoResultUL.innerHTML= ''
  todoListData.forEach((value, index) => {
      todoResultUL.insertAdjacentHTML('beforeend',

      `<li> 
        <strong>${index+1}</strong> 
        <span>${value}</span> 
        <button onclick="editButton(${index})" class="edit-button">Edit</button>
        <button onclick="deletButton(${index})" class="delete-button">Delete</button>
      </li>`
      )
  })  
}
relodeForEach()

//User input Data function
userInput.addEventListener('input', function(){
  !(userInput.value.trim() === '') ? resultLi.style.display = 'flex' : resultLi.style.display = 'none' ;
  document.querySelector('#result span').innerHTML = userInput.value;
})

//Add data function
function addButtonfunc () {
  !(userInput.value.trim() == '') ? todoListData.push(userInput.value): '';
  resultLi.style.display = 'none' ;
  userInput.value = '';
  localStoreg()
}

addButton.addEventListener('click', addButtonfunc)
resultAddButton.addEventListener('click', addButtonfunc)

//Edit data function
function editButton(index){
  userInput.value = todoListData[index];
  addButton.style.display = 'none';
  saveButton.style.display = 'inline-block';
  saveButton.setAttribute('data-index', index);
}

//Save data function
saveButton.addEventListener('click', function(){
  todoListData[+saveButton.getAttribute('data-index')] = userInput.value;
  userInput.value = '';
  saveButton.style.display = 'none';
  addButton.style.display = 'inline-block';
  resultLi.style.display = 'none' ;
  localStoreg()
});

//Delete data function
function deletButton(index){
  todoListData.splice(index, 1)
  localStoreg()
};

//All Delete function
allDeleteButton.addEventListener('click', function(){
  todoListData = []
  localStoreg()
});


// Search function
searchListData.addEventListener('input', function(){

  !(userInput.value == '') ? todoListData.push(userInput.value): '';


  resultLi.style.display = 'none' ;

  userInput.value = '';
  
  localStoreg()
  let listLiValue = document.querySelectorAll('ul.todo-result li');
  listLiValue.forEach(function(item){
    let value = item.querySelector('span').innerHTML;
    (value.match(new RegExp(searchListData.value, 'gi'))) ? item.style.display = 'flex' : item.style.display = 'none'
  })
})

