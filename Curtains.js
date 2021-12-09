document.addEventListener('DOMContentLoaded', () => {

    let toggle_curtains = false;

    const id_toggle_curtains = 'curtains-activate';
    const id_target_curtains = 'curtains-target';

    document.getElementById(id_toggle_curtains)?.addEventListener('click', () => {

        if (toggle_curtains) { return; }

        toggle_curtains = true;

        // Need to create the main container element, with position=relative.

        const curtains_target = document.getElementById(id_target_curtains);

        let curtains_count = 5;

        const animationEndEventHandler = (isAnimationRunningForwards, index, count) => {

            let evtFirstRun = true;
            let evtForwards = isAnimationRunningForwards;
                
            return (target) => {
                evtForwards = !evtForwards;
                const timeout = 1000 * 
                    (
                        evtFirstRun ? index :
                        (
                            evtForwards ? (2 * index) + 1 : (2 * (count - index - 1)) + 1
                        )
                    );
                evtFirstRun = false;
                if (timeout > 0) {
                    target.style.setProperty('animation-play-state', 'paused');
                    setTimeout(() => {
                        target.style.setProperty('animation-play-state', 'running');
                    }, timeout);
                }
            };

        };

        if (curtains_target !== null) {

            const curtains_container = document.createElement('div');
            curtains_container.classList.add('curtains-container');
            curtains_target.appendChild(curtains_container);

            for (var i = 0; i < curtains_count; i++) {

                const
                    curtain_left = document.createElement('div'),
                    curtain_right = document.createElement('div');

                curtain_left.classList.add('curtain', 'curtain-left');
                curtain_right.classList.add('curtain', 'curtain-right');

                const isAnimationRunningForwards = false;

                const transitionEventHandlerLeft = animationEndEventHandler(isAnimationRunningForwards, i, curtains_count);
                const transitionEventHandlerRight = animationEndEventHandler(isAnimationRunningForwards, i, curtains_count);

                curtain_left.addEventListener('animationiteration', (event) => { transitionEventHandlerLeft(event.target); });
                curtain_right.addEventListener('animationiteration', (event) => { transitionEventHandlerRight(event.target); });
                
                transitionEventHandlerLeft(curtain_left);
                transitionEventHandlerRight(curtain_right);

                curtains_container.appendChild(curtain_left);
                curtains_container.appendChild(curtain_right);

            }

        }

    });

});
