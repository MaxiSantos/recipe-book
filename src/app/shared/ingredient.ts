import { MyTypes } from '../shared'
export class Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public type: MyTypes,
    public measurementUnit: string = 'unit'
    ){}
}