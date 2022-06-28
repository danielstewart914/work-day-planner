var timeBlockContainerEl = $( '#time-block-container' );
var currentDayEl = $( '#currentDay' );

const saveChar = '&#128190;';

var now = moment();

function isAMorPM( hour ) {

    if ( hour < 12 ) {

        return 'am';

    }

    return 'pm';

}

function from24to12hour( hour ) {

    if( hour > 12 ) {

        return hour - 12;

    }

    return hour;

}

function pastPresentOrFuture( now, hour ) {

    if ( hour < now ) {

        return 'past';

    }

    if ( hour  === now ) {

        return 'present';

    }

    return 'future';

}

function displayTimeBlocks() {

    var calendarFrag = $( document.createDocumentFragment() );

    // iterate from hour 9 to 15 and print time blocks to screen
    for ( var hourBlock = 9; hourBlock <= 17; hourBlock++ ) {

        var rowEl = $( '<div>' );
        var hourEl = $( '<div>' );
        var textAreaEl = $( '<textarea>' );
        var saveButtonEl = $( '<button>' );

        var currentHour = now.hour()

        // add classes to newly created elements
        rowEl.addClass( 'row mx-1 mx-sm-0' );
        hourEl.addClass( 'hour col-2 col-lg-1' );
        textAreaEl.addClass( 'col-8 col-lg-10' );
        saveButtonEl.addClass( 'saveBtn col-2 col-lg-1 text-center border-0' );

        // add save char and data hour to each save button
        saveButtonEl.html( saveChar );
        saveButtonEl.data( 'hour', hourBlock );

        // fill time blocks with data from local storage
        textAreaEl.val( localStorage.getItem( 'hour-' + hourBlock, ) );


        // print hour to screen
        hourEl.text( from24to12hour( hourBlock ) + isAMorPM( hourBlock ) );

        // check if hour block is in the past present or future and add corresponding class
        textAreaEl.addClass( pastPresentOrFuture( currentHour, hourBlock ) );

        // append hour, text area and button to current row
        rowEl.append( hourEl );
        rowEl.append( textAreaEl );
        rowEl.append( saveButtonEl );

        // append row to document fragment
        calendarFrag.append( rowEl );

    }

    // set time block containers contents to time calendar fragment
    timeBlockContainerEl.html( calendarFrag );

}

function saveTimeBlock( event ) {

    // select save button clicked
    var target =  $( event.target );

    // get value from sibling text area
    var value = target.siblings( 'textarea' ).val();

    // save to local storage
    localStorage.setItem( 'hour-' + target.data( 'hour' ), value );

}

// display current date
currentDayEl.text( now.format( 'dddd MMMM Do YYYY' ) );

// display time blocks
displayTimeBlocks();

timeBlockContainerEl.on( 'click', 'button', saveTimeBlock );