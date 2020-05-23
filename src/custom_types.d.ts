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
   budget?: number;
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

declare interface Budget {
   id: number;
   title: string;
   type: BudgetType;
   period: BudgetPeriod;
   amount: number;
   validFrom: Date;
   validTo: Date;
}


declare interface User {
   id: number;
   user: string;
}

declare interface UserBankaccountRel {
   id: number;
   user: number;
   account: number;
}

type BudgetType = "Anparen" | "Ausgaben"
type BudgetPeriod = "Monat" | "Jahr" | "ohne Zeitraum"


declare interface FintsLogin {
   id: number;
   title: string;
   fintsUrl: string;
   login: string;
   pin: string;
   blz: number | null;
   validFrom?: string;
   validTo?: string;
}