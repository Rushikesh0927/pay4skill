
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FileText, Users, Clock } from 'lucide-react';

const EmployerTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Website Frontend Development",
      applicants: 5,
      deadline: "2024-05-15",
      status: "Open"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      applicants: 3,
      deadline: "2024-05-20",
      status: "In Progress"
    }
  ];

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <DashboardLayout userRole="employer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <Button onClick={() => window.location.href = '/employer/post-task'}>
            Post New Task
          </Button>
        </div>
        
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-neutral-600">
                      <Users className="w-4 h-4" />
                      <span>{task.applicants} Applicants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${getStatusClass(task.status)}`}>
                      {task.status}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">View Applicants</Button>
                    <Button variant="outline">Edit Task</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerTasks;
