
document.addEventListener("DOMContentLoaded",()=>{

var replace = NaN;
chrome.storage.sync.get('isEdit',(obj)=>{
    if(obj.isEdit.edit){
        
        chrome.storage.sync.get('notes', (obj2)=>{
            document.querySelector('#title input').value = obj2.notes[obj.isEdit.id].title;
            document.querySelector('#Body textarea').value = obj2.notes[obj.isEdit.id].body;
            replace = obj.isEdit.id;
            chrome.storage.sync.set({'isEdit':{edit:false, id:0}});
        });
        
    }
});

console.log(document.querySelector('textarea').value.length);

document.querySelector('textarea').addEventListener('keyup',()=> {
    
    var characterCount = document.querySelector('textarea').value.length,
        current = document.querySelector('#current');
        maximum = document.querySelector('#maximum');
        theCount = document.querySelector('#the-count');
      
    console.log("Hello")
    current.innerHTML = characterCount;
});

chrome.storage.sync.get('selected',(obj3)=>{
    if(obj3.selected){
        document.querySelector('#Body textarea').value = obj3.selected;
        document.querySelector('#current').innerHTML = document.querySelector('textarea').value.length;
        chrome.storage.sync.set({'selected':''});

        document.getElementById("save").addEventListener("click",( )=>{
            let title = document.querySelector('#title input').value || 'No title';
            let body = document.querySelector('#Body textarea').value || 'Oops such empty';
            let notes_arr = [];
            chrome.storage.sync.get('notes',(obj)=>{
                if(obj.notes){
                    notes_arr = [...obj.notes];
                };
                
                notes_arr.push({title:title,body:body});
        
                chrome.storage.sync.set({'notes':notes_arr});
                console.log(notes_arr);
                
                window.close();
            });
        
        });

        document.getElementById("discard").addEventListener("click",()=>{
            window.close();
        });

    }else{
        document.getElementById("save").addEventListener("click",( )=>{

            let title = document.querySelector('#title input').value || 'No title';
            let body = document.querySelector('#Body textarea').value || 'Oops such empty';
            document.querySelector('#current').innerHTML = document.querySelector('textarea').value.length;
            console.log(title);
            console.log(body);
            let notes_arr = [];
            chrome.storage.sync.get('notes',(obj)=>{
                if(obj.notes){
                    notes_arr = [...obj.notes];
                };
        
                if(isNaN(replace)){
                    notes_arr.push({title:title,body:body});
                }else{
                    notes_arr[replace] = {title:title,body:body};
                };
        
                chrome.storage.sync.set({'notes':notes_arr});
                console.log(notes_arr);    
            });
        
            location.href = "popup.html";    
        });

        document.getElementById("discard").addEventListener("click",()=>{
            location.href = "popup.html";
        });

    }
   
});




});
