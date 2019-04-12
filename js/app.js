'use-strict'

// display images


function Horns(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.numHorns = horn.horns;
  if (!(Horns.allKeys.indexOf(horn.keyword)+ 1)) {
    Horns.allKeys.push(horn.keyword);
  }
  Horns.allHorns.push(this);
}

Horns.allKeys = [];

Horns.allHorns = [];

Horns.prototype.render = function(){
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class = "clone"]');

  let hornHTML = $('#horn-template').html();

  hornClone.html(hornHTML);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src',this.image_url);
  hornClone.find('img').attr('alt',this.keyword);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.addClass(this.numHorns + 'horns');
  hornClone.addClass(this.keyword);
}

Horns.readHorns = () => {
  $.get('data/page-1.json','json')
    .then(data => {
      data.forEach(item => {new Horns(item)
      });
    })
    .then(Horns.loadHorns);
};

Horns.loadHorns = () => {
  // console.log(Horns.allHorns)
  Horns.allHorns.forEach(horn => horn.render())
  Horns.allKeys.forEach(key => renderKeys(key));

};

const renderKeys = function(key) {
  $('#keywords').append(`<option class="keyword-option" id="${key}">${key}</option>`);

}

$(() => Horns.readHorns());

$('#keywords').on('change', function() {
  let selection = $('#keywords :selected').val();
  $('div').hide();
  let sortBy = ($('#sortword :selected').val());
  if(sortBy === 'Number of horns'){};
  if(sortBy === 'Title'){};
  if(selection === 'default'){$('div').show()}
  else{
  $('.' + selection).show();
  }
})
// console.log(Horns.allHorns);
// Horns.allHorns.forEach(element)(console.log(element.keyword))
// Horns.allHorns[].numHorns
// Horns.allHorns.forEach(element => console.log(element));