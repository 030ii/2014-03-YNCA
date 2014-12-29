function Modal () {
    var overlay, modal, move;
    var body = document.getElementsByTagName('body')[0];

    this.show = function (oInfo) {
        if (!overlay) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = '<div id="modal-overlay"><div id="modal"><div class="title">title</div><div class="content">content</div></div></div>';
            body.appendChild(wrapper.childNodes[0]);

            overlay = document.getElementById('modal-overlay');
            modal = document.getElementById('modal');
        }

        move = oInfo.move || 'down';

        if (oInfo.title) {
            document.querySelector('#modal > div.title').innerHTML = oInfo.title;
        }

        if (oInfo.content) {
            document.querySelector('#modal > div.content').innerHTML = oInfo.content;
        }

        overlay.style.visibility = 'visible';
        setTimeout(function () {
            overlay.style.opacity = 1;
        }, 10);

        switch(move) {
            case 'down':
                modal.classList.add('top');
                modal.classList.add('fade');
                setTimeout(function () {
                    modal.classList.remove('top');
                }, 0);
                break;
            case 'up':
                modal.classList.add('bottom');
                modal.classList.add('fade');
                setTimeout(function () {
                    modal.classList.remove('bottom');
                }, 0);
                break;
            case 'right':
                modal.classList.add('left');
                modal.classList.add('fade');
                setTimeout(function () {
                    modal.classList.remove('left');
                }, 0);
                break;
            case 'left':
                modal.classList.add('right');
                modal.classList.add('fade');
                setTimeout(function () {
                    modal.classList.remove('right');
                }, 0);
                break;
        }


        body.style.overflow = "hidden";
    };

    this.hide = function () {
        switch(move) {
            case 'down':
                modal.classList.add('bottom');
                break;
            case 'up':
                modal.classList.add('top');
                break;
            case 'right':
                modal.classList.add('right');
                break;
            case 'left':
                modal.classList.add('left');
                break;
        }

        setTimeout(function () {
            modal.classList.remove('fade');
            overlay.style.visibility = "hidden";
        }, 300);
        overlay.style.opacity = 0;
        body.style.overflow = "scroll";
    };
}

