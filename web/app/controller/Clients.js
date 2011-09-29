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
            },
            'clientlist toolbar #reload': {
                click: this.reload
            }
        });
    },

    editClient: function(grid, record) {
        var view = Ext.widget('clientedit');

        view.down('form').loadRecord(record);
    },

    updateClient: function(button) {
        var win    = button.up('window'),
            form   = win.down('form').getForm(),
            record = form.getRecord(),
            values = form.getValues(),
            store  = this.getStore('Clients');

        if (form.isValid()) {
            record.set(values);
            record.save({
                success: function(data) {
                    record.commit();
                    win.close();
                },
                failure: function(data) {
                    Ext.Msg.alert('Failure', 'Failed to save object.')
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
        }
    },

    addClient: function(button) {
        var view = Ext.widget('clientedit');

        view.down('form').loadRecord(Ext.create('AC.model.Client'));
    },

    deleteClient: function(button) {
        var view      = Ext.ComponentQuery.query('clientlist')[0],
            selection = view.getSelectionModel().getSelection()[0],
            store     = this.getStore('Clients');

        if (selection) {
            selection.destroy({
                success: function(data) {
                    store.remove(selection);
                },
                failure: function(data) {
                    Ext.Msg.alert('Failure', 'Failed to delete object.')
                }
            });
        }
    },

    reload: function(button) {
        this.getStore('Clients').load();
    }
});
