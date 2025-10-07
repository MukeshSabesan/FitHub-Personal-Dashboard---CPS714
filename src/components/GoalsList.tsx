function GoalsList() {
  const goals = [                                /* we should be able to store each users goals based off their user id or similar in the future instead of this list */
    'Attend 5 Kickboxing classes in a month',
    'Go to the gym 4 times a week minimum',
    'Cut 5 lbs in a month',
    'Bench 225 lbs',
    'Do 8 pullups'
  ];
  return (
    <>
      <h1>Goals:</h1>
      <ul className="list-group">
        {goals.map((item, index) => (
          <li key={item} className="list-group-item">
            <input type="checkbox" id={`goal-${item}`} className="mr-2" />
            <label htmlFor={`goal-${index}`}>{item}</label>
          </li>
        ))}
      </ul>     
    </>
  );
}

export default GoalsList;
