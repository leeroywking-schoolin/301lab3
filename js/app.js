'use-strict'

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

Horns.prototype.toHtml = function() {
  let $template = $('#horn-template').html();
  let compiledTemplate = Handlebars.compile($template);
  return compiledTemplate(this);
}


Horns.readHorns = (page) => {
  $.get(page,'json')
    .then(data => {
      data.forEach(item => {new Horns(item)
      });
    })
    .then(Horns.loadHorns)
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

// THIS IS NOT DRY I know I need to refactor this if/when I have time but I am still working on MVP at time of writing.

$('#pageselect').on('change', function() {
  let selection = $('#pageselect :selected').val();
  if(selection === 'page1'){
    Horns.allHorns = [];
    $('div').remove(); 
    Horns.readHorns('data/page-1.json').then( () => {
      $('div').hide();
    })
    let selection = $('#keywords :selected').val();
    console.log(selection);
    if(selection === 'default'){$('div').show()}
    else{$('.' + selection).show();}
  };

  if(selection === 'page2'){
    Horns.allHorns = [];
    $('div').remove();
    $(() => Horns.readHorns('data/page-2.json'));
    let selection = $('#keywords :selected').val();
    console.log(selection);
    if(selection === 'default'){$('div').show()}
    else{$('.' + selection).show();
  }
  };
})


$('#keywords').on('change', function() {
  let selection = $('#keywords :selected').val();
  $('div').hide();
  // let sortBy = ($('#sortword :selected').val());
  // if(sortBy === 'Number of horns'){};
  // if(sortBy === 'Title'){};
  if(selection === 'default'){$('div').show()}
  else{
  $('.' + selection).show();
  }
})