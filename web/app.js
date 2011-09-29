Ext.application({
    name: 'AC',

    appFolder: 'app',

    controllers: ['Clients'],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'clientlist'
            }
        });
    }
});
