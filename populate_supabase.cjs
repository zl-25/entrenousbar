const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://easvfscfzxpbbwviiqia.supabase.co';
const supabaseAnonKey = 'sb_publishable_GY4GFDu64piq8aJYNdpBjA_9PpMKL5l';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EVENTS = [
  {
    title: "JOSHUA COOKER",
    type: "SHOWCASE • AFRO",
    day: "TBA",
    month: "BIENTÔT",
    year: "2024",
    date: "2024-12-31",
    time: "20H00",
    endTime: "04H00",
    price: "5 000 FCFA",
    neonClass: "neon-text-green",
    image: "/1000397501.png",
    cardImage: "/1000397501.png",
    description: [
      "Préparez-vous pour l'événement de l'année ! Joshua Cooker arrive bientôt à l'Entre Nous Bar.",
      "Une soirée exceptionnelle en préparation avec l'un des artistes les plus attendus de la scène. Restez connectés pour la date officielle, les places s'annoncent limitées !"
    ],
    artists: [
      { name: "Joshua Cooker", style: "Afro / Showcase", image: "/1000397501.png" }
    ],
    tickets: [
      { id: "standard", name: "Ticket Standard", price: "5000 FCFA", priceNum: 5000, description: "Accès général à l'événement" }
    ]
  },
  {
    title: "FINALE CHAMPION LEAGUE",
    type: "PROJECTION • SHOWCASE",
    day: "30",
    month: "MAI",
    year: "2026",
    date: "2026-05-30",
    time: "13H00",
    endTime: "22H00",
    price: "SUR PLACE",
    neonClass: "neon-text-yellow",
    image: "/1000397584.png",
    cardImage: "/1000397584.png",
    description: [
      "Vivez la finale de la Champions League comme si vous y étiez ! Écrans géants, ambiance de stade et show exclusif.",
      "MKB et Massy Le Mbite seront en prestation live pour faire monter la température avant, pendant et après le match."
    ],
    artists: [
      { name: "MKB", style: "Live Performance", image: "/1000397584.png" },
      { name: "Massy Le Mbite", style: "Live Performance", image: "/1000397584.png" }
    ],
    tickets: []
  },
  {
    title: "CONCERT CRÉOL LA DIVA",
    type: "CONCERT • SHOWCASE",
    day: "17",
    month: "AOÛT",
    year: "2025",
    date: "2025-08-17",
    time: "20H00",
    endTime: "04H00",
    price: "5 000 FCFA",
    neonClass: "neon-text-purple",
    image: "/1000397585.png",
    cardImage: "/1000397585.png",
    description: [
      "La seule et unique DIVA débarque à l'Entre Nous Bar ! Un concert exclusif de Créol pour une soirée explosive.",
      "Prévente à 3.500 FCFA. Sur place le jour J à 5.000 FCFA. Animation assurée par Mr Wils, avec aux platines DJ Khaled, DJ Dann & DJ Kelch."
    ],
    artists: [
      { name: "Créol", style: "La Diva", image: "/1000397585.png" },
      { name: "Mr Wils", style: "Animation", image: "/1000397585.png" }
    ],
    tickets: [
      { id: "presale", name: "Prévente", price: "3500 FCFA", priceNum: 3500, description: "Accès prévente en ligne" },
      { id: "standard", name: "Sur Place", price: "5000 FCFA", priceNum: 5000, description: "Achat sur place le jour J" }
    ]
  },
  {
    title: "KÔBA BUILDING : LE RETOUR DU KING",
    type: "CONCERT • HIP HOP",
    day: "25",
    month: "OCT.",
    year: "2025",
    date: "2025-10-25",
    time: "20H00",
    endTime: "04H00",
    price: "SUR PLACE",
    neonClass: "neon-text-yellow",
    image: "/1000397586.png",
    cardImage: "/1000397586.png",
    description: [
      "Le grand retour tant attendu ! Kôba Building, le King, reprend le contrôle de la scène à l'Entre Nous Bar.",
      "Une soirée Hip Hop légende que vous ne voulez absolument pas rater. Marquez vos calendriers pour Octobre 2025."
    ],
    artists: [
      { name: "Kôba Building", style: "Rap / Hip Hop", image: "/1000397586.png" }
    ],
    tickets: []
  },
  {
    title: "HAPPY D'EFOULAN & DEMENTOS",
    type: "SHOWCASE • LIVE",
    day: "22",
    month: "NOV.",
    year: "2025",
    date: "2025-11-22",
    time: "14H30",
    endTime: "22H00",
    price: "5 000 FCFA",
    neonClass: "neon-text-green",
    image: "/1000397611.png",
    cardImage: "/1000397611.png",
    description: [
      "L'événement 'Oh Tchapdeu Tchapdeu' ! Happy D'Efoulan, Dementos, MKB et Niapo enflamment l'Entre Nous Bar.",
      "Début des hostilités dès 14h30. Prévente à 3.000 FCFA, sur place à 5.000 FCFA."
    ],
    artists: [
      { name: "Happy D'Efoulan", style: "Showcase", image: "/1000397611.png" },
      { name: "Dementos", style: "Showcase", image: "/1000397611.png" }
    ],
    tickets: [
      { id: "presale", name: "Prévente", price: "3000 FCFA", priceNum: 3000, description: "Accès prévente" },
      { id: "standard", name: "Sur Place", price: "5000 FCFA", priceNum: 5000, description: "Accès standard" }
    ]
  },
  {
    title: "LE VOUGA DES DJ'S",
    type: "CLUBBING • DJ SET",
    day: "05",
    month: "AVRIL",
    year: "2025",
    date: "2025-04-05",
    time: "13H00",
    endTime: "22H00",
    price: "SUR PLACE",
    neonClass: "neon-text-orange",
    image: "/1000397632.png",
    cardImage: "/1000397632.png",
    description: [
      "Le Vouga des DJ's ! Une après-midi et soirée animées par les meilleurs platinistes de la ville.",
      "Guests spéciaux : DJ Marley & Darcy Bonbon. Spécial Mix by DJ Khaled & DJ Kelch. De 13h à 22h, ambiance garantie."
    ],
    artists: [
      { name: "DJ Marley", style: "Guest DJ", image: "/1000397632.png" },
      { name: "Darcy Bonbon", style: "Guest", image: "/1000397632.png" }
    ],
    tickets: []
  },
  {
    title: "NZ BENK'S",
    type: "SHOWCASE",
    day: "01",
    month: "MAI",
    year: "2025",
    date: "2025-05-01",
    time: "13H00",
    endTime: "22H00",
    price: "ENTRÉE GRATUITE",
    neonClass: "neon-text-pink",
    image: "/1000397694.png",
    cardImage: "/1000397694.png",
    description: [
      "Le phénomène Nz Benk's à l'Entre Nous Bar ! Venez profiter de cette journée spéciale avec ENTRÉE GRATUITE.",
      "Mix by DJ Khaled et DJ Kelch. On vous attend de 13h à 22h pour retourner le bar."
    ],
    artists: [
      { name: "Nz Benk's", style: "Showcase", image: "/1000397694.png" }
    ],
    tickets: []
  },
  {
    title: "RAP NTCHAM CHACUN SON GAZ",
    type: "RAP • HIP HOP",
    day: "31",
    month: "OCT.",
    year: "2025",
    date: "2025-10-31",
    time: "14H00",
    endTime: "22H00",
    price: "5 000 FCFA",
    neonClass: "neon-text-yellow",
    image: "/1000397695.png",
    cardImage: "/1000397695.png",
    description: [
      "L'événement Rap de l'année ! Chacun son gaz avec un line-up de malade : Koba Building, Eboloko, Dementos, Fetty Ndoss, Panawaraboy, Le Niapo, MKB.",
      "Prévente (2 places) à 5.000 FCFA. Jour J (1 place) à 5.000 FCFA."
    ],
    artists: [
      { name: "Eboloko", style: "Rap Ntchab", image: "/1000397695.png" },
      { name: "Fetty Ndoss", style: "Rap Ntchab", image: "/1000397695.png" }
    ],
    tickets: [
      { id: "duo", name: "Prévente Duo (2 places)", price: "5000 FCFA", priceNum: 5000, description: "Valable pour 2 personnes" },
      { id: "solo", name: "Ticket Jour J (1 place)", price: "5000 FCFA", priceNum: 5000, description: "Valable pour 1 personne" }
    ]
  },
  {
    title: "CONCERT L'OISEAU RARE",
    type: "CONCERT",
    day: "27",
    month: "JUIL.",
    year: "2025",
    date: "2025-07-27",
    time: "13H00",
    endTime: "00H00",
    price: "10 000 FCFA",
    neonClass: "neon-text-purple",
    image: "/1000397697.png",
    cardImage: "/1000397697.png",
    description: [
      "Concert événement de L'OISEAU RARE ! Boostez vos sensations.",
      "Prévente à 5.000 FCFA, Jour J à 10.000 FCFA. Dès 13h, animation par Mr Wils, Mix par DJ Khaled, DJ Dann & DJ Kelch."
    ],
    artists: [
      { name: "L'Oiseau Rare", style: "Concert Live", image: "/1000397697.png" }
    ],
    tickets: [
      { id: "presale", name: "Prévente", price: "5000 FCFA", priceNum: 5000, description: "Accès prévente" },
      { id: "standard", name: "Ticket Jour J", price: "10000 FCFA", priceNum: 10000, description: "Accès standard" }
    ]
  },
  {
    title: "ENTRE NOUS BAC ACTE 2",
    type: "FESTIVAL • SHOWCASE",
    day: "19",
    month: "JUIL.",
    year: "2025",
    date: "2025-07-19",
    time: "17H00",
    endTime: "04H00",
    price: "2 500 FCFA",
    neonClass: "neon-text-orange",
    image: "/1000397698.png",
    cardImage: "/1000397698.png",
    description: [
      "L'Acte 2 d'Entre Nous Bac est là ! Un line-up exceptionnel avec Mr King, Waza No Limite, Feeligram, Yitou, Dan Wilson, Le Niapo, Loysz, David Le Roi Winner, et D12 Le Polyvalent.",
      "Entrée à 2.500 FCFA. Tickets physiques à 3.500 FCFA le Jour J. Ne manquez pas cette célébration massive !"
    ],
    artists: [
      { name: "Mr King", style: "Showcase", image: "/1000397698.png" },
      { name: "Waza No Limite", style: "Showcase", image: "/1000397698.png" }
    ],
    tickets: [
      { id: "presale", name: "Prévente en ligne", price: "2500 FCFA", priceNum: 2500, description: "Tarif réduit" },
      { id: "standard", name: "Tarif Jour J", price: "3500 FCFA", priceNum: 3500, description: "Tarif normal" }
    ]
  }
];

