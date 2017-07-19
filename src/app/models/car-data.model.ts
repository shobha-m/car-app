/**
 * Car entity, used for filtering as well.
 */
export class CarData {
/**
 * @type {string} color The color of the car.
 */
color: String;
  /**
   * @type {string} type The type of the car.
   */
  type: String;
  /**
   * @type {number} yearOfConstruction The year of the car Constructed.
   */
   yearOfConstruction :number;
   /**
   * @type {number} price The price of the car .
   */
  price: number;
  /**
   * @type {string} notes The notes for the car .
   */
  notes: string;

}

export interface CarData{
  color: String;
  type: String;
  yearOfConstruction :number;
  price: number;
  notes: string;
}