define(function (require) {
    var DialogFactory = require('ui/DialogFactory');
    var lib = require('ui/lib');
    var alertDialog, confirmDialog;
    var onConfirm, onCancel, confirmCount = 0,
        cancelCount = 0;

    beforeEach(function () {

        alertDialog = DialogFactory.alert({
            content: '内容',
            footer: '底部',
            width: '600px',
            title: '标题',
            top: '50px',
            left: '',
            fixed: 1,
            showMask: 1,
            leve: 10,
            onConfirm: function () {
                onConfirm.apply(this);
            }
        });

        confirmDialog = DialogFactory.confirm({
            content: '内容',
            footer: '底部',
            width: '600px',
            title: '标题',
            top: '50px',
            left: '',
            fixed: 1,
            showMask: 1,
            leve: 11,
            onCancel: function () {
                onCancel.apply(this);
            }
        });

    });


    afterEach(function () {
        alertDialog.dispose();
        confirmDialog.dispose();
        onConfirm = null;
        onCancel = null;

    });

    describe('基本接口', function () {

        it('create alert', function () {

            var alertDialog = DialogFactory.alert({
                content: '内容',
                footer: '底部',
                width: '600px',
                title: '标题',
                top: '50px',
                left: '',
                fixed: 1,
                showMask: 1,
                leve: 10
            });

            alertDialog.dispose();
            expect(!alertDialog.main).toBeTruthy();
        });


        it('create confirm', function () {

            var confirmDialog = DialogFactory.confirm({
                content: '内容',
                footer: '底部',
                width: '600px',
                title: '标题',
                top: '50px',
                left: '',
                fixed: 1,
                showMask: 1,
                leve: 11
            });

            confirmDialog.dispose();
            expect(!confirmDialog.main).toBeTruthy();

        });


        it('event:confirm,alert dialog', function () {

            confirmCount = 0;

            alertDialog.on('confirm', function () {
                confirmCount++;
            });

            onConfirm = function () {
                confirmCount++;
            };

            alertDialog.on('dispose', function () {
                expect(confirmCount).toBe(2);
            });

            alertDialog.show();

            expect(lib.q('ecl-ui-dialog-confirm-btn', alertDialog.main)[0])
                .toBeTruthy();

            lib.fire(
                lib.q('ecl-ui-dialog-confirm-btn', alertDialog.main)[0],
                'click'
            );
        });

        it('event:confirm,confirm dialog', function () {

            confirmCount = 0;

            confirmDialog.on('confirm', function () {
                confirmCount++;
            });

            confirmDialog.on('dispose', function () {
                expect(confirmCount).toBe(1);
            });

            confirmDialog.show();

            expect(lib.q('ecl-ui-dialog-confirm-btn', confirmDialog.main)[0])
                .toBeTruthy();

            lib.fire(
                lib.q('ecl-ui-dialog-confirm-btn', confirmDialog.main)[0],
                'click'
            );
        });

        it('event:cancel', function () {

            cancelCount = 0;

            confirmDialog.on('cancel', function () {
                cancelCount++;
            });

            onCancel = function () {
                cancelCount++;
            };

            confirmDialog.on('dispose', function () {
                expect(cancelCount).toBe(2);
            });

            confirmDialog.show();

            expect(lib.q('ecl-ui-dialog-cancel-btn', confirmDialog.main)[0])
                .toBeTruthy();

            lib.fire(
                lib.q('ecl-ui-dialog-cancel-btn', confirmDialog.main)[0],
                'click'
            );
        });



    });



});