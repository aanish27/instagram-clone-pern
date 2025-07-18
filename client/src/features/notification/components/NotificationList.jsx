import NotificationItem from "./NotificationItem";
import FollowReqCard from "./FollowReqCard";

function NotificationList({ notifications, period }) {
  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-col gap-3">
        <div className="font-semibold">{period}</div>
        {notifications.map((notification) => {
          if (notification.post) {
            return (
              <NotificationItem
                key={notification.id}
                avatar={notification.sender.profile_pic}
                username={notification.sender.username}
                message={"shared a post"}
                attachment={notification.post.attachment}
              />
            );
          } else if (notification.like) {
            return (
              <NotificationItem
                key={notification.id}
                avatar={notification.sender.profile_pic}
                username={notification.sender.username}
                message={" liked your post"}
                attachment={notification.like.post.attachment}
              />
            );
          } else if (notification.followRequest) {
            return (
              <FollowReqCard
                key={notification.id}
                avatar={notification.sender.profile_pic}
                username={notification.sender.username}
                name={notification.sender.name}
                message={"requested to follow you"}
                reqId={notification.followRequest.id}
              />
            );
          } else if (notification.comment) {
            return (
              <NotificationItem
                key={notification.id}
                avatar={notification.sender.profile_pic}
                username={notification.sender.username}
                message={`Commented On Your Post : ${notification.comment.text}`}
                attachment={notification.comment.post.attachment}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default NotificationList;
