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
