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
            xtype: 'pagingtoolbar',
            store: this.store,
            dock: 'bottom',
            displayInfo: true
        }];

        this.callParent(arguments);
    }
});
