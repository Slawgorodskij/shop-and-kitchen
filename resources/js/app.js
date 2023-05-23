import './bootstrap';
import '../scss/app.scss';

import Alpine from 'alpinejs';


window.Alpine = Alpine;

Alpine.start();

if (document.querySelector('.tbody')) {
  fetch('/ajax-autocomplete-unit')
    .then(response => response.json())
    .then(result => {
      console.log('test')
      renderTable(result)
    })

  const renderTableRow = (units) => {
    let option;
    units.forEach(unit => {
      option += `<option value="${unit.id}">${unit.name}</option>`
    })
    return `<tr>
                   <td>
                       <input type="text" name="product_name[]" placeholder="Название продукта">
                   </td>
                   <td>
                        <select name="units_id[]">${option}</select>
                   </td>
                   <td>
                       <input type="number" step="any" name="quantity[]" placeholder="КОЛИЧЕСТВО" >
                   </td>
                </tr>`

  }

  const renderTable = (result) => {
    const tableRow = renderTableRow(result);
    const tbody = document.querySelector('.tbody');
    const buttonAdd = document.querySelector('.addRow');

    buttonAdd.addEventListener('click', (event) => {
      event.preventDefault();
      tbody.insertAdjacentHTML('beforeend', tableRow);
    })
  }
}


