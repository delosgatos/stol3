var isXl = function(){
  return window.innerWidth > 1280;
};
HTMLElement.prototype.getFullWidth = function(){
  var element = this;
  var style = element.currentStyle || window.getComputedStyle(element),
    width = element.offsetWidth, // or use style.width
    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
  return width + margin + border;
};
(function() {
  var throttle = function(type, name, obj) {
      obj = obj || window;
      var running = false;
      var func = function() {
          if (running) { return; }
          running = true;
           requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
          });
      };
      obj.addEventListener(type, func);
  };
  throttle("resize", "optimizedResize");
})();
var ANTISCROLL = 'stop-scrolling';
var bodyClasses = document.body.classList;
var stopScroll = function(maxHeight) {
  bodyClasses.add(ANTISCROLL);
  document.body.style.height = (maxHeight < window.innerHeight ? window.innerHeight : maxHeight) + 'px';
  document.body.style.overflow = 'hidden';
};
var resumeScroll = function() {
  bodyClasses.remove(ANTISCROLL);
  document.body.style.height = '';
  document.body.style.overflow = 'inherit';
};

var showClickElements = document.querySelectorAll('[data-show]');
var showClickHandler = function (switcher, state) {
  var switcherActiveClass = switcher.dataset['activeclass'];
  if (state == 'on') {
    if (!switcher.classList.contains(switcherActiveClass)) {
      switcher.classList.add(switcherActiveClass);
    }
  } else if (state == 'off') {
    switcher.classList.remove(switcherActiveClass);
  } else {
    switcher.classList.toggle(switcherActiveClass);
  }
  var collapseSelector = switcher.getAttribute('data-show');
  var el = document.querySelector(collapseSelector);
  var elActiveClass = el.dataset['activeclass'];
  var switcherActiveClass = switcher.dataset['activeclass'];
  if (elActiveClass) {
    if (state == 'on') {
      el.classList.add(elActiveClass);
    } else if (state == 'off') {
      if (!switcher.classList.contains(switcherActiveClass)) {
        el.classList.remove(elActiveClass);
      }
    } else {
      el.classList.toggle(elActiveClass);
    }
    if (el.classList.contains(elActiveClass)) {
      var input = el.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  } else {
    if (!el.classList.contains('hidden') && isXl()) {
      if (state == 'on') {
        switcher.classList.remove('xl:hidden');
      } else if (state == 'off') {
        if (!switcher.classList.contains('showed')) {
          el.classList.add('xl:hidden');
        }
      } else {
        el.classList.toggle('xl:hidden');
        if (!el.classList.contains('xl:hidden')) {
          var input = el.querySelector('input');
          if (input) {
            input.focus();
          }
        }
      }
    } else if(switcher.getAttribute('data-use') != 'xl') {
      if (state == 'on') {
        switcher.classList.remove('hidden');
      } else if (state == 'off') {
        if (!switcher.classList.contains('showed')) {
          el.classList.add('hidden');
        }
      } else {
        el.classList.toggle('hidden');
        if (!el.classList.contains('hidden')) {
          var input = el.querySelector('input');
          if (input) {
            input.focus();
          }
        }
      }
    }
  }
  return el;
}
var toggleModal = function (el) {
  setTimeout(function() {
    var rect = el.getBoundingClientRect();
    var activeClass = el.dataset['activeclass'] || 'showed';
    if (el.classList.contains(activeClass)) {
      stopScroll(rect.height + el.offsetTop);
    } else {
      resumeScroll();
    }
  }, 0);
}
showClickElements.forEach(function (el) {
  el.addEventListener('click', function (e) {
    showClickElements.forEach(function (el) {
      if (el == e.currentTarget) {
        return;
      }
      showClickHandler(el, 'off');
    });
    var dropdown = showClickHandler(e.currentTarget);
    toggleModal(dropdown);
  });
});

var updateSearchSize = function() {
  var search = document.getElementById('searchbar');
  resumeScroll();
  toggleModal(search);
}

var movingElements = {
  isLastXl: false,
  replacementClass: 'moving-replacement',
  insertReplacement: function(el){
    var hintNode = document.createElement('div');
    hintNode.classList.add(movingElements.replacementClass);
    hintNode.id = Math.random().toString(16).slice(2);
    el.setAttribute('data-returnto', hintNode.id);
    el.parentNode.insertBefore(hintNode, el);
  },
  returnElement: function(el){
    var id = el.dataset['returnto'];
    var reEl = document.getElementById(id);
    if(!reEl) {
      return false;
    }
    reEl.parentNode.insertBefore(el, reEl);
    reEl.parentNode.removeChild(reEl);
  },
  move: function(){
    var elements = document.querySelectorAll('[data-moveto]');
    elements.forEach(function(el){
      if (!el.dataset['returnto']) {
        movingElements.insertReplacement(el);
      }
      var movetoSelector = el.dataset['moveto'];
      var container = document.querySelector(movetoSelector);
      if(!container) {
        console.log('MOVE TO NO CONTAINER');
        return;
      }
      container.appendChild(el);
    });
  },
  return: function(){
    return;
    var returnElements = document.querySelectorAll('[data-returnto]');
    returnElements.forEach(function(el){
      var movetoSelector = el.dataset['returnto'];
      var hint = movetoSelector.indexOf('#') === 0 ? document.getElementById(movetoSelector.replace('#','')) : document.querySelector(movetoSelector);
      if(!hint) {
        console.log('RETURN TO NO CONTAINER');
        return;
      }
      hint.parentNode.insertBefore(el, hint);
    });
  },
  update: function(){
    var xl = isXl();
    if (xl && !movingElements.isLastXl) {
      movingElements.move();
    } else if (!xl && movingElements.isLastXl) {
      movingElements.return();
    }
    movingElements.isLastXl = xl;
  }
}

if(isXl()) {
  movingElements.move();
  movingElements.isLastXl = true;
} else {
  movingElements.isLastXl = false;
}
var collapsibleTags = function(collapsibleClass, tagClass, hiddenTagClass){
  this.containerClass = collapsibleClass;
  this.hiddenTagClass = hiddenTagClass;
  this.tagClass = tagClass;
};
collapsibleTags.prototype = {
  countTagWidth: 50,
  tagsBlocks: [],
  showTagClass: 'js-show-tag',
  showTags: function(container){
    var hidden = container.getElementsByClassName(this.hiddenTagClass);
    for(var i = hidden.length-1; i >= 0 ; i--) {
      hidden[i].classList.remove(this.hiddenTagClass);
    }
    var showArr = container.getElementsByClassName(this.showTagClass);
    if (showArr.length) {
      showArr[0].classList.add(this.hiddenTagClass);
    }
  },
  collapseTags: function(container){
    var w = container.clientWidth;
    // console.log('COLLAPSE', container, w);
    var wTags = 0;
    var hiddenCount = 0;
    for(var i = 0; i < container.children.length; i++) {
      var el = container.children[i];
      if (el.classList.contains(this.showTagClass)) {
        continue;
      }
      wTags += el.getFullWidth();
      // console.log('TAG', el, el.offsetWidth, el.getFullWidth(), wTags);
      if (wTags >= w - this.countTagWidth) {
        el.classList.add(this.hiddenTagClass);
        hiddenCount++;
      }
    }
    if (hiddenCount) {
      var countTag, countTagArr = container.getElementsByClassName(this.showTagClass);
      if (countTagArr.length) {
        countTag = countTagArr[0];
        countTag.classList.remove(this.hiddenTagClass);
      } else {
        countTag = document.createElement('a');
        countTag.setAttribute('href', '#showtags');
        countTag.classList.add(this.tagClass, this.showTagClass);
        container.appendChild(countTag);
        countTag.addEventListener('click', function(e){
          e.preventDefault();
          var container = e.currentTarget.closest('.'+this.containerClass);
          if (!container) {
            console.error('NO CONTAINER', e.currentTarget, this.containerClass);
            return;
          }
          this.showTags(container);
        }.bind(this));
      }
      countTag.innerHTML = '+' + hiddenCount;
    }
    return hiddenCount;
  },
  updateTagsBlocks: function(){
    for(var i = 0; i < this.tagsBlocks.length; i++){
      this.collapseTags(this.tagsBlocks[i]);
    } 
  },
  init: function() {
    this.tagsBlocks = document.getElementsByClassName(this.containerClass);
    this.updateTagsBlocks();
  }
}

var addListeners = function(){
  var links = document.querySelectorAll('[data-href]');
  [].forEach.call(links, function(link) {
    link.addEventListener('click', function(e){
      e.preventDefault();
      var url = el.dataset['href'];
      if (el.dataset['target']) {
        window.open(url, '_blank').focus();
      } else {
        window.location.assign(url);
      }
    });
  });
}
addListeners();

window.addEventListener('optimizedResize', function(e) {
  console.log('RESIZE', window.innerWidth+' x '+window.innerHeight);
  movingElements.update();
});
document.addEventListener('DOMContentLoaded', function() {
  var Sticky = new hcSticky('#right-wrapper', {
    stickTo: '#right-column',
    responsive: {
      980: {
        disable: true
      }
    }
  });
});

var resizeListener = function(element, callback){
  new ResizeObserver(callback).observe(element);
};

var ct = new collapsibleTags('js-collapsible-tags', 'stol-tag', 'stol-tag-hidden');
window.onload = function(){
  ct.init();
};
document.addEventListener('changeFullscreen', function(e){
  if(!e.detail || !e.detail.hasOwnProperty('full')) {
    return false;
  }
  if (e.detail.full) { 
    window.scrollTo({top:0,behavior: "smooth"});
    movingElements.insertReplacement(e.target, );
    document.body.insertBefore(e.target, document.body.firstChild);
    e.target.style.zIndex = '99999';
    var container = e.target.querySelector('[x-ref=box]') || e.target;
    setTimeout(function(){
      var rect = container.getBoundingClientRect();
      console.log('FULL RECT', rect);
      stopScroll(rect.height);
    },300);
  } else {
    movingElements.returnElement(e.target);
    resumeScroll();
  }
});
document.addEventListener('slideChangeEnd', function(e){
  if(!e.detail || !e.detail.hasOwnProperty('slide')) {
    return false;
  }
  var slide = e.detail.slide;
  if(!e.target.__x || !e.target.__x.unobservedData || !e.target.__x.unobservedData.full){
    return;
  }
  var container = e.target.querySelector('[x-ref=box]') || e.target;
  var rect = container.getBoundingClientRect();
  console.log('CHANGE RECT', rect);
  stopScroll(rect.height);
});