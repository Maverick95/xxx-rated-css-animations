document.addEventListener('DOMContentLoaded', () => {

    
    const curtains_sets = 3, cycle_count = 1;

    const curtains_count = 2 * curtains_sets;

    const curtains_toggle = document.getElementById('curtains-activate');
    const curtains_target = document.getElementById('curtains-container');

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

    let curtains_closed = 0, curtains_finished = 0;

    const createTransitionEventHandler = (index) => {

        let animations = -1;

        const getAnimationDelaySeconds = () => {
            if (animations === 0) {
                // Animation start
                return index;
            }
            else if (animations % 2) {
                // Curtain is closed covering stage.
                return curtains_count - (2 * (index + 1)) + 1;
            }
            // Curtain has drawn again to leave stage open.
            return (2 * index) + 1;
        };

        return (event) => {
            animations++;
            if (animations === (2 * cycle_count)) {
                event.target.style.setProperty('animation-play-state', 'paused');
                animations = -1;
                if (++curtains_finished === curtains_count) {
                    toggleCurtainsStatus();
                    curtains_finished = 0;
                }
            }
            else {
                if (animations % 2) {
                    if (++curtains_closed === curtains_count) {
                        // Active code in here.
                        curtains_closed = 0;
                    }
                }
                const timeout = 1000 * getAnimationDelaySeconds();
                event.target.style.setProperty('animation-play-state', 'paused');
                setTimeout(() => {
                    event.target.style.setProperty('animation-play-state', 'running');
                }, timeout);
            }
        };
    };

    // Lower-index curtains are behind higher-index curtains.
    for (var i = 0; i < curtains_sets; i++) {
        for (var side of ['left', 'right']) {
            const curtain = document.createElement('div');
            curtain.id = `curtain-${side}-${i}`;
            curtain.classList.add('curtain', `curtain-${side}`);
            const transitionHandler = createTransitionEventHandler(i);
            curtain.addEventListener('animationiteration', transitionHandler);
            curtain.style.setProperty('animation-play-state', 'paused');
            curtains_target.appendChild(curtain);
        }
    }

    curtains_toggle.addEventListener('click', () => {
        toggleCurtainsStatus();
        const curtains = curtains_target.getElementsByClassName('curtain');
        for (var c of curtains) {
            c.dispatchEvent(new Event('animationiteration'));
        }
    });

});
