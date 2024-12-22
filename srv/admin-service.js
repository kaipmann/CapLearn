// Export a function with service parameter that has the event handler 
const cds = require('@sap/cds');
module.exports = (srv) => {
    const { Authors } = cds.entities('myProject');
    // Register before event handler for CREATE and UPDATE operations on Authors
    srv.before(['CREATE', 'UPDATE'], 'Authors', validateLifeData);
    // Define the validateLifeData function
    function validateLifeData(req) {
        const { dateOfBirth, dateOfDeath } = req.data;
        if (!dateOfBirth || !dateOfDeath) {
            return;
        }
        const birth = new Date(dateOfBirth);
        const dead = new Date(dateOfDeath);
        if (dead < birth) {
            req.error(`The date of death (${dateOfDeath}) is before the date of birth (${dateOfBirth}).`);
        }
    }
};