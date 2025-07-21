//recupero elementi html
const input = document.getElementById("nuovotask");
const ricerca = document.getElementById("cerca");
const aggiungi = document.getElementById("aggiungi");
const svuota = document.getElementById("svuota");
const lista = document.getElementById("totale");
const completate = document.getElementById("completate");
const incompleti = document.getElementById("incomplete");
// lista dei task
let task = [];
//  Salva i task in localstorage
function salva() {
  localStorage.setItem("chiave", JSON.stringify(task));
}
//  Mostra i task
function mostra(attivita) {
  //pulisce le liste
  lista.textContent = "";
  input.value = "";
  completate.textContent = "";
  incompleti.textContent = "";
  attivita.forEach((elementi) => {
    //Creo i task visibili nella lista
    const tasks = document.createElement("p");
    tasks.textContent = elementi.nome;
    tasks.classList.add("task-tot");
    const div = document.createElement("div");
    div.classList.add("contenitore");
    div.classList.add("d-flex");
    // Creo il checkbox per la  conferma dei task
    const conferma = document.createElement("input");
    conferma.type = "checkbox";
    conferma.classList.add("bottone");
    conferma.checked = elementi.valore;
    // Creo il pulsante per eliminare task
    const elimina = document.createElement("p");
    elimina.textContent = "❌";
    elimina.classList.add("cancella");
    //creo contenitore per le liste completate/incomplete
    const div2 = document.createElement("div");
    div2.classList.add("d-flex", "justify-content-center");
    const tasks2 = document.createElement("p");
    tasks2.textContent = elementi.nome;
    //Aggiunge gli elementi al DOM
    div.appendChild(tasks);
    div.appendChild(elimina);
    div.appendChild(conferma);
    lista.appendChild(div);
    div2.appendChild(tasks2);
    conferma.classList.toggle("elemento", elementi.valore);
    //  Event listener per eliminare un task
    elimina.addEventListener("click", function () {
      const indice = task.indexOf(elementi);
      if (indice > -1) {
        task.splice(indice, 1);
        salva();
      }
      aggiornaLista();
    });
    // Mostra i  task nella lista coretta
    if (elementi.valore) {
      completate.appendChild(div2);
      tasks2.classList.add("task-comp");
    } else {
      incompleti.appendChild(div2);
      tasks2.classList.add("task-incomp");
    }
    // Aggiorna lo stato dei task
    conferma.addEventListener("click", function () {
      elementi.valore = conferma.checked;
      salva();
      aggiornaLista();
    });
  });
} // Aggiorna la lista filtrata quando elimini o confermi un task
function aggiornaLista() {
  if (ricerca.value === "") {
    mostra(task);
    return;
  } else {
    const filtro = task.filter((filtra) => {
      return filtra.nome.toLowerCase().startsWith(ricerca.value.toLowerCase());
    });
    mostra(filtro);
  }
}
// Event listener  per aggiungere un nuovo  task
aggiungi.addEventListener("click", function () {
  if (input.value === "") {
    alert("inserire un attività valida");
    return;
  }

  task.push({ nome: input.value, valore: false });
  mostra(task);
  salva();
});
// Memorizzare e salvare i task da localstorage (se esistono)
const dati = localStorage.getItem("chiave");
if (dati) {
  task = JSON.parse(dati);
  mostra(task);
}
// filtra un task in base al testo inserito
ricerca.addEventListener("input", function () {
  if (ricerca.value === "") {
    mostra(task);
    return;
  }

  const filtro = task.filter((filtra) => {
    return filtra.nome.toLowerCase().startsWith(ricerca.value.toLowerCase());
  });
  mostra(filtro);
});
// Event listener per svuotare tutti i task inseriti
svuota.addEventListener("click", function () {
  if (confirm("sei sicuro di eliminare tutto ?")) {
    lista.textContent = "";
    completate.textContent = "";
    incompleti.textContent = "";
    task = [];
    mostra(task);
    salva();
  }
});
