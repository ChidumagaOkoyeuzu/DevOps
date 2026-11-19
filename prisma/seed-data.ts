export const ALLOWED_UNITS = [
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
] as const;
type Unit = (typeof ALLOWED_UNITS)[number];

export type SeedIngredient = {
  quantity: number | null; // null for things like "salt, to taste"
  unit: Unit | null; // null for counted things, e.g. 2 onions
  name: string;
};

export type SeedRecipe = {
  title: string;
  description: string;
  tribe: string; // a tribe slug from SEED_TRIBES
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  photo: string; // file name in public/images/recipes
  ingredients: SeedIngredient[];
  steps: string[];
};

// Short helper so each ingredient fits on one line
const i = (
  quantity: number | null,
  unit: Unit | null,
  name: string,
): SeedIngredient => ({ quantity, unit, name });

export const SEED_TRIBES = [
  {
    slug: "yoruba",
    name: "Yoruba",
    description:
      "From the south west of Nigeria. Known for rich pepper stews, jollof and leafy soups like efo riro.",
  },
  {
    slug: "igbo",
    name: "Igbo",
    description:
      "From the south east. Home of hearty soups thickened with cocoyam, and street favourites like abacha.",
  },
  {
    slug: "hausa",
    name: "Hausa",
    description:
      "From the north. Famous for suya, grilled meat with spicy yaji, and rice dishes like masa.",
  },
  {
    slug: "efik-ibibio",
    name: "Efik & Ibibio",
    description:
      "From the south south, around Calabar and Uyo. Known for soups packed with leaves, seafood and palm oil.",
  },
];

// The account that owns the starter recipes. It has no password, so nobody can log in as it.
export const SEED_AUTHOR = {
  id: "seed-naija-kitchen",
  name: "Naija Kitchen",
  email: "team@naijakitchen.example",
};

