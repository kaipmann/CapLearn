const cds = require('@sap/cds');
module.exports = (srv) => {
    const { Books } = cds.entities('myProject');
    // Register after event handler for READ operation on Books
    srv.after('READ', 'Books', grantDiscount);
	
    // Register on event handler for submitOrder action
    srv.on('submitOrder', reduceStock);

    // Define the grantDiscount function
    function grantDiscount(results) {
        for (let b of results) {
            if (b.stock > 200) {
                b.title += ' -- 11% Discount!';
            }
        }
    }


    // Define the reduceStock function
    async function reduceStock(req) {
        const { Books } = srv.entities;
        const { book, quantity } = req.data;
        if (quantity < 1) {
            return req.error('The quantity must be at least 1.');
        }
        const b = await SELECT.one.from(Books).where({ ID: book }).columns(b => { b.stock });
        if (!b) {
            return req.error(`Book with ID ${book} does not exist.`);
        }
        let { stock } = b;
        if (quantity > stock) {
            return req.error(`${quantity} exceeds stock ${stock} for book with ID ${book}.`);
        }
        await UPDATE(Books).where({ ID: book }).with({ stock: { '-=': quantity } });
        return { stock: stock - quantity };
    }

};
