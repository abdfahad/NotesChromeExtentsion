const contextMenuItem = {
    "id":"addToNotes",
    "title":"Add to Notes",
    "contexts":["selection"]
};

chrome.storage.sync.get('notes',(obj)=>{
    if(obj.notes){
        let NoNotes = obj.notes.length;
        chrome.action.setBadgeText({text: NoNotes.toString()});
    }
});

chrome.storage.onChanged.addListener((changes, area)=>{
    console.log(changes)
    if( area == 'sync' && changes.notes){
        console.log(changes);
        chrome.action.setBadgeText({text: changes.notes.newValue.length.toString()});
    };
});

chrome.contextMenus.create(contextMenuItem, ()=>{  

chrome.contextMenus.onClicked.addListener((textData)=>{
    if(textData.menuItemId == "addToNotes" && textData.selectionText && textData.selectionText.length <= 500){
        console.log(textData.selectionText);
        chrome.storage.sync.set({'selected':textData.selectionText},()=>{
            chrome.tabs.create({url: 'Note.html'});
        });
        
    }
})


});