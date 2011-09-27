Ext.define('AC.controller.Clients', {
    extend: 'Ext.app.Controller',

    stores: ['Clients'],
    models: ['Client'],
    views: [
        'client.List',
        'client.Edit'
    ],

    init: function() {
        this.control({
            'viewport > clientlist': {
                itemdblclick: this.editClient
            },
            'clientedit button[action=save]': {
                click: this.updateClient
            }
        });
    },

    editClient: function(grid, record) {
        var view = Ext.widget('clientedit');

        view.down('form').loadRecord(record);
    },

    updateClient: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getClientsStore().sync();
    }
});
