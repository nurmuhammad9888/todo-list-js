
const elForm = document.querySelector(".form-js");
const elInput = document.querySelector(".input-js");
const elBtn = document.querySelector(".btn-js");
const elList = document.querySelector(".list");

const allCheck = document.querySelector(".allcheck");
const checkedD = document.querySelector(".checkk");
const ancheck = document.querySelector(".anchick");

let newArray = [];
let idTitle = 0;

let MainFanuc = function(arry,list){
    list.innerHTML = "";
    let isanch = newArray.filter((anchi) =>{
        return anchi.isComplate == false;
    })
    checkedD.textContent = isanch.length

    let iscom = newArray.filter((arr) =>{
        return arr.isComplate == true;
    })
    ancheck.textContent = iscom.length;

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

let formTaypes ={
    SAVE:"save",
    EDIT:"edit"
}

let formType = formTaypes.SAVE;
let editingId = null; 

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if(formType === formTaypes.SAVE){
        newArray.push({
            textName: elInput.value,
            id: ++idTitle,
            isComplate: false,
        })
        MainFanuc(newArray, elList)
        elForm.reset();    
    }
    
    if(formType === formTaypes.EDIT){
        let editt = {
            id:editingId,
            textName:elInput.value,
        };
        let editingIdFoundIndex = newArray.findIndex(nur => nur.id === editt.id);
        
        newArray.splice(editingIdFoundIndex, 1, editt)
        MainFanuc(newArray, elList);
        formType = formTaypes.SAVE;
        elBtn.textContent = "Add";
        elForm.reset();
    }
})

elList.addEventListener("click", (evt) => {
    if(evt.target.matches(".delet")){
        let deletId = Number(evt.target.dataset.id)
        let index = newArray.findIndex(nurM => nurM.id === deletId)
        newArray.splice(index, 1)
        MainFanuc(newArray, elList)
    }
    
    if(evt.target.matches(".idet")){
        let idetId = Number(evt.target.dataset.id);
        let idetIndex = newArray.find(nur => nur.id === idetId)
        console.log(idetId);
        elInput.value = idetIndex.textName;
        elBtn.textContent = "Edit";
        editingId = idetIndex.id;
        formType = formTaypes.EDIT;
    }
    if(evt.target.matches(".chekbbox-check")){
        let checkId = Number(evt.target.dataset.id);
        let checIndex = newArray.find((chek) => chek.id == checkId);
        
        checIndex.isComplate = !checIndex.isComplate;
        MainFanuc(newArray, elList)
    }
    
})
