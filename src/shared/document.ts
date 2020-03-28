interface Doc {
   id: number;
   name: string;
   iban: string;
   amount: number;
   description: string;
   date: Date;
   category: string;

   // constructor(data: any){
   //    this.id = data.id
   //    this.name = data.name
   //    this.shortName = (data.name.length > 22) ? `${data.name.substring(0,22)}...` : data.name
   //    this.iban = data.iban
   //    this.amount = data.amount
   //    this.description = data.description
   //    this.date = data.date
   //    this.category = data.category
   // }
}

const numberFormat = {
   style: "currency",
   currency: "EUR",
   minimumFractionDigits: 2,
   currencyDisplay: "code"
}


export { Doc, numberFormat }