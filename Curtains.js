document.addEventListener('DOMContentLoaded', () => {

    let toggle_curtains = false;

    const id_toggle_curtains = 'curtains-activate';
    const id_target_curtains = 'curtains-target';

    document.getElementById(id_toggle_curtains)?.addEventListener('click', () => {

        if (toggle_curtains) { return; }

        toggle_curtains = true;

        // Need to create the main container element, with position=relative.

        const curtains_target = document.getElementById(id_target_curtains);

        let curtains_count = 0;
        let curtains_max = 5;
        let interval = 0;
        
        if (curtains_target !== null) {

            const curtains_container = document.createElement('div');
            curtains_container.classList.add('curtains-container');
            curtains_target.appendChild(curtains_container);

            // Set up timer to add on child elements.

            interval = setInterval(() => {

                const
                    curtain_left = document.createElement('div'),
                    curtain_right = document.createElement('div');

                curtain_left.classList.add('curtain', 'curtain-left');
                curtain_right.classList.add('curtain', 'curtain-right');

                curtains_container.appendChild(curtain_left);
                curtains_container.appendChild(curtain_right);
                
                curtains_count++;

                if (curtains_count === curtains_max) {
                    clearInterval(interval);
                    interval = 0;
                }

            }, 1000);
            
        }

    });

});
