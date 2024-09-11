
/**
 * The index page of the tasks, shows all tasks with pagination.
 */
export default function Tasks() {

  /***
   * All the tasks are showing in table format
   */
  return (
      <table>
        <thead>
          <th> #</th>
          <th> Name</th>
          <th> description</th>
          <th> Assigner </th>
          <th> Assignee </th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Clean up the table</td>
            <td>The database table has to be clean for every test</td>
            <td>David</td>
            <td>Paul</td>
          </tr>
        </tbody>
      </table>

   );

}