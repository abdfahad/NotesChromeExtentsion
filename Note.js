document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("discard").addEventListener("click",()=>{
    location.href = "popup.html";
});

document.getElementById("save").addEventListener("click",()=>{
    let title = document.querySelector('#title input').value || 'No title';
    let body = document.querySelector('#Body textarea').value || 'Oops such empty';

    console.log(title);
    console.log(body);
    let notes_arr = [];
    chrome.storage.sync.get('notes',(obj)=>{
        if(obj.notes){
            notes_arr = [...obj.notes];
        };
        notes_arr.push({title:title,body:body});

        chrome.storage.sync.set({'notes':notes_arr});
        console.log(notes_arr);    
    });

    location.href = "popup.html";    
});
});

