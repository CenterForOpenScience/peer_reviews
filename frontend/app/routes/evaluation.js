import Ember from "ember";
export default Ember.Route.extend( {
    submission: '',
    model( params ) {
        this.set( 'submission', params.sub );
        var record = this.store.createRecord( 'evaluation' );
        record.set( 'submission', this.get( 'submission' ) );
        return record;
    },
    activate: function () {
        var self = this;
        Ember.$.ajax( {
            url: "http://localhost:8000/checklogin",
            dataType: 'json',
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: true
            }
        } ).then( function ( loggedIn ) {
            if ( loggedIn.data === 'false' ) {
                console.log( 'not logged in' );
                self.transitionTo( 'login' );
            }
        } );
    }, // submission: null,
    // total: Ember.computed.sum('submission.sda', submission.asd',)
    actions: {
        navigate() {
            this.transitionTo( 'index' );
        },
        gotoreviewing(){
            this.transitionTo( 'reviewslist' );
        },
        gotoediting(){
            this.transitionTo( 'editing.submissions' );
        },
        saveEvaluation( newEval ) {
            let router = this;
            if ( (parseInt( document.getElementById( 'premise' ).value ) >= 0) &&
                (parseInt( document.getElementById( 'premise' ).value ) <= 15) &&
                (parseInt( document.getElementById( 'research' ).value ) >= 0) &&
                (parseInt( document.getElementById( 'research' ).value ) <= 15) &&
                (parseInt( document.getElementById( 'style' ).value ) >= 0) &&
                (parseInt( document.getElementById( 'style' ).value ) <= 15) ) {

                //newEval.set('reviewslist', this.get('submission'));
                newEval.save().then( function () {
                    document.getElementById( 'submitAlert' ).className = "alert-success alert fade in";
                    console.log( newEval.get( 'reviewslist' ) );
                    setTimeout( function () {
                        router.transitionTo( 'reviewslist' );
                    }, 2000 );
                } );  //, function() {
                //error logic
            }
            else {
                document.getElementById( 'errorAlert' ).className = "alert-danger alert fade in";
                setTimeout( function () {
                    document.location.reload();
                }, 2000 );
            }
        },
        cancel(){
            let router = this;
            router.transitionTo( 'reviewslist' );
        }
    },
} );
