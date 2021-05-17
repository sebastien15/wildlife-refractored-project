//scripts toggle navigation ofr phone
const phoneDrawer = document.querySelector("#phoneDrawer");

phoneDrawer.addEventListener('click',()=>{
    document.querySelector('#moboNav').classList.toggle('disNone')
    document.querySelector('.drawerbar1').classList.toggle('rotate45')
    document.querySelector('.drawerbar2').classList.toggle('disNone')
    document.querySelector('.drawerbar3').classList.toggle('rotate-45')

})
// scripts to toggle account dropdown starts


const accountBtn = document.querySelector('.accountBtn')

accountBtn.addEventListener('click',(e)=>{
    const nextSibling = e.target.nextSibling.nextSibling;
    nextSibling.classList.toggle("disNone")
    
})


// scripts to toggle account dropdown ends

// scripts to toggle modal signup starts

const signupBtn = document.querySelectorAll('.signupBtn')
const loginBtn = document.querySelectorAll('.loginBtn')
const signupModal = document.querySelector('.signupModal')
const loginModal = document.querySelector('.loginModal')
const modalCloser = document.querySelectorAll('.modalCloser')
const modals = document.querySelectorAll('.Modal')
const logoutBtn = document.querySelector('.logoutBtn')
if(logoutBtn) {
    logoutBtn.addEventListener('click',()=>{ 
        document.cookie = "auth = ; path=/"
        window.location.href= "/"
    })
}
modalCloser.forEach(element=>{
    element.addEventListener('click',()=>{
        element.parentElement.parentElement.classList.toggle('disNone')
    })
})
const closeOtherModals = ()=>{
    modals.forEach(element=>{
        if(!element.classList.contains('disNone')) element.classList.add('disNone')
    })
}
signupBtn.forEach(element=>{

    element.addEventListener('click',()=>{
        closeOtherModals()
        signupModal.classList.toggle('disNone')
        accountBtn.nextSibling.nextSibling.classList.toggle('disNone')
        
    })
})
loginBtn.forEach(element=>{
    
    element.addEventListener('click',()=>{
        closeOtherModals()
        loginModal.classList.toggle('disNone')
        accountBtn.nextSibling.nextSibling.classList.toggle('disNone')
    })
})

// scripts to toggle modal signup ends

//script for interacting with api

  const delBtn = document.querySelector('.delBtn')
  if(delBtn){
    delBtn.addEventListener('click', (e)=>{
        const endpoint = `/api/animals/${delBtn.dataset.doc}`;
        fetch(endpoint,{
            method: "DELETE"
        }).then((response)=>{
            response.json().then((data)=>window.location.href=data.redirect)
        })
        .catch((error)=>console.log(error))
    })
  }

const saveJsonData = async (url,body) => {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const content = await rawResponse.json();
    if (content.redirect) window.location.href=content.redirect
 
    // console.log(content);
};
const saveFormData = async (url,formData,methodName) => {
    const rawResponse = await fetch(url, {
      method: methodName,
      body: formData
    });
    const content = await rawResponse.json();
    if (content.redirect) window.location.href=content.redirect
    console.log(content);
};

const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const saveAnimalForm = document.querySelector('#saveAnimalForm');
const editAnimalForm = document.querySelector('#editAnimalForm');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const firstName = document.querySelector('input[name="firstName"]').value
    const lastName = document.querySelector('input[name="lastName"]').value
    const email = document.querySelector('input[name="email"]').value
    const password = document.querySelector('input[name="password"]').value
    const body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }
    const validationErrors = FormValidation(body); 
    if(Object.keys(validationErrors).length != 0) {
        if(validationErrors["firstName"] != undefined) document.querySelector('#firstNameError').innerText = validationErrors["firstName"]
        if(validationErrors["lastName"] != undefined) document.querySelector('#lastNameError').innerText = validationErrors["lastName"]
        if(validationErrors["email"] != undefined) document.querySelector('#emailError').innerText = validationErrors["email"]
        if(validationErrors["password"] != undefined) document.querySelector('#passError').innerText = validationErrors["password"]
        return
    }
    const url = "api/admins/create"
    saveJsonData(url,body)
})
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = document.querySelector('#loginEmail').value
    const password = document.querySelector('#loginPass').value
    const body = {
        email: email,
        password: password
    }
    const validationErrors = FormValidation(body);
    
    if(Object.keys(validationErrors).length != 0) {
        if(validationErrors["email"] != undefined) document.querySelector('#loginEmailError').innerText = validationErrors["email"]
        if(validationErrors["password"] != undefined) document.querySelector('#loginPassError').innerText = validationErrors["password"]

        return
    }
    const url = "api/admins/login"
    saveJsonData(url,body)
})

let validationErrors = {}
const FormValidation = (inputs)=>{

    for(const name in inputs){
        
        if (inputs[name] ==  "" || inputs[name] == undefined) {
            name != 'fImage' ? validationErrors[name]= `${name} field is required` : validationErrors[name]= `Featured image field is required`
        }else{
            delete validationErrors[name]
        }
    }
    return validationErrors
}

if(saveAnimalForm){
    saveAnimalForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const title = document.querySelector('input[name="title"]').value
        const status = document.querySelector('select[name="status"]').value
        const description = document.querySelector('textarea[name="description"]').value
        const fImage = document.querySelector('input[name="fImage"]').files[0]

        const body = {
            title: title,
            status: status,
            description: description,
            fImage: fImage
        }
        const validationErorrs = FormValidation(body);
        
        if(Object.keys(validationErrors).length != 0) {
            if(validationErrors["title"] != undefined) document.querySelector('#titleError').innerText = validationErrors["title"]
            if(validationErrors["description"] != undefined) document.querySelector('#descError').innerText = validationErrors["description"]
            if(validationErrors["fImage"] != undefined) document.querySelector('#fImageError').innerText = validationErrors["fImage"]
            return
        }
        const formData  = new FormData();
        for(const name in body) {
            formData.append(name, body[name]);
        }
        const url = "/api/animals"
        saveFormData(url,formData,"POST")
    })
}

if(editAnimalForm){
    console.log(editAnimalForm)
    editAnimalForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const id = document.querySelector('input[name="id"]').value
        const title = document.querySelector('input[name="title"]').value
        const status = document.querySelector('select[name="status"]').value
        const description = document.querySelector('textarea[name="description"]').value
        const fImage = document.querySelector('input[name="fImage"]').files[0]
        const body = {
            title: title,
            status: status,
            description: description,
            fImage: fImage
        }
        const validationErorrs = FormValidation(body);
        
        if(Object.keys(validationErrors).length != 0) {
            console.log(validationErrors)
            if(validationErrors["title"] != undefined) document.querySelector('#titleError').innerText = validationErrors["title"]
            if(validationErrors["description"] != undefined) document.querySelector('#descError').innerText = validationErrors["description"]
            if(validationErrors["fImage"] != undefined) document.querySelector('#fImageError').innerText = validationErrors["fImage"]
            return
        }
        const formData  = new FormData();
        for(const name in body) {
            formData.append(name, body[name]);
        }
        const url = `/api/animals/${id}`
        saveFormData(url,formData,"PATCH") 
    })
}