const input=document.getElementById("taskInput");
const add=document.querySelector(".add");
const clear=document.querySelector(".clear");
let list=document.getElementById("taskList");
const deleteAll=document.querySelector(".deleteAll");


window.onload=()=>{
    showSavedData();
}
//add task
add.addEventListener("click",()=>{
    let inputValue=input.value;
    let span=document.createElement("span");
    let li=document.createElement("li");
    if(inputValue.trim()!=''){
        li.textContent=inputValue;
        li.classList.add("list");
        span.textContent="\u00d7";
        span.classList.add("clear");
        li.appendChild(span);
        list.appendChild(li);
        input.value="";
        attachEventsToAll(li);
        saveData();
    }
    else{
        alert("You must write something!");
    }
})
//attach events to all tasks (after reloading the page)
function attachEventsToAll(li){
    const items=document.querySelectorAll(".list");
    items.forEach((li)=>{
        attachEvents(li);
    }
    )
}


//attach events to list items
function attachEvents(li){
    let span=li.querySelector(".clear");
        //toggle done
    li.addEventListener("click", (e)=>{
        if(e.target !== span){
            li.classList.toggle("done");
            saveData();
        } 
    });
    span.addEventListener("click",(e)=>{
        e.target.parentElement.remove();;
        //li.remove();
        saveData();
    })
}

//save data
function saveData(){
    localStorage.setItem("data",list.innerHTML);
}
//delete all tasks
deleteAll.addEventListener("click",()=>{
    list.innerHTML="";
    saveData();
})
// get data from local storage
function showSavedData(){
    let data=localStorage.getItem("data");
    list.innerHTML=data;
    attachEventsToAll();

}
