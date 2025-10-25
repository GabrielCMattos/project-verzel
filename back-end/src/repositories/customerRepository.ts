import Customer from "../models/customer";


//Exemplo sem banco
const customers: Customer[] = [];

async function getCustomer(id: number) : Promise<Customer | undefined>  {
    return new Promise((resolve, reject) => {
        return resolve(customers.find(c => c.id === id));
    })
}