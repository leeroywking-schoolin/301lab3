'use-strict'

// display images


function Horns(horn){
  this.img_url = horn.image_url;
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

Horns.prototype.toHtml = function() {
  // console.log('blah')
  let $template = $('#horn-template').html();
  // console.log($template);
  let compiledTemplate = Handlebars.compile($template);
  console.log(compiledTemplate(this));
  return compiledTemplate(this);
}


Horns.readHorns = (page) => {
  $.get(page,'json')
    .then(data => {
      // console.log(data);
      data.forEach(item => {new Horns(item)
      });
    })
    .then(Horns.loadHorns);
};



Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => {
    $('main').append(horn.toHtml())
  });
  Horns.allKeys.forEach(key => renderKeys(key));
};

const renderKeys = function(key) {
  $('#keywords').append(`<option class="keyword-option" id="${key}">${key}</option>`);
}

$(() => Horns.readHorns('data/page-1.json'))

$('#pageselect').on('change', function() {
  let selection = $('#pageselect :selected').val();
  console.log(selection);
  if(selection === 'page1'){
    Horns.allHorns = [];
    $('div').remove(); 
    $(() => Horns.readHorns('data/page-1.json'))
  };
  if(selection === 'page2'){
    Horns.allHorns = [];
    $('div').remove();
    $(() => Horns.readHorns('data/page-2.json'));
  };
})


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