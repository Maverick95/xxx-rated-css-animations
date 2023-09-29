document.addEventListener('DOMContentLoaded', () => {
  
  const id_toggle = 'spinner-toggle';
  const id_target = 'spinner-target';
  const class_anchor = 'spinner-anchor';
  const classes_colour = ['red', 'white', 'blue'];
  
  let classes_colour_index = 0;

  document.getElementById(id_toggle)?.addEventListener('click', () => {
      const spinner = document.createElement('div');
      spinner.className = `spinner-anchor bg-${classes_colour[classes_colour_index++]}`;
      classes_colour_index %= classes_colour.length;
      document.getElementById(id_target)?.appendChild(spinner);
  });

});