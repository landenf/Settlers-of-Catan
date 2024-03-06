/**
 * Component for the notification that pops up after each turn
 * displaying what resources a player gets.
 *
 * @param {} props
 */
const ResourceNotificationComponent = (props) => {
  /**
   * Add functionality for conditionally showing the component
   */
  return (
    <div className="resourceAnnouncement">
      <div className="announcementText">
        <p>
          {props.playerName} recieved {props.numberReceived}
          {props.resourceRecieved}
        </p>
      </div>
    </div>
  );
};

export default ResourceNotificationComponent;
