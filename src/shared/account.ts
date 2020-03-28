class Account {
   
   public accountId: number;
   public title: string;
   public iban: string;
   
   constructor(data: {id: number; title: string; iban: string}) {
      this.accountId = data.id 
      this.title = data.title
      this.iban =  data.iban
   }
}

class AccountDetails extends Account {
   
   public balance: number;

   constructor(data: {id: number; title: string; iban: string; balance: number}) {
      super(data)
      this.balance = data.balance
   }
}

export { Account, AccountDetails }