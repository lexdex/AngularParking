
export class SpotStatistic{
    id: number;
    numberOfHours: number;
    numberOfEvents: number;

    

   public getNumberOfHours(): number{
    return  this.numberOfHours;
   }

   public getNumberOfEvent(): number{
    return  this.numberOfEvents;
   }

}