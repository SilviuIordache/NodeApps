Vue.component('entry', {
  props: ['id', 'title', 'index'],
  template: `
    <tr>
      <th scope="row"> {{ index }}</th>
      <td> {{ id }} </td>
      <td> {{ title }} </td>
    </tr>
  `
})