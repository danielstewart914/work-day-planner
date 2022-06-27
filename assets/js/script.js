var timeBlockContainerEl = $( '#time-block-container' );
var currentDayEl = $( '#currentDay' );
var timeBlocks = [];

const saveChar = '&#128190;';

var now = moment();

function displayTimeBlocks() {

    for ( var i = 9; i <= 17; i++ ) {

        var rowEl = $( '<div>' );
        var hourEl = $( '<div>' );
        var textAreaEl = $( '<textarea>' );
        var saveButtonEl = $( '<button>' );

        var hour = now.hour()

        rowEl.addClass( 'row mx-2' );
        hourEl.addClass( 'hour col-2 col-md-1' );
        textAreaEl.addClass( 'col-8 col-md-10' );
        saveButtonEl.addClass( 'saveBtn col-2 col-md-1 text-center border-0' );

        saveButtonEl.html( saveChar );

        if ( i < 12 ) {

            hourEl.text( i + 'am' );

        } else if ( i === 12 ) {

            hourEl.text( i + 'pm' );

        } else {

            hourEl.text( (i - 12) + 'pm' );

        }

        if ( i < hour ) {

            textAreaEl.addClass( 'past' );

        } else if ( i === hour ) {

            textAreaEl.addClass( 'present' );

        } else {

            textAreaEl.addClass( 'future' );

        }

        rowEl.append( hourEl );
        rowEl.append( textAreaEl );
        rowEl.append( saveButtonEl );

        timeBlockContainerEl.append( rowEl );

    }

}

currentDayEl.text( now.format( 'dddd MMMM Do YYYY' ) );

displayTimeBlocks();