Ext.define('AC.model.Client', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        url: 'data.php/contact',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id',
            messageProperty: 'message'
        },
        simpleSortMode: true
    }
});