export const SEED_RECIPES: SeedRecipe[] = [
  {
    title: "Party jollof rice",
    description:
      "Smoky, tomatoey rice cooked in a rich pepper base, the way it's served at every Nigerian party.",
    tribe: "yoruba",
    prepMinutes: 20,
    cookMinutes: 60,
    servings: 6,
    photo: "party-jollof-rice.jpg",
    ingredients: [
      i(500, "g", "long grain parboiled rice, rinsed"),
      i(4, null, "plum tomatoes"),
      i(2, null, "red bell peppers"),
      i(1, null, "scotch bonnet pepper"),
      i(2, null, "onions"),
      i(3, "tbsp", "tomato paste"),
      i(80, "ml", "vegetable oil"),
      i(750, "ml", "chicken stock"),
      i(2, "tsp", "curry powder"),
      i(1, "tsp", "dried thyme"),
      i(2, null, "bay leaves"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Blend the tomatoes, bell peppers, scotch bonnet and one onion until smooth.",
      "Slice the other onion and fry it in the oil for 3 minutes. Add the tomato paste and fry for 5 minutes, stirring.",
      "Pour in the blended peppers and cook for 20 to 25 minutes, until thick and the oil rises to the top.",
      "Stir in the stock, curry powder, thyme, bay leaves and salt, then add the rice.",
      "Cover with foil and a lid and cook on low heat for 30 to 35 minutes, stirring once, until the rice is soft.",
      "Turn off the heat, fluff with a fork and leave covered for 5 minutes before serving.",
    ],
  },
  // YORUBA RECIPE 2: Efo Riro
  {
    title: "Efo Riro",
    description:
      "A rich Yoruba spinach stew cooked with peppers, palm oil and assorted seasonings.",
    tribe: "yoruba",
    prepMinutes: 20,
    cookMinutes: 35,
    servings: 4,
    photo: "efo-riro.jpg",
    ingredients: [
      i(500, "g", "fresh spinach or ugu leaves"),
      i(300, "g", "assorted meat"),
      i(100, "g", "smoked fish"),
      i(4, null, "plum tomatoes"),
      i(2, null, "red bell peppers"),
      i(1, null, "scotch bonnet pepper"),
      i(1, null, "onion"),
      i(100, "ml", "palm oil"),
      i(2, "tbsp", "ground crayfish"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Wash and slice the vegetables.",
      "Boil the assorted meat until tender.",
      "Blend the tomatoes, peppers and onion.",
      "Heat the palm oil and cook the blended pepper mixture.",
      "Add the meat, smoked fish and crayfish.",
      "Stir in the vegetables and cook until tender.",
    ],
  },

  // IGBO RECIPE 1: Abacha
  {
    title: "Abacha",
    description:
      "A traditional Igbo African salad made with cassava, palm oil and crunchy vegetables.",
    tribe: "igbo",
    prepMinutes: 25,
    cookMinutes: 10,
    servings: 4,
    photo: "abacha.jpg",
    ingredients: [
      i(300, "g", "dried abacha, cassava flakes"),
      i(100, "g", "ugba"),
      i(100, "ml", "palm oil"),
      i(1, null, "onion"),
      i(2, null, "garden eggs"),
      i(2, "tbsp", "ground crayfish"),
      i(1, "tsp", "ground potash dissolved in water"),
      i(1, "tsp", "ground pepper"),
      i(100, "g", "cooked stockfish"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Soak the dried abacha in warm water until soft.",
      "Drain the cassava flakes thoroughly.",
      "Mix the palm oil with the dissolved potash water.",
      "Add the crayfish, pepper and seasoning.",
      "Stir in the abacha, ugba and cooked stockfish.",
      "Slice the onion and garden eggs and serve with the salad.",
    ],
  },

  // IGBO RECIPE 2: Asaro
  {
    title: "Asaro (Yam Porridge)",
    description:
      "A comforting yam porridge cooked with palm oil, peppers and traditional Nigerian seasonings.",
    tribe: "igbo",
    prepMinutes: 15,
    cookMinutes: 35,
    servings: 4,
    photo: "asaro.jpg",
    ingredients: [
      i(800, "g", "yam, peeled and cubed"),
      i(2, null, "plum tomatoes"),
      i(1, null, "red bell pepper"),
      i(1, null, "scotch bonnet pepper"),
      i(1, null, "onion"),
      i(60, "ml", "palm oil"),
      i(500, "ml", "water or stock"),
      i(1, "tbsp", "ground crayfish"),
      i(100, "g", "spinach"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Peel and cut the yam into medium-sized cubes.",
      "Blend the tomatoes, bell pepper, scotch bonnet and onion.",
      "Place the yam in a pot and add the blended pepper mixture.",
      "Pour in the water or stock and cook until the yam softens.",
      "Add palm oil, crayfish and salt, then stir gently.",
      "Mash a few yam pieces to thicken the porridge and stir in the spinach.",
    ],
  },

  // HAUSA RECIPE 1: Suya
  {
    title: "Suya",
    description:
      "Spicy Nigerian grilled beef coated in a traditional peanut-based yaji seasoning.",
    tribe: "hausa",
    prepMinutes: 25,
    cookMinutes: 20,
    servings: 4,
    photo: "suya.jpg",
    ingredients: [
      i(600, "g", "beef, thinly sliced"),
      i(100, "g", "ground roasted peanuts"),
      i(2, "tsp", "ground ginger"),
      i(2, "tsp", "paprika"),
      i(1, "tsp", "ground cayenne pepper"),
      i(1, "tsp", "garlic powder"),
      i(2, "tbsp", "vegetable oil"),
      i(1, null, "onion"),
      i(2, null, "tomatoes"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Slice the beef into thin strips.",
      "Mix the ground peanuts with the spices and salt.",
      "Coat the beef with oil and the spice mixture.",
      "Thread the beef onto skewers.",
      "Grill the meat, turning regularly until cooked through.",
      "Slice the onion and tomatoes and serve alongside the suya.",
    ],
  },

  // HAUSA RECIPE 2: Chin Chin
  {
    title: "Chin Chin",
    description:
      "Crunchy Nigerian fried pastry snacks made with flour, milk, butter and a hint of nutmeg.",
    tribe: "hausa",
    prepMinutes: 20,
    cookMinutes: 20,
    servings: 8,
    photo: "chin-chin.jpg",
    ingredients: [
      i(500, "g", "plain flour"),
      i(100, "g", "sugar"),
      i(100, "g", "butter"),
      i(100, "ml", "milk"),
      i(1, null, "egg"),
      i(1, "tsp", "baking powder"),
      i(1, "tsp", "ground nutmeg"),
      i(1, "tsp", "salt"),
      i(500, "ml", "vegetable oil for frying"),
    ],
    steps: [
      "Mix the flour, sugar, baking powder, nutmeg and salt.",
      "Rub the butter into the dry ingredients until crumbly.",
      "Add the egg and milk, then mix into a firm dough.",
      "Roll out the dough and cut it into small cubes.",
      "Heat the vegetable oil and fry the pieces in batches until golden.",
      "Drain the chin chin and allow it to cool before serving.",
    ],
  },

  // EFIK & IBIBIO RECIPE 1: Peppered Turkey
  {
    title: "Peppered Turkey",
    description:
      "Tender turkey pieces coated in a spicy Nigerian pepper sauce.",
    tribe: "efik-ibibio",
    prepMinutes: 20,
    cookMinutes: 45,
    servings: 4,
    photo: "peppered-turkey.jpg",
    ingredients: [
      i(800, "g", "turkey pieces"),
      i(3, null, "plum tomatoes"),
      i(2, null, "red bell peppers"),
      i(2, null, "scotch bonnet peppers"),
      i(1, null, "onion"),
      i(80, "ml", "vegetable oil"),
      i(2, "tsp", "curry powder"),
      i(1, "tsp", "dried thyme"),
      i(2, "tbsp", "ground crayfish"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Wash the turkey pieces and season them with salt, curry and thyme.",
      "Boil the turkey until tender, reserving some of the stock.",
      "Blend the tomatoes, bell peppers, scotch bonnets and onion.",
      "Heat the oil and cook the blended pepper mixture until thick.",
      "Add the turkey pieces, crayfish and a little reserved stock.",
      "Stir and simmer until the turkey is coated in the pepper sauce.",
    ],
  },

  // EFIK & IBIBIO RECIPE 2: Moi Moi
  {
    title: "Moi Moi",
    description:
      "A savoury steamed bean pudding blended with peppers, onions and seasoning.",
    tribe: "efik-ibibio",
    prepMinutes: 30,
    cookMinutes: 50,
    servings: 6,
    photo: "moi-moi.jpg",
    ingredients: [
      i(500, "g", "peeled black-eyed beans"),
      i(1, null, "red bell pepper"),
      i(1, null, "scotch bonnet pepper"),
      i(1, null, "onion"),
      i(100, "ml", "vegetable oil"),
      i(2, "tbsp", "ground crayfish"),
      i(1, "tsp", "ground nutmeg"),
      i(2, null, "boiled eggs"),
      i(500, "ml", "water"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Rinse the peeled beans and soak briefly if needed.",
      "Blend the beans with the peppers, onion and water until smooth.",
      "Stir in the vegetable oil, crayfish, nutmeg and salt.",
      "Slice the boiled eggs and place portions into the cooking containers.",
      "Pour the bean mixture into the containers and cover securely.",
      "Steam until the moi moi is firm and cooked through.",
    ],
  },
  // HAUSA RECIPE: Puff Puff
  {
    title: "Puff Puff",
    description:
      "Soft, fluffy Nigerian fried dough balls with a lightly sweet flavour.",
    tribe: "hausa",
    prepMinutes: 20,
    cookMinutes: 20,
    servings: 6,
    photo: "puff-puff.jpg",
    ingredients: [
      i(500, "g", "plain flour"),
      i(100, "g", "sugar"),
      i(7, "g", "dried yeast"),
      i(400, "ml", "warm water"),
      i(1, "tsp", "salt"),
      i(1, "tsp", "ground nutmeg"),
      i(500, "ml", "vegetable oil for frying"),
    ],
    steps: [
      "Mix the flour, sugar, yeast, salt and nutmeg in a bowl.",
      "Gradually add the warm water and mix into a smooth batter.",
      "Cover the batter and leave it in a warm place to rise.",
      "Heat the vegetable oil in a deep pot.",
      "Scoop small portions of batter into the hot oil and fry until golden.",
      "Drain the puff puff on kitchen paper and allow it to cool slightly.",
    ],
  },
  // YORUBA RECIPE: Egusi Soup
  {
    title: "Egusi Soup",
    description:
      "A rich Nigerian melon seed soup cooked with leafy vegetables, palm oil, meat and traditional spices.",
    tribe: "yoruba",
    prepMinutes: 25,
    cookMinutes: 45,
    servings: 6,
    photo: "egusi-soup.jpg",
    ingredients: [
      i(250, "g", "ground egusi"),
      i(400, "g", "assorted meat"),
      i(150, "g", "stockfish"),
      i(100, "g", "smoked fish"),
      i(200, "g", "spinach or ugu leaves"),
      i(100, "ml", "palm oil"),
      i(2, null, "plum tomatoes"),
      i(1, null, "red bell pepper"),
      i(1, "tbsp", "ground crayfish"),
      i(null, null, "salt, to taste"),
    ],
    steps: [
      "Wash and boil the assorted meat and stockfish until tender.",
      "Blend the tomatoes and red bell pepper.",
      "Mix the ground egusi with a little water to form a thick paste.",
      "Heat the palm oil and cook the blended pepper mixture.",
      "Add the egusi paste, meat, smoked fish and crayfish, then simmer.",
      "Stir in the vegetables and cook until tender before serving.",
    ],
  },
];
