// START MAIN.JS

var sysmsg = "%c 🚭 S-T-O-L.COM \nVERSION: 2022-11-24 01:33:49.814"; 
var sysmsgstyl= [ 
    'font-size: 16px;', 
    'font-family: monospace;', 
    'background: white;', 
    'display: inline-block;', 
    'color: black;', 
    'padding: 8px 19px;', 
    'border: 1px dashed;',
].join(';'); 
console.log(sysmsg, sysmsgstyl);


var isXl = function(){
  return window.innerWidth > 1280;
};
function isHidden(el) {
  // console.log('RECT', el.getBoundingClientRect());
  return !el.offsetWidth && !el.offsetHeight;
}
function onVisible(element, callback) {
  var observer = new MutationObserver(function(mutations) {
    callback(mutations, element);
  });
  observer.observe(element, {
    attributes: true
  });
}
function inViewport(element, callback) {
  var options = {
    root: document.documentElement,
  };
  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      callback(entry.intersectionRatio > 0, element);
    });
  }, options);
  observer.observe(element);
}
HTMLElement.prototype.getFullWidth = function(){
  var element = this;
  var style = element.currentStyle || window.getComputedStyle(element),
    width = element.offsetWidth, // or use style.width
    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
  return width + margin + border;
};
var addScript = function(src, callback){
	var node = document.createElement('script');
	node.type = 'text/javascript';
	node.src = src;
	node.onload = function() {
		if(callback) callback();
	};
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(node);
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

// FIX TOP TEASER HEIGHT
var teaserClass = 'stol-teaser';
var teaserImageClass = 'stol-teaser-image';
var fixTeaserImageHeight = function(teaser, image){
  if(teaser.offsetHeight != image.offsetHeight) {
    image.style.maxHeight = 'none';
  } else {
    // image.style.maxHeight = null;
  }
}
var onTopSlideChange = function(container){
  if(document.body.offsetWidth < 768) {
    return false;
  }
  var slides = container.getElementsByClassName('swiper-slide');
  var activeSlide = Array.prototype.filter.call(slides, function(el){
    return el.classList.contains('swiper-slide-active');
  })[0];
  var teaser = activeSlide.getElementsByClassName(teaserClass)[0];
  var teaserImage = activeSlide.getElementsByClassName(teaserImageClass)[0];
  var teaserImageImg = teaserImage.getElementsByTagName('img')[0];
  if(teaserImageImg.complete) {
    fixTeaserImageHeight(teaser, teaserImage);
  } else {
    teaserImageImg.addEventListener('load', function(e){
      fixTeaserImageHeight(teaser, teaserImage);
    });
  }
};
var initTopSlider = true;
document.addEventListener('topSlideChange', function(e){
  setTimeout(function(){
    if (initTopSlider) {
      var tags = e.target.getElementsByClassName('js-collapsible-tags')[0];
      tags.addEventListener('collapse', function () {
        onTopSlideChange(e.target);
      });
    } else {
      onTopSlideChange(e.target);
    }
    initTopSlider = false;
  }, 0);
});


// GALLERY
var galleryClass = 'stol-article-gallery';
var textSlidesPostfix = '-text-slides';
var teaserContentClass = 'stol-teaser-content';
var modifyGallery = function() {
  var txtSlides, gals = document.getElementsByClassName(galleryClass);
  Array.prototype.forEach.call(gals, function(gal){
    txtSlides = document.createElement('div');
    txtSlides.classList.add(galleryClass+textSlidesPostfix);
    var txts = gal.getElementsByClassName(teaserContentClass);
    Array.prototype.forEach.call(txts, function(txt){
      txtSlides.appendChild(txt.cloneNode(true));
    });
    gal.appendChild(txtSlides);
  });
}
modifyGallery();

var onGallerySlideChange = function(sw){
  var txtSlides = sw.$wrapperEl.parents('[x-init]').find('.'+galleryClass+textSlidesPostfix);
  if(!txtSlides.length) {
    return;
  }
  txtSlides = txtSlides[0];
  Array.prototype.forEach.call(txtSlides.children, function(el, i){ el.style.display = i === sw.realIndex ? 'flex' : 'none';});
};
document.addEventListener('slideChange', function(e){
  setTimeout(function(){
    onGallerySlideChange(e.detail.sw);
  }, 0);
});


// COMMENTS POPUP
var popupClass = 'stol-popup';
var popupActivePrefix = '__active';
var popupClosePrefix = '-close';
var popupTitlePrefix = '-title';
var popupContentPrefix = '-content';
var popupWrapperPrefix = '-wrapper';
var commentPopupPrefix = '__comment';
var initPopupPrefix = '__init';
var commentsElements = document.querySelectorAll('a[href="#tooltip"]');
var removePopups = function() {
  var popups = document.getElementsByClassName(popupClass+commentPopupPrefix);
  if (!popups.length) {
    return false;
  }
  for(var i=popups.length-1; i >= 0; i--) {
    popups[i].classList.add(popupClass+initPopupPrefix);
    setTimeout(function() {
      this.remove();
    }.bind(popups[i]), 250);
  }
  return true;
}
var commentsHandler = function (link) {
  var comment = link.getAttribute('alt') || link.getAttribute('data-comment');
  removePopups();
  var el = document.createElement('div');
  el.classList.add(popupClass);
  el.classList.add(popupClass+commentPopupPrefix);
  el.classList.add(popupClass+initPopupPrefix);
  el.setAttribute('data-activeclass', popupClass+popupActivePrefix);
  var inner = '<div class="'+popupClass+commentPopupPrefix+popupWrapperPrefix+'">';
  inner +=        '<a href="#" class="'+popupClass+popupClosePrefix+' '+popupClass+commentPopupPrefix+popupClosePrefix+'"><i class="icon-close"></i></a>';
  inner +=        '<div class="'+popupClass+popupContentPrefix+'">'+comment+'</div>';
  inner +=    '</div>';
  el.innerHTML = inner;
  link.appendChild(el);
  var close = el.getElementsByClassName("icon-close")[0];
  if (close) {
    close.addEventListener('click', function(e){
      e.stopImmediatePropagation();
      e.preventDefault();
      removePopups();
    });
  }
  var wrapper = el.getElementsByClassName(popupClass+commentPopupPrefix+popupWrapperPrefix)[0];
  wrapper.addEventListener('click', function(e){
    e.stopPropagation();
  });
  setTimeout(function(){
    el.classList.remove(popupClass + initPopupPrefix);
  }, 0);
  return el;
}

commentsElements.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList && !e.target.classList.contains(popupClass+commentPopupPrefix)) {
      e.stopPropagation();
    } else {
      return false;
    }
    var dropdown = commentsHandler(e.currentTarget);
    if (!dropdown) {
      return;
    }
    var activeClass = dropdown.dataset['activeclass'] || 'showed';
    if (dropdown.classList.contains(activeClass)) {
      dropdown.classList.remove(activeClass);
    } else {
      dropdown.classList.add(activeClass);
    }
  });
});

