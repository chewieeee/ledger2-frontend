type inputtype = "login" | "email" | "password"

class ValidationErrors {
   static required = ($field: string) => `${$field} ist ein Pflichtfeld`
   static tooShort = ($field: string, minLength: number) => `${$field} muss mindestens ${minLength} lang sein.`
   static invalidMail = () => `Die ist keine gültige Mailadresse`
}


export class InputValidation {

   private fieldName: string;
   private minLength: number;
   private type: inputtype;
   
   constructor({ fieldName, minLength, type }: { fieldName: string; minLength: number; type: inputtype }) {
      this.fieldName = fieldName
      this.minLength = minLength
      this.type = type
   }

   private errorMessages = {
      required: `${this.fieldName} ist ein Pflichtfeld`,
      tooShort: `${this.fieldName} muss mindestens ${this.minLength} lang sein `,
      email: `Die ist keine gültige Mailadresse`
   }

   private isRequired = (value: string) => !!value || ValidationErrors.required(this.fieldName)
   private checkLength = (value: string) => value.length >= this.minLength || ValidationErrors.tooShort(this.fieldName, this.minLength)
   private checkMail = (value: string) => {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || ValidationErrors.invalidMail();
   }

   private login = () => [this.isRequired, this.checkLength];
   private password = () => [this.isRequired, this.checkLength];

   public validate = () => {
      let value: ((value: string) => string | true)[] = []
      switch (this.type) {
         case "login":
            value = this.login()
            break;
         case "password":
            value = this.password()
            break;
         default:
            break;
      }
      return value

   }
}

