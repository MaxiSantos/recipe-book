import { Ingredient } from '../shared/ingredient'
export class Recipe {
  constructor(
    public name: string,
    public shortDescription: string,
    public longDescription: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public rating: number
  ){}
}

export class FavouriteRecipe extends Recipe{
  //constructor(name: string) { super(name); }
  constructor(name,
    shortDescription,
    longDescription,
    imagePath,
    ingredients,
    rating,
    public position: number){
    super(
      name,
      shortDescription,
      longDescription,
      imagePath,
      ingredients,
      rating
    )
  }
}