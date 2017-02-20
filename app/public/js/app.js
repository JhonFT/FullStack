import $ from 'jquery';

$('.Menu-close span').click(() => {
  $('nav').hide();
});


$('.Menu-open').click(() => {
  $('nav').show();
});
