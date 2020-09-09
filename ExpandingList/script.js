/**
 * Customized builtin component
 */
class ExpandingList extends HTMLUListElement {
  constructor() {
    //return value from super() is a reference to this element
    self = super();

    /**
     * get all ul and li elements which are child of this custom ul element
     * li elements can have uls within them which makes them containers
     */

    //Array.from creates shallow copy array from array like iterable objects
    const uls = Array.from(self.querySelectorAll('ul'));
    const lis = Array.from(self.querySelectorAll('li'));

    /**Hide all child uls at first these will be shown only when user clicks higher level container
     * which happens to be the span with title of list in here
     */
    uls.forEach((ul) => {
      ul.style.display = 'none';
    });

    //look through each li element in ul
    lis.forEach((li) => {
      //if the li has a ul child decorate it and add a click handler
      if (li.querySelectorAll('ul').length > 0) {
        //add an attribute which can be used by syle to show open or closed icon
        li.setAttribute('class', 'closed');

        //wrap the li element's text in a new span element
        //which allows us to assign style and event handlers to the span
        const childText = li.childNodes[0];
        const newSpan = document.createElement('span');

        //copy text from li to span, set cursor style
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = 'pointer';

        //add clickhandler to toggle ul
        newSpan.onclick = self.toggleul;

        li.insertBefore(newSpan, childText);
        li.removeChild(childText);
      }
    });
  }

  toggleul = function (e) {
    //next sibling to the span should be the ul
    const nextul = e.target.nextElementSibling;

    //Toggle visible state and update class attribute on ul
    if (nextul.style.display == 'block') {
      nextul.style.display = 'none';
      nextul.parentNode.setAttribute('class', 'closed');
    } else {
      nextul.style.display = 'block';
      nextul.parentNode.setAttribute('class', 'open');
    }
  };
}

//Define the customized element with third optional argument referring to the element which it is based on
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });
