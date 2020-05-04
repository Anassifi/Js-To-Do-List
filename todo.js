//ADD new To do 
const addForm = document.querySelector('.add'); // form add
const list = document.querySelector('.todos'); // ul todos
const popup = document.querySelector('.popup'); // div popup
const gPop = document.querySelector('.popup-wrapper'); //divParent of popup
const btn = document.querySelector('.btn'); // btn inside form add
const search = document.querySelector('.search input'); //form search
gPop.style.display = "none";


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre afficher (time control)*/
function start(duree)
{
var o=document.getElementById("sp");
if(duree > 0)
{
o.innerHTML = duree;
gPop.style.display = "block";
setTimeout("start("+duree+" -1)", 1000);
}
else
{
   alert("enter a valid to do");
o.innerHTML ="Au revoir";
gPop.style.display="none";
popup.style.visibility ="hidden";

}};


/* Function Creation dynamique du POPUP */

function create(){
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id','closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
   <span id="sp">1</span>
   <h2>Fill the Input</h2>
   <p>Don't forget</p>
   <a href="#">Return</a>`;
   div2.innerHTML=html;
   popup.append(div2); 
   
}

/* Function generation dynamique des TODOS */

const generateTemp = todo =>{
   const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
             <span>${todo}</span>
             <i class="fas fa-trash delete"></i>
            </li>
   `;  
   list.innerHTML += html;
};


/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

	node.addEventListener(type, function(e) {
	
		e.target.removeEventListener(e.type, arguments.callee);

		return callback(e);
	});
}

onetime(gPop,'click',handler);

    function handler(e){
         
      if(e.target.id='closing'){
   
         gPop.style.display ="none";
   }
}

/***************Fin reusable function********************/




/************* Adding TO DO**************/

//Eventlistner Add TODOS
btn.addEventListener('click',e =>{
   e.preventDefault();
   const value = addForm.querySelector('input[type="text"]').value;
   if(value == ''){
      create();
      start(3);
      
   } else {
      generateTemp(value);
      addForm.reset();
   }
   
});

/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/
list.addEventListener('click',e =>{
   if(e.target.tagName == 'I'){
      const li = e.target.parentElement;
      list.removeChild(li);
   }
});

/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 



const retrieve = (term) =>{
   //function pour faire un filtre i
   // search = input,list = ul,
   term = search.value.toUpperCase();
   const li = list.getElementsByTagName('li');
   const table = Array.from(li);
   for( i = 0; i < table.length; i++){
      span = table[i].getElementsByTagName('span')[0];
      txtValue = span.textContent.toUpperCase() || span.innerHTML.toUpperCase();
      if(txtValue.includes(term)) {
         table[i].style.setProperty('display', 'flex', 'important');
      } else {
         table[i].style.setProperty('display', 'none', 'important');
      }
   }
};


//evenement de recherche des mots clés
search.addEventListener('keyup', () =>{
   const term = search.value.toUpperCase();
   retrieve(term);
});

/*************************************Fin SEARCH ITEM********************************************/


