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