// LOADER
var loader = {
  class: 'stol-loader',
  show: function() {
    var loaders = document.getElementsByClassName(this.class);
    if (loaders.length) {
      return false;
    }
    var el = document.createElement('div');
    el.classList.add(this.class);
    el.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';
    document.body.appendChild(el);
    return true;
  },
  hide: function() {
    var loaders = document.getElementsByClassName(this.class);
    if (!loaders.length) {
      return false;
    }
    loaders[0].remove();
  },
}

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
  hideTagClass: 'js-hide-tag',
  showTags: function(container){
    var hidden = container.getElementsByClassName(this.hiddenTagClass);
    for(var i = hidden.length-1; i >= 0 ; i--) {
      hidden[i].setAttribute('data-hidden', true);
      hidden[i].classList.remove(this.hiddenTagClass);
    }
    var showArr = container.getElementsByClassName(this.showTagClass);
    if (showArr.length) {
      showArr[0].classList.add(this.hiddenTagClass);
    }
    var hideArr = container.getElementsByClassName(this.hideTagClass);
    if (hideArr.length) {
      hideArr[0].classList.remove(this.hiddenTagClass);
    }
  },
  hideTags: function(container){
    var toHide = container.querySelectorAll('[data-hidden]');
    if (!toHide.length) {
      return;
    }
    for(var i = 0; i < toHide.length ; i++) {
      toHide[i].classList.add(this.hiddenTagClass);
    }
    var showArr = container.getElementsByClassName(this.showTagClass);
    if (showArr.length) {
      showArr[0].classList.remove(this.hiddenTagClass);
    }
    var hideArr = container.getElementsByClassName(this.hideTagClass);
    if (hideArr.length) {
      hideArr[0].classList.add(this.hiddenTagClass);
    }
  },
  collapseTags: function(container){
    var w = container.clientWidth;
    var wTags = 0;
    var hiddenCount = 0;
    for(var i = 0; i < container.children.length; i++) {
      var el = container.children[i];
      if (el.classList.contains(this.showTagClass) || el.classList.contains(this.hideTagClass)) {
        continue;
      }
      wTags += el.getFullWidth();
      if (wTags >= w - this.countTagWidth) {
        el.classList.add(this.hiddenTagClass);
        hiddenCount++;
      }
    }
    container.hiddenCount = hiddenCount;
    if (hiddenCount) {
      var hideTag, countTag, countTagArr = container.getElementsByClassName(this.showTagClass);
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

        hideTag = document.createElement('a');
        hideTag.setAttribute('href', '#hidetags');
        hideTag.classList.add(this.tagClass, this.hideTagClass, this.hiddenTagClass);

        hideTag.innerHTML = '<i class="icon-close"></i>';
        container.appendChild(hideTag);
        hideTag.addEventListener('click', function(e){
          e.preventDefault();
          var container = e.currentTarget.closest('.'+this.containerClass);
          if (!container) {
            console.error('NO CONTAINER', e.currentTarget, this.containerClass);
            return;
          }
          this.hideTags(container);
        }.bind(this));
        setTimeout (function(){
          container.dispatchEvent(new CustomEvent("collapse", {
            detail: { }
          }));
        }, 0)
      }
      countTag.innerHTML = '+' + hiddenCount;
    }
    return hiddenCount;
  },
  updateTagsBlocks: function(){
    var z = this, block;
    for(var i = 0; i < this.tagsBlocks.length; i++){
      block = this.tagsBlocks[i];
      if(isHidden(block)) {
        // console.log('COLLAPSIBLE ELEMENT IS NOT VISIBLE', block);
        onVisible(block, function(mutation, element){
          // console.log('COLLAPSIBLE ELEMENT IS VISIBLE NOW', mutation, element, block);
          if(!mutation){
            return;
          }
          z.collapseTags(element);
        })
      } else {
        this.collapseTags(block);
      }
    } 
  },
  init: function() {
    this.tagsBlocks = document.getElementsByClassName(this.containerClass);
    this.updateTagsBlocks();
  }
}

