declare interface BankAccount{
   id: number;
   title: string;
   iban: string;
   balance?: string;
}

declare interface Category {
   id: number;
   title: string;
   account: number;
}

declare interface Doc {
   id: number;
   name: string;
   iban: string;
   amount: number;
   description: string;
   date: Date;
   category: string;
}