'use strict'

let users = [];

function Person(id,name,surname,birthDay,email){
    this.id = id,
    this.name = name,
    this.surname = surname,
    this.birthDay = birthDay,
    this.age = 0,
    this.email = email,
    this.calculateAge = function(birthDay){
        let year = birthDay.slice(0,4);
        let dateNow = new Date();
        this.age = dateNow.getFullYear() - year;
    }
}

// -- starts on document load
function init(){
    window.alerts = document.querySelector('.alerts');
    window.onlyNumberRegex = /[\d]/;
    window.onlyTextRegex = /^[A-Za-z]+$/;
    window.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    window.dateTypeRegex = /^(\d{4})-0*([0-9]|1[0-2]){1}-0*([0-9]|[12][0-9]|3[01]){1}$/;
}



// -- works on form submit
let id = 0;
function sent(){
     
    event.preventDefault();
    alerts.innerHTML = "";

    let name     = document.forms['register']['name'];
    let surname  = document.forms['register']['surname'];
    let birthDay = document.forms['register']['birthday'];
    let email    = document.forms['register']['email'];

    if(validation(name.value,surname.value,birthDay.value,email.value)){
        id++;

        let correctDate = checkDigits(birthDay.value);

        let newPerson = new Person(id,name.value,surname.value,correctDate,email.value);
            newPerson.calculateAge(correctDate);
            users.push(newPerson);
        drawList();
        reset(name,surname,birthDay,email);
    }
}


// ----- adding zero to single digits of date
function checkDigits(date){
    let dateArr = date.split('-');
    dateArr[1] = (dateArr[1].length == 1) ? '0' + dateArr[1] : dateArr[1];
    dateArr[2] = (dateArr[2].length == 1) ? '0' + dateArr[2] : dateArr[2];
    return dateArr.join('-');
}


// -------  remove users 
function remove(){
    let id = document.querySelector('.delId');
    alerts.innerHTML = "";

    if(id.value != ""){
        if(onlyNumberRegex.test(id.value)){
            for(let i=0; i< users.length; i++){
                if(users[i].id == id.value){
                    let index = users.indexOf(users[i]);
                        users.splice(index,1);
                        greenWarning(' id nömrəsi '+ id.value +' olan istifadəçi silindi! ');
                        break;
                }
                else if( i == users.length-1){
                        redWarning(' id nömrəsi '+ id.value +' olan istifadəçi yoxdur! ');
                }
            }
        }
        else{ redWarning('id nömrəsi yalnız rəqəm ola bilər'); }

        drawList();
        reset(id);
    }
}


// --- Resetting inputs
function reset(){
    for(let i=0; i< arguments.length; i++){
        arguments[i].value = "";
    }
}

// -- -- sort array by id or name or surname
function sort(event){
    let id = event.target.id;
    
     switch(id){
        case '1':
             users.sort(objectSort('id'));
            break;
        case '2':
             users.sort(objectSort('name'));
            break;
        case '3':
              users.sort(objectSort('surname'));
            break;
      }

  drawList();
}

// --- Sort by any property in object array
function objectSort(property){

    return function (a,b) {
        a[property] = String(a[property]);
        b[property] = String(b[property]);

        var result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : 
        (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
        return result;
    }
}


// --- drawing list to body
function drawList(){
    let tbody = document.querySelector('.tbody');
    let tr = '';

    for(let i=0; i< users.length; i++){
        tr += '<tr>';
        tr += '<td>' + users[i].id + '</td>';
        tr += '<td>' + users[i].name + '</td>';
        tr += '<td>' + users[i].surname + '</td>';
        tr += '<td>' + users[i].age + '</td>';
        tr += '<td>' + users[i].email + '</td>';
        tr += '</tr>';
    }
    tbody.innerHTML = tr;
}


// checking form validation
function validation(name,surname,birthDay,email){

    name = name.trim();
    surname = surname.trim();
    email = email.trim();
    let valid = 0;

        if(name =="" && surname=="" && birthDay=="" && email == ""){
                    redWarning('Əvvəlcə formu tam doldurun :) ');
        }
        else{
            valid++;
            
                if(name =="" || surname=="" || birthDay=="" || email == ""){
                    redWarning('Formda boş xana buraxmısız ! ');
                }
                else{
                    valid++;
                }
                if(!onlyTextRegex.test(name) && surname != "" && name != "" || !onlyTextRegex.test(surname) && surname != "" && name != ""){
                    redWarning('Ad və ya soyad xanalarına yalnız hərf yazın');
                }
                else{
                    valid++;
                }
                if(!emailRegex.test(email) && email != ""){
                    redWarning('Emaili düzgün formatda yazın');
                }
                else{
                    valid++;
                }
                if(!dateTypeRegex.test(birthDay) && birthDay != ""){
                    redWarning('Doğum tarixiniz düzgün deyil');
                }
                else{
                    valid++;
                }
         }   

         if(valid == 5){
            greenWarning( 'Xoş gəldiniz '+ name + ' '+ surname);
            return true;
         }
         else{
             return false;
         }
}


// ------- warnings

function redWarning(text){

    let wr =  '<div class="alert alert-danger"> <button type="button" class="close" data-dismiss="alert">&times;</button><strong>'+ text +'</strong></div>';
    alerts.innerHTML += wr;
}

function greenWarning(text){
    let wr =  '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button><strong>'+ text +'</strong></div>';
    alerts.innerHTML += wr;
}
