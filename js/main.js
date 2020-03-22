/* Crated by Trevor Gibbons
This script controls a mask of blur text overtop of the actual text.
When a user's mouse hovers over the text or clicks the button outside of the
paragraph block, the text mask is faded back to the original text.
This style makes it so the user can only read the important text at the start,
then if they are interested, they can read it all.

Note: This text must use a monospace font to work, or the text mask will may not
line up properly with the actual text.

The toggle button is a library called 'rcSwitcher' and not created by me. */

$(document).ready(function() {

  /*Blur text functions */

  //Not used
  $('.gender :radio').rcSwitcher({
      // reverse: true,
      theme: 'yellowish-green',
      width: 48,
      height: 16,
      onText: '&check;',
      offText: '&cross;',
      blobOffset: 2,
      inputs: true,
      autoStick: true,
    })
    // Listen to status changes
    .on('turnon.rcSwitcher', function(e, data) {
      // console.log( data.$input[0].checked );
    });

  $('.level :radio').rcSwitcher({
    // reverse: true,
    theme: 'flat',
    // width: 70,
    blobOffset: 1,
  });

  //This is type of input checkbox used 
  $('.permissions :checkbox').rcSwitcher({
    // reverse: true,
    // inputs: true,
    width: 56,
    height: 30,
    blobOffset: 1,
    onText: 'tl;dr',
    offText: '',
    theme: 'dark',
    // autoFontSize: true,
    autoStick: true,
  }).on('toggle.rcSwitcher', function(e, data, type) {

    //Get a reference to the element that holds the blur elements
    $bp = $(this).parent().next();
    //onsole.log($bp);
    //Create a bool to test if this switch is on or off
    $isOn = (type == 'turnon') ? true : false;
    //console.log($isOn);
    //Change the flag of the paragraph (used to sync with 'hover')
    $isOn ? $bp.data('tgglon', true) : $bp.data('tgglon', false);
    //console.log($bp.data("tgglon"));

    //Call the main text change funciton
    inputChange($bp, $isOn);

  });

  //Not used
  $('.delete :checkbox').rcSwitcher({
    // reverse: true,
    inputs: true,
    // width: 70,
    // height: 24,
    // blobOffset: 2,
    onText: 'Del',
    offText: 'No',
    theme: 'modern',
    // autoFontSize: true,
  }).on({
    'enable.rcSwitcher': function(e, data) {
      console.log('Enabled', data);
    },

    'disable.rcSwitcher': function(e, data) {
      console.log('Disabled');
    }
  });

  /*-------------------------------------------------------------------*\
  |							Testing Input Changes
  \*-------------------------------------------------------------------*/

  // Auto Check Radio Button
  // NOTE: Radio Button Are Disabled Only By Activating Another Sibiling Radio
  $('.toggle-radio').on('click', function(e) {
    if ($(':radio[value=male]').is(':checked'))
      $(':radio[value=male]').prop('checked', false)
    else
      $(':radio[value=male]').prop('checked', true)

    $(':radio[value=male]').change();
  });

  // Toggle Disable State Of radio Button
  $('.toggle-radio-disable').on('click', function(e) {
    if ($(':radio[value=male]').is(':disabled'))
      $(':radio[value=male]').prop('disabled', false)
    else
      $(':radio[value=male]').prop('disabled', true)

    $(':radio[value=male]').change();
  });

  // Toggle Checked Status For Check Box
  $('.toggle-checkbox').on('click', function(e) {
    if ($(':checkbox[value=1]').is(':checked'))
      $(':checkbox[value=1]').prop('checked', false)
    else
      $(':checkbox[value=1]').prop('checked', true)

    $(':checkbox[value=1]').change();
  });


  // Toggle Disabled Status For Check Box
  $('.toggle-checkbox-disable').on('click', function(e) {

    if ($(':checkbox[value=1]').is(':disabled'))
      $(':checkbox[value=1]').prop('disabled', false)
    else
      $(':checkbox[value=1]').prop('disabled', true)

    $(':checkbox[value=1]').change();
  });

  //Set the transistion time
  var tt = 1;
  //Set transition timing here so the permanent button change will match
  $('.blur, .noBlur').css('transition', tt + 's');

  //Main change function, will add/remove 'blur' classes as required
  //Takes on the blur paragraph element and a bool for if blurred or not
  function inputChange(bp, isOn) { //bp is the blurParagraph class in this div

    //Cycle through each child element of the blur paragragh
    bp.children().each(function() {
      //Check to see if the is a blurred part of the paragraph
      if ($(this).data('blur')) {
        //If not checked, then un-blur the paragraph
        if (!isOn) {
          $(this).removeClass('blur');
          $(this).addClass('noBlur');
        } else { //Blur/re-blur the paragraph
          $(this).removeClass('noBlur');
          $(this).addClass('blur');
        }
      }
    })
  }

  //Hover change functions
  $('.blurParagraph').hover(hoverIn, hoverOut);

  function hoverIn() {

    //Set a flag to false to begin the transion
    $(this).data('blurred', false);
    //Call the transition while the mouse is hovered in the element
    inputChange($(this), $(this).data('blurred'));

    //Test to see if the paragraph is blurred, if so, start a timer to test if blur should be permanently changed
    if ($(this).data('tgglon')) {
      var thisID = ($(this).attr('id')); //ID of this elm for the timer
      //Set the timer to see if the mouse is still in the paragragh for a set time. If so, then simulate the 'toggle' of the switch
      setTimeout(timerComplete, tt * 1000, thisID);
    }
  }

  //Only trigger the hoverOut if the paragraph is set to blurr
  function hoverOut() {
    //If set to blurr then revert to blurr
    if ($(this).data('tgglon')) {
      $(this).data('blurred', true);
      inputChange($(this), $(this).data('blurred'));
    }

  }

  //Timer to test if the mouse is still in the paragragh, if so 'permanently' toogle off blurr
  function timerComplete(thisID) {

    var caller = $("div[id='" + thisID + "']");
    var manualTggl = caller.parent().find('input').first().rcSwitcher();
    if (!caller.data('blurred')) {
      caller.data('tgglOn', false);
      manualTggl.prop('checked', false).change();
    }
  }
})