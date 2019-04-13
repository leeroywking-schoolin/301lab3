'use-strict'

function Horns(horn) {
  for (let key in horn){
    this[key] = horn[key];
  }
  if (!(Horns.allKeys.indexOf(horn.keyword) + 1)) {
    Horns.allKeys.push(horn.keyword);
  }
  Horns.allHorns.push(this);
}

Horns.allKeys = [];
Horns.allHorns = [];

Horns.prototype.toHtml = function () {
  let $template = $('#horn-template').html();
  let compiledTemplate = Handlebars.compile($template);
  return compiledTemplate(this);
}

Horns.readHorns = (page) => {
  $.get(page, 'json')
    .then(data => {
      data.forEach(item => {
        new Horns(item)
      });
    })
    .then(Horns.loadHorns)
};

Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => {
    $('main').append(horn.toHtml())
  });
  Horns.allKeys.forEach(key => renderKeys(key));
  console.log('render complete');
};

renderKeys = key => $('#keywords').append(`<option class="keyword-option" id="${key}">${key}</option>`);

 {}

pageRender = pageNumber => {
  $('div').remove();
  Horns.allHorns = [];
  if (pageNumber === 'page1') { $(() => Horns.readHorns('data/page-1.json')) }
  if (pageNumber === 'page2') { $(() => Horns.readHorns('data/page-2.json')) }
}

// this doesn't work
sortPage = (array, sortBy) => {
  console.log(array[0] + ' is the first entry going in')
  if(sortBy === 'horns'){
    array.sort = (a,b) => a.numHorns - b.numHorns
  }
  if(sortBy === 'title'){
    array.sort = (a,b) => a.title - b.title
  }
  console.log('sort complete');
  console.log(array[0] + ' is the first entry after sorting');
  console.log(Horns.allHorns[0] + ' is the first entry in the action Horns.allHorns array');
}

hideAllThenShowKeyword = keyword => {
  $('div').hide();
  console.log('divs are hidden now')
  if (keyword === 'default') { $('div').show(); console.log('showing default') }
  else { $('.' + keyword).show(); console.log('showing keyword') }
  console.log('hideAllThenShowKeyword() is complete');
}

// I'm trying something new, rather than having a series of individual event listeners lets just have one big event listener which modifies the values of some variables and then calls the render function after that hopefully side stepping a lot of nonsense.

$('header').on('change', () => {
  let keyword = $('#keywords :selected').val();
  let sortBy = $('#sortword :selected').val();
  let pageNumber = $('#pageselect :selected').val();
  console.log(`
  The keyword is '${keyword}'
  The sortBy is '${sortBy}'
  The pageNumber is '${pageNumber}'`);
  pageRender(pageNumber);
  sortPage(Horns.allHorns, sortBy);
  hideAllThenShowKeyword(keyword);
});

// This is to initialize the page
$(() => Horns.readHorns('data/page-1.json'))
