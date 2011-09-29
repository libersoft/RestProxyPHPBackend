Ext.define('AC.view.client.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.clientlist',

    store: 'Clients',

    title : 'Lista clienti',

    initComponent: function() {
        this.columns = [
            {header: 'Nome',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text: 'Ricarica',
                itemId: 'reload'
            }]
        }]

        this.callParent(arguments);
//        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    }
});