var closeModal = function(type) {
  if(type) {
    var popup = document.getElementsByClassName(popupClass+'__'+type);
    if(popup.length) {
      popup[0].remove();
    }
  } else {
    var popups = document.getElementsByClassName(popupClass+'__'+type);
    for(var i = popups.length-1; i--; i >= 0) {
      popups[i].remove();
    }
  }
}

var showModal = function(message, title, type, timeout, parent) {
  parent = parent || document.body;
  var el, popups = document.getElementsByClassName(popupClass+'_'+type);
  if (popups.length) {
    el = popups[0];
    var elTitle = el.getElementsByClassName(popupClass+popupTitlePrefix)[0];
    var elContent = el.getElementsByClassName(popupClass+popupContentPrefix)[0];
    if (elTitle) {
      elTitle.innerHTML = title;
    }
    if (elContent) {
      elContent.innerHTML = message;
    }
  } else {
    el = document.createElement('div');
    el.classList.add(popupClass);
    el.classList.add(popupClass+'__'+type);
    el.setAttribute('data-activeclass', popupClass+popupActivePrefix);
    var html = '<div class="'+popupClass+popupWrapperPrefix+'">';
    html += '<div class="'+popupClass+popupClosePrefix+'"><i class="icon-close"></i></div>';
    if(title) html += '<h2 class="'+popupClass+popupTitlePrefix+'">'+title+'</h2>';
    html += '<div class="'+popupClass+popupContentPrefix+'">'+message+'</div>';
    html += '</div>';
    el.innerHTML = html;
    parent.appendChild(el);
    var close = el.getElementsByClassName("icon-close")[0];
    if (close) {
      close.addEventListener('click', function(e){
        var popup = e.currentTarget.closest('.' + popupClass);
        setTimeout(function() {
          popup.remove();
        }, 0);
      }); 
    }
  }
  if (timeout) {
    setTimeout (function(){
      if (el && el.nextSibling) {
        el.nextSibling.remove();
      }
      if (el) {
        el.remove();
      }
    }, timeout);
  }
  return el;
}

