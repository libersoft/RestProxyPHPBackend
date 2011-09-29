Ext.define('AC.view.client.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.clientedit',

    title : 'Modifica cliente',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Nome'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Salva',
                action: 'save'
            },
            {
                text: 'Annulla',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});
