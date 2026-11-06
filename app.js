/* const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    alert('Bonjour depuis JavaScript !');
}); */

console.log("app.js chargé"); //fonctionne dans les 4 pages

//longueur limite des titres
const LONGUEUR_MIN = 5;
const LONGUEUR_MAX = 80;
//longueur limite des messages
const MESSAGE_MAX = 500;

//titres des sujets, plus ancien au plus récent //titre 4-6 existent pas encore...
const titres = [
  "Titre1",
  "Titre2",
  "Titre3",
  "Titre4?",
  "Titre5SQL",
  "Titre6SQL",
];

//fonctions
//rend un nouveau tableau trié
function titresTries(titres) {
  return [...titres].sort((a, b) => a.localeCompare(b));
}
//rend dans un tableau tous les elements qui contiennent le texte
function chercheDansTitres(titres, texte) {
  texte = String(texte);
  return titres.filter((titres) =>
    titres.toUpperCase().includes(texte.toUpperCase()),
  );
}

//rend true si l'element existe dans la liste
function titreExiste(titres, saisie) {
  saisie = saisie.toUpperCase();
  saisie = saisie.trim();
  let exist = false;
  for (let i = 0; i < titres.length; i++) {
    if (titres[i].trim().toUpperCase() === saisie) {
      exist = true;
      break;
    }
  }
  return exist;
}

//test les entrée de nouveau titres et affiche un message correspondant à l'erreur
function validerTitre(titres, saisie) {
  const titre = saisie.trim();
  if (titre.length === 0) {
    return "Le titre est obligatoire";
  }
  if (titre.length < LONGUEUR_MIN) {
    return "Le titre doit faire au moins " + LONGUEUR_MIN + " caractères.";
  }
  if (titre.length > LONGUEUR_MAX) {
    return "Le titre doit faire au maximum " + LONGUEUR_MAX + " caractères.";
  }
  if (titreExiste(titres, titre)) {
    return "Ce sujet existe déjà.";
  }
  return "";
}
//cree une nouvelle carte avec en entrée le titre
function carteSujet(titre) {
  const sujet = document.createElement("article");
  sujet.classList.add("carte-sujet");

  const h3 = document.createElement("h3");
  h3.textContent = titre;
  sujet.append(h3);
  return sujet;
}
//supprime les sujets dans l'index pour afficher les sujets mis à jour
function afficherSujets(liste) {
  const sujets = document.querySelector("#sujets");
  const cartes = document.querySelectorAll(".carte-sujet");

  for (let i = 0; i < cartes.length; i++) {
    cartes[i].remove();
  }
  for (let i = 0; i < liste.length; i++) {
    sujets.append(carteSujet(liste[i]));
  }
}
//idMessage correspond à l'id des messages d'erreur soit : "erreur-pseudo", "#erreur-titre" ou "#erreur-message". texte est le message d'erreur affiché
function afficherErreur(idMessage, texte) {
  document.querySelector(idMessage).textContent = texte;
}
function validerPseudo(saisie) {
  saisie = saisie.trim();
  if (saisie.length === 0) {
    return "Le pseudo est obligatoire.";
  }
  return "";
}
function validerMessage(saisie) {
  saisie = saisie.trim();
  if (saisie.length === 0) {
    return "Le message est obligatoire.";
  }
  if (saisie.length > MESSAGE_MAX) {
    return "Le message ne doit pas dépasser " + MESSAGE_MAX + " caractères.";
  }
  return "";
}
//tests etape 4
console.log(" --- etape 4 ---");
console.table(titresTries(titres));
console.log(titres[0]);
console.log(chercheDansTitres(titres, "sql"));
console.log(chercheDansTitres(titres, "licorne"));
console.log(titreExiste(titres, " titre5sql "));
console.log(titreExiste(titres, " Un titre invent é "));

//tests étape 5
console.log(" --- etape 5 ---");
console.log(validerTitre(titres, " "));
console.log(validerTitre(titres, "       "));
console.log(validerTitre(titres, " Git "));
console.log(validerTitre(titres, " a".repeat(81)));
console.log(validerTitre(titres, "titre5SQL"));
let reponse = validerTitre(titres, " Comment lire une erreur ? ");
console.log(" [ " + reponse + " ] ");
reponse = validerTitre(titres, "abcde");
console.log(" [ " + reponse + " ] ");
reponse = validerTitre(titres, "a".repeat(80));
console.log(" [ " + reponse + " ] ");
reponse = validerTitre(titres, " abcd ");
console.log(" [ " + reponse + " ] ");

//demarrage: seulement sur la page qui contient la liste (tp7)
if (document.querySelector("#sujets") !== null) {
  afficherSujets(titres);
  //ecouteur du formulaire ici à l'étape 4
  const form = document.querySelector(".form-nouveau-sujet");
  form.addEventListener("submit", (event) => {
    //Nous laisse traiter nous les erreurs
    event.preventDefault();

    const pseudo = document.querySelector("#pseudo").value;
    const titre = document.querySelector("#titre").value;
    const message = document.querySelector("#message").value;

    // message d'erreur, "" si pas d'erreur
    const erreurPseudo = validerPseudo(pseudo);
    const erreurTitre = validerTitre(titres, titre);
    const erreurMessage = validerMessage(message);

    //Effacer les messages d'erreur
    afficherErreur("#erreur-pseudo", "");
    afficherErreur("#erreur-titre", "");
    afficherErreur("#erreur-message", "");

    //Afficher les messages d'erreur
    if (erreurPseudo !== "") {
      afficherErreur("#erreur-pseudo", erreurPseudo);
      document.querySelector("#pseudo").focus();
      return;
    }
    if (erreurTitre !== "") {
      afficherErreur("#erreur-titre", erreurTitre);
      document.querySelector("#titre").focus();
      return;
    }
    if (erreurMessage !== "") {
      afficherErreur("#erreur-message", erreurMessage);
      document.querySelector("#message").focus();
      return;
    } else {
      titres.push(titre); //ajout du nouveau titre ici
      afficherSujets(titres);
      form.reset();
      document.querySelector("#pseudo").focus();
    }
  });
}

//test
console.log("[" + validerPseudo(" ") + "]");
console.log("[" + validerPseudo(" alice ") + "]");
console.log("[" + validerMessage(" ") + "]");
console.log("[" + validerMessage("a".repeat(500)) + "]");
console.log("[" + validerMessage("a".repeat(501)) + "]");