var showSendErrorModal = function (text, formId) {
  var content = '<form id="'+formId+'ErrorForm" action="#" method="POST">';
  content += '<p class="'+popupClass+'-content"><span></span><strong>'+text+'</strong><span></span></p>';
  content += '<input type="hidden" name="body" value="'+text+'">';
  content += '<input type="hidden" name="code" value="/">';
  content += '<div class="'+popupClass+'-formContent">';
  content += '    <textarea type="text" name="comment" class="'+popupClass+'-textarea" maxlength="140" placeholder="Ваш комментарий (необязательно)" value=""></textarea>';
  content += '    <span><span id="'+formId+'ErrorFormCount">0</span>/140</span>';
  content += '</div>';
  content += '<button type="submit" class="'+popupClass+'-sendButton">Отправить</button>';
  content += '</form>';
  showModal(content, 'Нашли ошибку?', 'center');
  var errorForm = document.getElementById(formId+'ErrorForm');
  if (errorForm) {
    var elCount = document.getElementById(formId+'ErrorFormCount');
    var elText = errorForm.getElementsByTagName('textarea')[0];
    elText.addEventListener('keyup', function(e){
      elCount.innerText = elText.value.length;
    });
    errorForm.addEventListener('submit', function(e){
      e.preventDefault();
      sendEmail(text, 'text-error', {comment: elText.value});
      closeModal('center');
    });
  }

}


var sendEmail = function(message, type, options){
  if(!window.hasOwnProperty('emailjs')) {
    console.error('NO EMAIL LIBRAY FOUND');
    return;
  }
  type = type || 'text-error';
  var sendObject = options || {};
  sendObject['message'] = message;
  sendObject['date'] = (new Date()).toLocaleString("ru-RU");
  sendObject['url'] = document.location.href;
  sendObject['key'] = Math.floor(Math.random() * 1000000000);
  console.log('send text error', sendObject);
  setTimeout(function(){
    loader.show();
    emailjs.send("service_aszzsdb", "stol-" + type, sendObject)
      .then(function(){
          loader.hide();
          showModal('<b>Вы нашли ошибку в тексте:</b> ' + message, 'Сообщение успешно отправлено!', 'center', 4000);
        }, function(err) {
          loader.hide();
          showModal(JSON.stringify(err), 'ОШИБКА! Сообщение не отправлено!', 'center', 5000);
        }
      );
  }, 0);
};




var addLinkListeners = function(){
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
addLinkListeners();

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
document.addEventListener('click', function(e){
  removePopups();
});
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
  stopScroll(rect.height);
});
function getSelectionText() {
  var text = "";
  if (window.getSelection) {
      text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
  }
  return text;
}
document.addEventListener('keydown', function(e){
  var text = getSelectionText();
  if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
    if(!window.hasOwnProperty('emailjs')) {
      loader.show();
      addScript('https://cdn.emailjs.com/dist/email.min.js', function(){
        emailjs.init("0RmzGvyMD7Fd_es0G");
        loader.hide();
        showSendErrorModal(text, 'textErrorPopup');
      })
    } else {
      showSendErrorModal(text, 'textErrorPopup');
    }
  }
});