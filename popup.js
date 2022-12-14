chrome.storage.sync.set({'isEdit': { edit:false , id:0}});
document.addEventListener("DOMContentLoaded",()=>{
    var notes = [];
    chrome.storage.sync.get('notes',(obj)=>{
        if(obj.notes){
            notes = [...obj.notes];
        }else{
            notes = [];
        }

        for(i=0; i<notes.length; i++){
            let note_id =  i+1;
            console.log(note_id);
            let html = `<div id=" ${note_id} " class="accordion-item Note">
                        <h2 class="accordion-header overflow-auto" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        <p>${notes[i].title}</p>
                        </button>
                        </h2>
                        <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body overflow-auto">
                                <p>${notes[i].body}</p>
                                <div class="d-inline-flex justify-content-between" style="text-align: left;width: 100%;">
                                    <button id="edit${i}" type="button" class="btn btn-link edt">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                    </button>
                                    <button id="delete${i}" type="button" class="btn btn-link dlt">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`

            document.getElementById("Notes").innerHTML += html;

            
        };
        
        let matchedEdit = document.querySelectorAll(".edt");
        let matchedDelele = document.querySelectorAll(".dlt");
        
        for(i=0; i<matchedEdit.length; i++){
            matchedEdit[i].addEventListener("click",(event)=>{
                let id = event.currentTarget.id;
                id = parseInt(id.slice(4));

                let nts = [];
                chrome.storage.sync.get('notes', (obj)=>{
                    nts = [...obj.notes];
                    
                    chrome.storage.sync.get('isEdit',(obj)=>{
                        chrome.storage.sync.set({'isEdit': { edit:true , id:id}},()=>{
                            location.href = "Note.html";
                        });
                    })
                    
                });
            });
        };

        for(i=0; i<matchedDelele.length; i++){
            matchedDelele[i].addEventListener("click",(event)=>{
                let id = event.currentTarget.id;
                console.log(id);

                //Code from dcode@youtube 
                Confirm.open({
                    title: 'Delete Note',
                    message: 'Are you sure you want to delete the note?',
                    onok: () => {
                       id = parseInt(id.slice(6));
                        let nts = [];
                        chrome.storage.sync.get('notes',(obj)=>{
                            nts = [...obj.notes];
                            nts.splice(id,1);
                            chrome.storage.sync.set({'notes':nts});
                            console.log(nts);
                            location.href = "popup.html";
                        })
                    }
                  })
                //Code from dcode@youtube 
            });
        };


    });
    
    document.getElementById("NewNote").addEventListener("click",(event)=>{
        location.href = "Note.html";
    });
});



//Code from dcode@youtube 

const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'OK',
            cancelText: 'Cancel',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};


//Code from dcode@youtube 