async function populate() {
  console.log("Début de l'insertion des événements...");

  // Formater les données pour correspondre à notre table 'events'
  const eventData = EVENTS.map(e => ({
    title: e.title,
    type: e.type,
    day: e.day,
    month: e.month,
    year: e.year,
    date: e.date,
    time: e.time,
    endTime: e.endTime,
    price: e.price,
    image: e.image,
    cardImage: e.cardImage,
    description: JSON.stringify(e.description),
    artists: JSON.stringify(e.artists),
    neonClass: e.neonClass,
    tickets: JSON.stringify(e.tickets),
    status: 'active'
  }));

  try {
    // Vérifier si des événements existent déjà pour ne pas dupliquer
    const { data: existingEvents, error: fetchError } = await supabase
      .from('events')
      .select('id')
      .limit(1);

    if (fetchError) {
      throw fetchError;
    }

    if (existingEvents && existingEvents.length > 0) {
      console.log("Des événements existent déjà dans la base. Suppression des anciens événements...");
      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .neq('id', 0); // Supprime tout
      
      if (deleteError) throw deleteError;
    }

    // Insérer les événements
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select();

    if (error) {
      throw error;
    }

    console.log(`Succès ! ${data.length} événements insérés dans Supabase.`);
  } catch (err) {
    console.error("Erreur d'insertion dans Supabase :", err);
  }
}

populate();
