
const elForm = document.querySelector(".form-js");
const elInput = document.querySelector(".input-js");
const elBtn = document.querySelector(".btn-js");
const elList = document.querySelector(".list");

const allCheck = document.querySelector(".allcheck");
const comlated = document.querySelector(".comlated");
const uncompleted = document.querySelector(".uncompleted");

let MainFanuc = function(arry,list){
    list.innerHTML = "";

    let comlate = arry.filter((anchi) =>{
        return anchi.isComplate == false;
    })
    comlated.textContent = comlate.length

    let uncomplet = arry.filter((arr) =>{
        return arr.isComplate == true;
    })
    uncompleted.textContent = uncomplet.length;

    allCheck.textContent = arry.length;

    arry.forEach((arrays) => {
        let = item = document.createElement("li");
        item.classList.add("d-flex", "align-items-center","mx-auto", "mt-3", "bg-secondary", "justify-content-between","py-2", "rounded")
        
        let = check = document.createElement("input");
        check.type = "checkbox";
        check.name = "checkbox";
        check.dataset.id = arrays.id;
        check.classList.add("check","chekbbox-check");
        item.appendChild(check)
        
        let = text = document.createElement("p");
        text.classList.add("text-white", "fs-5" ,"text-center", "mb-0")
        text.textContent = arrays.textName;
        item.appendChild(text);
        
        if(arrays.isComplate){
            text.style.textDecoration = "line-through";
            check.checked = true;
        }
        let = btnDell = document.createElement("button");
        btnDell.type = "button";
        btnDell.dataset.id = arrays.id
        btnDell.textContent = "Delete";
        btnDell.classList.add("btn","btn-danger" ,"text-white");
        btnDell.classList.add("delet")
        item.appendChild(btnDell);
        
        let = btnIdet = document.createElement("button");
        btnIdet.type = "button"
        btnIdet.dataset.id = arrays.id
        btnIdet.textContent = "Edet";
        btnIdet.classList.add("idet")
        btnIdet.classList.add("btn","btn-info" ,"text-white","mx-2");
        item.appendChild(btnIdet);
        
        let div = document.createElement("div");
        div.appendChild(btnDell);
        div.appendChild(btnIdet);
        elList.appendChild(item);
        item.appendChild(div)
    });
}

const lacal = JSON.parse(window.localStorage.getItem("newArray"))
const newArray = lacal || [];
MainFanuc(newArray, elList)

let idTitle = 0;
let editingId; 

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if(elBtn.textContent === "Add"){
        newArray.push({
            textName: elInput.value,
            id: ++idTitle,
            isComplate: false,
        })
        window.localStorage.setItem("newArray", JSON.stringify(newArray))
        MainFanuc(newArray, elList)
        elForm.reset();    
    }
    if(elBtn.textContent === "Edit"){
        let editt = {
            textName:elInput.value,
            id:editingId,
            isComleted:false,
        };
        let editingIdFoundIndex = newArray.findIndex(todo => todo.id === editt.id);
        newArray.splice(editingIdFoundIndex, 1, editt)
        window.localStorage.setItem("newArray", JSON.stringify(newArray))
        MainFanuc(newArray, elList);
        elBtn.textContent = "Add";
        elForm.reset();
    }
})

elList.addEventListener("click", (evt) => {
    if(evt.target.matches(".delet")){
        let deletId = Number(evt.target.dataset.id)
        let index = newArray.findIndex(todo => todo.id === deletId)
        newArray.splice(index, 1)
        window.localStorage.setItem("newArray", JSON.stringify(newArray))
        MainFanuc(newArray, elList)
    }
    
    if(evt.target.matches(".idet")){
        let idetId = Number(evt.target.dataset.id);
        let idetIndex = newArray.find(nur => nur.id === idetId)
        elInput.value = idetIndex.textName;
        elBtn.textContent = "Edit";
        editingId = idetIndex.id;
    }
    if(evt.target.matches(".chekbbox-check")){
        let checkId = Number(evt.target.dataset.id);
        let checIndex = newArray.find((chek) => chek.id == checkId);
        checIndex.isComplate = !checIndex.isComplate;
        window.localStorage.setItem("newArray", JSON.stringify(newArray))
        MainFanuc(newArray, elList)
    }
    
})
