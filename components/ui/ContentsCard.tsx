import { useDeleteContentsMutation } from "@/redux/api/contentsApi";
import { checkUserRole } from "@/utils/userUtils";
import { useSession } from "@clerk/nextjs";
import { Button, message } from "antd";
import React from "react";

const ContentsCard = ({ content }: any) => {
  const { session } = useSession();
  const userRole = checkUserRole(session);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8000/api/v1/contents/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("Content Deleted");
        console.log(data);
        window.location.reload();
      });
  };

  return (
    <div>
      <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 ">
        <img
          alt="Home"
          src={content?.image}
          className="h-52 w-full rounded-md object-cover"
        />

        <h1 className="">{content?.heading}</h1>
        <p className="">{content?.content}</p>
        {userRole === "admin" && (
          <div>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(content?.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentsCard;
