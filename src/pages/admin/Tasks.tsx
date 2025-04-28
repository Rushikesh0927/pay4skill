
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Filter, Eye, CheckSquare, XCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock task data
const mockTasks = [
  { 
    id: 1, 
    title: 'Website Frontend Development', 
    employer: 'Tech Solutions', 
    budget: 12000,
    deadline: '2023-11-15',
    applicants: 8,
    status: 'open',
    posted: '2023-10-05',
  },
  { 
    id: 2, 
    title: 'Logo Design Project', 
    employer: 'Creative Agency', 
    budget: 5000,
    deadline: '2023-11-02',
    applicants: 12,
    status: 'in-progress',
    posted: '2023-10-01',
  },
  { 
    id: 3, 
    title: 'Mobile App UI Design', 
    employer: 'TechStart', 
    budget: 15000,
    deadline: '2023-11-20',
    applicants: 5,
    status: 'in-progress',
    posted: '2023-10-03',
  },
  { 
    id: 4, 
    title: 'Content Writing for Blog', 
    employer: 'Media House', 
    budget: 3000,
    deadline: '2023-10-30',
    applicants: 10,
    status: 'pending-closure',
    posted: '2023-09-25',
  },
  { 
    id: 5, 
    title: 'Database Optimization', 
    employer: 'Tech Solutions', 
    budget: 8000,
    deadline: '2023-11-05',
    applicants: 3,
    status: 'closed',
    posted: '2023-09-20',
  },
  { 
    id: 6, 
    title: 'Social Media Campaign', 
    employer: 'Marketing Experts', 
    budget: 10000,
    deadline: '2023-11-10',
    applicants: 7,
    status: 'open',
    posted: '2023-10-10',
  },
];

const getStatusClass = (status: string) => {
  switch(status) {
    case 'open':
      return 'bg-blue-100 text-blue-700';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'pending-closure':
      return 'bg-purple-100 text-purple-700';
    case 'closed':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: string) => {
  switch(status) {
    case 'open':
      return 'Open';
    case 'in-progress':
      return 'In Progress';
    case 'pending-closure':
      return 'Pending Closure';
    case 'closed':
      return 'Closed';
    default:
      return status;
  }
};

const TasksManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const showNotification = (message: string) => {
    toast({
      title: "Notification",
      description: message,
    });
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.employer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Tasks Management</h1>
        
        <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
            <Input 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 max-w-xs"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending-closure">Pending Closure</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <span>All Tasks ({filteredTasks.length})</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left p-3 font-medium text-sm">Task Title</th>
                  <th className="text-left p-3 font-medium text-sm">Employer</th>
                  <th className="text-left p-3 font-medium text-sm">Budget</th>
                  <th className="text-left p-3 font-medium text-sm">Deadline</th>
                  <th className="text-left p-3 font-medium text-sm">Applicants</th>
                  <th className="text-left p-3 font-medium text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-sm">Posted Date</th>
                  <th className="text-right p-3 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4 text-neutral-500" />
                        </div>
                        {task.title}
                      </div>
                    </td>
                    <td className="p-3">{task.employer}</td>
                    <td className="p-3">₹{task.budget.toLocaleString()}</td>
                    <td className="p-3">{new Date(task.deadline).toLocaleDateString()}</td>
                    <td className="p-3">{task.applicants}</td>
                    <td className="p-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </div>
                    </td>
                    <td className="p-3">{new Date(task.posted).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => showNotification(`Viewing details of task #${task.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        
                        {task.status !== 'closed' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => showNotification(`Task #${task.id} marked as closed`)}
                            className="text-green-600"
                          >
                            <CheckSquare className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showNotification(`Task #${task.id} has been removed`)}
                          className="text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TasksManagement;
