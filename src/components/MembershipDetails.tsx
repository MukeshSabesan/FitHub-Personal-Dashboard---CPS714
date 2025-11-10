import "./MembershipDetails.css";

function MembershipDetails() {
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
            <td><strong>Gold Member</strong></td>
            <td><strong>January 10, 2025</strong></td>
            <td><strong>$39.99</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MembershipDetails;
