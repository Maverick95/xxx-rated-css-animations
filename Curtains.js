document.addEventListener('DOMContentLoaded', () => {

    const curtains_count = 5, cycle_count = 1;

    const curtains_toggle = document.getElementById('curtains-activate');
    const curtains_target = document.getElementById('curtains-target');

    const toggleCurtainsStatus = (() => {
        let toggle_curtains = false;
        return () => {
            toggle_curtains = !toggle_curtains;
            if (toggle_curtains) {
                curtains_toggle.setAttribute('disabled', 'true');
            } else {
                curtains_toggle.removeAttribute('disabled');
            }
            return toggle_curtains;
        };
    })();

    let curtains_finished = 0;

    const createTransitionEventHandler = (index) => {

        let animations = -1;
        return (event) => {

            if (++animations === (2 * cycle_count)) {
                event.target.style.setProperty('animation-play-state', 'paused');
                animations = -1;
                if (++curtains_finished === (2 * curtains_count)) {
                    toggleCurtainsStatus();
                    curtains_finished = 0;
                }
            } else {
                const timeout = 1000 *
                (animations === 0 ? index :
                (animations % 2 === 0 ? (2 * index) + 1 : (2 * (curtains_count - index - 1)) + 1));
                if (timeout > 0) {
                    event.target.style.setProperty('animation-play-state', 'paused');
                    setTimeout(() => {
                        event.target.style.setProperty('animation-play-state', 'running');
                    }, timeout);
                } else {
                    event.target.style.setProperty('animation-play-state', 'running');
                }
            }
        };
    };

    const curtains_container = document.createElement('div');
    curtains_container.classList.add('curtains-container');
    curtains_target.appendChild(curtains_container);

    for (var i = 0; i < curtains_count; i++) {

        for (var side of ['left', 'right']) {
            const curtain = document.createElement('div');
            curtain.classList.add('curtain', `curtain-${side}`);
            const transitionHandler = createTransitionEventHandler(i);
            curtain.addEventListener('animationiteration', transitionHandler);
            curtain.style.setProperty('animation-play-state', 'paused');
            curtains_container.appendChild(curtain);
        }
    }

    curtains_toggle.addEventListener('click', () => {
        toggleCurtainsStatus();
        const curtains = curtains_container.getElementsByClassName('curtain');
        for (var c of curtains) {
            c.dispatchEvent(new Event('animationiteration'));
        }
    });

});
