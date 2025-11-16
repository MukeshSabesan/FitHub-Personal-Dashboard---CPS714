import { useUser } from "../context/UserContext";
import "./MembershipDetails.css";

function MembershipDetails() {
  const { user } = useUser();
  if (!user) return null;

  // Determine monthly payment based on membership type
  const getMonthlyPayment = (type: string) => {
    switch (type) {
      case "Gold":
        return "$39.99";
      case "Silver":
        return "$29.99";
      case "Platinum":
        return "$44.99";
      case "Admin":
        return "$0.00";
      default:
        return "$0.00";
    }
  };

  return (
    <div className="membership-container">
      <table className="membership-table">
        <thead>
          <tr>
            <th>Membership Class</th>
            <th>Renewal Date</th>
            <th>Monthly Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{user.membership} Member</strong></td>
            <td><strong>January 10, 2025</strong></td>
            <td><strong>{getMonthlyPayment(user.membership)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MembershipDetails;
