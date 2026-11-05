/* const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    alert('Bonjour depuis JavaScript !');
}); */

console.log("app.js chargé"); //fonctionne dans les 4 pages

//longueur limite des titres
const LONGUEUR_MIN = 5;
const LONGUEUR_MAX = 80;

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
    if (titres[i].trim().toUpperCase().includes(saisie)) {
      exist = true;
      break;
    }
  }
  return exist;
}

//verificaction
console.log(" --- etape 4 ---");
console.table(titresTries(titres));
console.log(titres[0]);
console.log(chercheDansTitres(titres, "sql"));
console.log(chercheDansTitres(titres, "licorne"));
console.log(titreExiste(titres, " titre5sql "));
console.log(titreExiste(titres, " Un titre invent é "));

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
    return "Le titre doit faire au moins " + LONGUEUR_MAX + " caractères.";
  }
  if (titreExiste(titres, titre)) {
    return "Ce sujet existe déjà.";
  }
  return "";
}
//verification
console.log(" --- etape 5 ---");
console.log(validerTitre(titres, " "));
console.log(validerTitre(titres, "       "));
console.log(validerTitre(titres, " Git "));
console.log(validerTitre(titres, " a ".repeat(81)));
console.log(validerTitre(titres, "titre5SQL"));
let reponse = validerTitre(titres, " Comment lire une erreur ? ");
console.log(" [ " + reponse + " ] ");
reponse = validerTitre(titres, "abcde");
console.log(" [ " + reponse + " ] ");
reponse = validerTitre(titres, "a".repeat(80));
console.log(" [ " + reponse + " ] ");
reponse = validerTitre(titres, " abcd ");
console.log(" [ " + reponse + " ] ");
//Tout marche
