//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load All Event Listner
loadEventListners();

function loadEventListners(){
    //Dom Load Event
    document.addEventListener('DOMContentLoaded',getTask);
    //Add Task Event
    form.addEventListener('submit',addTask);
    //Remove Task Event
    taskList.addEventListener('click',removeTask); 
    //Clear All Task
    clearBtn.addEventListener('click',removeAllTask);
    
    //Filter Task
    filter.addEventListener('keyup',filterTask);
}
//get task from LS
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){    
    //Create Li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    //Create Delete Link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);
    //Append Li to ui
    taskList.appendChild(li);
    })    
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
        return;
    }

    //Create Li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //Create Delete Link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);
    //Append Li to ui
    taskList.appendChild(li);
    //Store in LS
    storeTaskInLocalStorage(taskInput.value);
    
    //Task Input Clear
    taskInput.value = '';
    
    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));    
}


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure')){
         e.target.parentElement.parentElement.remove();
            
        //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);   
        }    
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
     localStorage.setItem('tasks',JSON.stringify(tasks)); 
    
}


//Remove All Task
function removeAllTask(e){
    //taskList.innerHTML = '';
    
    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
    //Clear from LS
    localStorage.clear();
}

//Filter Task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1 ){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none'; 
        }
    });
    
}












