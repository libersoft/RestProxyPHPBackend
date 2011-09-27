Ext.define('AC.store.Clients', {
    extend: 'Ext.data.Store',
    model: 'AC.model.Client',
    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'data.php/clients',
        reader: {
            type: 'json',
            root: 'clients',
            successProperty: 'success'
        }
    }
});
