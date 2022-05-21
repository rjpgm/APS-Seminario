//target (our payment object interface)
interface IPayment {
    id: string;
    total: number;
    SubmitPayment: Function;
}
//our payment class
class Payment implements IPayment {
    public id: string;
    public total: number;
    constructor(id: string, total: number){
        this.id = id;
        this.total = total;
    }
    public SubmitPayment() {
        console.log(`Proprietary Payment Amount: ${this.total} - ID: ${this.id}`);
    }
}
//adaptee (3rd party lib)
interface IThirdPartyPayment {
    id: number; //abstract away the type in the adapter
    amount: number; //abstract away the field name in the adapter
    SendPayment: Function; //abstract away in the adapter
}
class ThirdPartyPayment implements IThirdPartyPayment {
    public id: number; 
    public amount: number; 
    constructor(id: number, amount: number){
        this.id = id;
        this.amount = amount;
    }
    public SendPayment() {
        console.log(`3rd Party Payment Amount: ${this.amount} - ID: ${this.id}`);
    }
}
enum PaymentType {
    ThirdParty,
    Proprietary
}
//adapter
class PaymentAdapter implements IPayment {
    public id: string; 
    public total: number;
    public type: PaymentType;
    constructor(id: string, total: number, type: PaymentType) {
        this.type = type;
        this.id = id;
        this.total = total;
    }
    public SubmitPayment() {
        if (this.type === PaymentType.ThirdParty) {
            const amount = this.total;
            const id = parseInt(this.id);
            const payment = new ThirdPartyPayment(id, amount);
            payment.SendPayment();
        } else if (this.type === PaymentType.Proprietary) {
            const id = this.id.toString();
            const payment = new Payment(id, this.total);
            payment.SubmitPayment();
        } else {
            throw new Error("Invalid Payment Type");
        }
    }
}
//client

const payment:IPayment = new PaymentAdapter("123", 47.99, PaymentType.Proprietary);
payment.SubmitPayment();

const payment2:IPayment = new PaymentAdapter("543", 99.99, PaymentType.ThirdParty);
payment2.SubmitPayment();