import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePageName } from "../context/PageNameContext";
import { useEffect } from "react";

const AdminPage = () => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage("Admins");
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const cards = [
    {
      id: 1,
      title: "Add  Note",
      description:
        "Users can quickly jot down notes and share them across all dashboards, facilitating seamless communication and collaboration within the system.",
      path: "/director-dashboard/Addnote",
      bgColor: "bg-gradient-to-b from-blue-500 to-indigo-500",
    },
    {
      id: 2,
      title: "User Management",
      description:
        "Admins can easily add, update, and toggle user statuses, streamlining control over user access and permissions.",
      path: "/director-dashboard/Users",
      bgColor: "bg-gradient-to-b from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Table Export",
      description:
        "Effortlessly export table data to PDF or XLSX formats, ensuring seamless data sharing and reporting.",
      path: "/director-dashboard/reports",
      bgColor: "bg-gradient-to-b from-blue-500 to-indigo-500",
    },
    {
      id: 4,
      title: "Reports",
      description: "Generate reports",
      path: "/director-dashboard/report",
      bgColor: "bg-gradient-to-b from-blue-500 to-indigo-500",
    },
    // { id: 5, title: 'Notifications', description: 'View notifications', path: '/notifications', bgColor: 'bg-purple-500' },
    // { id: 6, title: 'Help', description: 'Get help and support', path: '/help', bgColor: 'bg-pink-500' },
  ];

  return (
    <div className="flex w-screen justify-center mt-40  items-center">
      {" "}
      <div className="flex w-3/4">
        {" "}
        <div className="grid grid-cols-2 gap-16 justify-items-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex w-11/12  cursor-pointer transition-transform duration-300 justify-center hover:scale-105 "
              onClick={() => handleCardClick(card.path)}
            >
              <div
                className={`h-64 w-full ${card.bgColor} cursor-pointer transition-shadow duration-300 rounded-xl flex flex-col justify-center items-center hover:shadow-lg`}
              >
                <Typography
                  variant="h3"
                  component="div"
                  className="text-white mb-2"
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-white text-center px-10"
                  textAlign={"justify"}
                >
                  {card.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
