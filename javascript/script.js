const inputBox = document.querySelector(".textinput input");
const add_btn = document.querySelector(".textinput button");
const todoList = document.querySelector(".todoList");
const clearAl_btn = document.querySelector(".toDoListfooter button");

inputBox.onkeyup = () =>{
    let userData = inputBox.value; // we are getting user input
    if(userData.trim() != 0){// if user values are not only spaces 
        add_btn.classList.add("active");
    }else{
        add_btn.classList.remove("active");
    }
}
AddTasks(); //call addtask function 

//on Click Method is you click add button 
add_btn.onclick = ()=>{
    let userData = inputBox.value;
    let getlocalstorage = localStorage.getItem("New Todo");
    if(getlocalstorage == null){
        listArry = []; //creating an Empty list Array 
    }else{
        listArry = JSON.parse(getlocalstorage);//converting json string into js obj
    }
    listArry.push(userData);
    localStorage.setItem("New Todo",JSON.stringify(listArry)); //converting js obj into json string 
    AddTasks(); //call addtask function 
    add_btn.classList.remove("active");

}

function AddTasks(){
    let getlocalstorage = localStorage.getItem("New Todo");
    if(getlocalstorage == null){
        listArry = []; //creating an Empty list Array 
    }else{
        listArry = JSON.parse(getlocalstorage);//converting json string into js obj
    }
    //getting number of task
    const pend_Task = document.querySelector(".pend_Task");
    pend_Task.textContent = listArry.length;
    if(listArry.length > 0){ // for clear all button if empty disable if they is task show button
        clearAl_btn.classList.add("active");
    }else{
        clearAl_btn.classList.remove("active");  
    }
    let newLi_inputlb = '';
    listArry.forEach((element, index) => {
        newLi_inputlb += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fa fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLi_inputlb; //adding new tag list
    inputBox.value = ""; //after task added leave the input field empt
}

//Delete task 
function deleteTask(index){
    let getlocalstorage = localStorage.getItem("New Todo");
    listArry = JSON.parse(getlocalstorage);//converting json string into js obj
    listArry.splice(index, 1); //remove to do list
    //after remove update local storage
    localStorage.setItem("New Todo",JSON.stringify(listArry)); //converting js obj into json string 
    AddTasks(); //call addtask function 

}

//delete function 
clearAl_btn.onclick = ()=>{
    listArry = [];
    localStorage.setItem("New Todo",JSON.stringify(listArry)); //converting js obj into json string 
    AddTasks();
}