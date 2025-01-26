import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { Edit2, ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { userId } from "../../middleware/getToken";

const QuestionActions = ({ itemId, creatorId }) => {
  const usersId = userId();
  const token = useRouteLoaderData("token")

  const getActions = () => {
    const baseActions = [
      {
        name: "Like",
        icon: ThumbsUp,
        path: "#",
      },
      {
        name: "Dislike",
        icon: ThumbsDown,
        path: "#",
      },
      {
        name: "Report",
        icon: Flag,
        path: "#",
      },
      
    ];

    // Only add Edit action if user is the creator
    if (token) {
      baseActions.unshift({
        name: "Edit",
        icon: Edit2,
        path: `${itemId}`,
      });
    }

    return baseActions;
  };

  return (
    <div className="mt-4 flex space-x-4">
      {getActions().map(({ name, icon: Icon, path }) => (
        <Link
          key={name}
          to={path}
          className="p-2 text-indigo-400 hover:text-indigo-300 
                     transition-all duration-200 hover:-translate-y-1 
                     inline-flex items-center gap-1 rounded-lg
                     hover:bg-indigo-50/5"
          title={name}
        >
          <Icon size={20} />
        </Link>
      ))}
    </div>
  );
};

export default QuestionActions;
