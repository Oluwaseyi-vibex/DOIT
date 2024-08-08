import { observer } from "mobx-react-lite";
import Athlete from "@/mobx/features/todoCardSlice";

const lebronJames = new Athlete("Lebron James", 37, "UAT");
const stephCurry = new Athlete("Steph Curry", 34, "OAU");

function Roaster() {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Team</th>
      </tr>

      {[lebronJames, stephCurry].map((athlete) => {
        return (
          <tr key={athlete.name}>
            <td>{athlete.name}</td>
            <td>{athlete.age}</td>
            <td>{athlete.team}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default observer(Roaster);
