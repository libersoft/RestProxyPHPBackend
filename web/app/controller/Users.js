/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: ['Users'],

    models: ['User'],

    views: ['user.Edit', 'user.List'],

    refs: [
        {
            ref: 'usersPanel',
            selector: 'panel'
        },
        {
            ref: 'list',
            selector: 'grid'
        }
    ],

    init: function() {
        this.control({
            'viewport > userlist dataview': {
                itemdblclick: this.editUser
            },
            'viewport > userlist button[action=add]': {
                click: this.newUser
            },
            'viewport > userlist button[action=delete]': {
                click: this.deleteUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var edit = Ext.create('AM.view.user.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getUsersStore().sync();
    },

    newUser: function(button) {
        var edit = Ext.create('AM.view.user.Edit').show(),

            record = Ext.create('AM.model.User');

        this.getUsersStore().insert(0, record);
        edit.down('form').loadRecord(record);
    },

    deleteUser: function(button) {
        var selection = this.getList().getSelectionModel().getSelection(),
            store     = this.getUsersStore();

        store.remove(selection);
        store.sync();
    }
});

