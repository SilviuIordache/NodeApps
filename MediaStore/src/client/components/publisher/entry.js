Vue.component('entry', {
  props: ['id', 'title'],
  template: `
    <tr>
      <th scope="row">1</th>
      <td> {{ id }} </td>
      <td> {{ title }} </td>
    </tr>
  `
})