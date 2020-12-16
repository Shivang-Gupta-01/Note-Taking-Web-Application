

shownotes();
// if user adds a notes, add it to local storage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {

        title:  addtitle.value,
        text : addtxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notes);

    shownotes();
});


function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = " ";

    notesObj.forEach(function (element, index) {
        
        html +=
            `<div class=" noteCard my-2 mx-2 card" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <div class="row text-center">
            <div class="col-md-5 col-sm-5 col-lg-5">
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary btn-sm">Delete Note</button> 
            </div>
            <div class="col-md-7 col-sm-7 col-lg-7">
            <button id="${index}"  onclick="markasimp(this.id)" class = "btn btn-primary btn-sm">Mark as Important</button>
            </div>
            </div>
        </div>
    </div>`;
    });

    let notesElm  = document.getElementById("notes");

    if(notesObj.length !=0)
    {
        notesElm.innerHTML = html;
    }
    else
    {
        notesElm.innerHTML = `Nothing to show! Use add notes section above to add notes`;
    }
}

// function to delete a note

   function deleteNote(index)
   {
     // console.log("I am deleting",index); 
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notesObj = [];
     }
     else {
         notesObj = JSON.parse(notes);
     }
     // deleting from local storage
     notesObj.splice(index,1);
    // update the local storage by usinf set index and pushin the notes again
     localStorage.setItem("notes", JSON.stringify(notesObj));
     shownotes();
   }

   // function to mark the note as important 
     
   function markasimp(index)
   {
       console.log("marking as important");
    // marking as important by giving the note class a green border
     
    let notecards = document.querySelectorAll('.noteCard')[index];
    console.log(notecards);
    console.log(notecards.firstElementChild);
    notecards.firstElementChild.classList.add("border","border-success");
     
   }

   // searching the notes

   search = document.getElementById('searchtxt');
   
   search.addEventListener("input",function()
   {
       //console.log("input event fired");

       let inputval = search.value;

       //console.log(inputval);

       let noteCards = document.getElementsByClassName('noteCard');
       Array.from(noteCards).forEach(function(element){

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt);

        if(cardTxt.includes(inputval))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }

       })
    


   })