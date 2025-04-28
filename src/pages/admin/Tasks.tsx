import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Filter, Eye, CheckSquare, XCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Task {
  _id: string;
  title: string;
  employer: {
    _id: string;
    name: string;
  };
  budget: {
    amount: number;
    currency: string;
  };
  deadline: string;
  applicants: string[] | number;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  description?: string;
  category?: string;
  skills?: string[];
}

const getStatusClass = (status: string) => {
  switch(status) {
    case 'open':
      return 'bg-blue-100 text-blue-700';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
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
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

const TasksManagement = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Task detail dialog state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);
  
  // Fetch tasks data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await api.tasks.getAll();
        setTasks(response);
        setFilteredTasks(response);
      } catch (err: any) {
        console.error('Failed to fetch tasks:', err);
        setError(err.message || 'Failed to load tasks');
        // Fallback to empty array
        setTasks([]);
        setFilteredTasks([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  // Filter tasks when search term or status filter changes
  useEffect(() => {
    if (!tasks) return;
    
    const filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (task.employer.name && task.employer.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    
    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter]);
  
  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };
  
  const handleUpdateTaskStatus = async (taskId: string, newStatus: 'open' | 'in-progress' | 'completed' | 'cancelled') => {
    try {
      await api.tasks.update(taskId, { status: newStatus });
      
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      
      toast({
        title: "Task updated",
        description: `Task status has been updated to ${getStatusLabel(newStatus)}`,
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message || "Failed to update task status",
        variant: "destructive",
      });
    }
  };
  
  // Show loading state
  if (!user || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <FileText className="h-10 w-10 mx-auto mb-4 text-neutral-400 animate-pulse" />
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout role="admin" user={user}>
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}
      
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
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-neutral-500">
                      {error ? 'Error loading tasks' : 'No tasks found matching your criteria'}
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr key={task._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                            <FileText className="h-4 w-4 text-neutral-500" />
                          </div>
                          {task.title}
                        </div>
                      </td>
                      <td className="p-3">{task.employer?.name || 'Unknown'}</td>
                      <td className="p-3">{task.budget?.currency || '$'}{task.budget?.amount.toLocaleString()}</td>
                      <td className="p-3">{new Date(task.deadline).toLocaleDateString()}</td>
                      <td className="p-3">{Array.isArray(task.applicants) ? task.applicants.length : task.applicants || 0}</td>
                      <td className="p-3">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
                          {getStatusLabel(task.status)}
                        </div>
                      </td>
                      <td className="p-3">{new Date(task.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewTask(task)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          
                          {task.status !== 'completed' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUpdateTaskStatus(task._id, 'completed')}
                              className="text-green-600"
                            >
                              <CheckSquare className="h-4 w-4" />
                              <span className="sr-only">Complete</span>
                            </Button>
                          )}
                          
                          {task.status !== 'cancelled' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUpdateTaskStatus(task._id, 'cancelled')}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Task details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected task
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-2 ${getStatusClass(selectedTask.status)}`}>
                  {getStatusLabel(selectedTask.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Employer</p>
                  <p>{selectedTask.employer?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Budget</p>
                  <p>{selectedTask.budget?.currency || '$'}{selectedTask.budget?.amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Posted On</p>
                  <p>{new Date(selectedTask.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Deadline</p>
                  <p>{new Date(selectedTask.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              
              {selectedTask.category && (
                <div>
                  <p className="text-sm font-medium text-neutral-500">Category</p>
                  <p>{selectedTask.category}</p>
                </div>
              )}
              
              {selectedTask.skills && selectedTask.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-neutral-500">Skills Required</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTask.skills.map((skill, index) => (
                      <span key={index} className="bg-neutral-100 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTask.description && (
                <div>
                  <p className="text-sm font-medium text-neutral-500">Description</p>
                  <p className="text-sm whitespace-pre-line">{selectedTask.description}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            {selectedTask && (
              <div className="flex gap-2">
                {selectedTask.status !== 'completed' && (
                  <Button 
                    variant="outline" 
                    className="text-green-600"
                    onClick={() => {
                      handleUpdateTaskStatus(selectedTask._id, 'completed');
                      setIsDialogOpen(false);
                    }}
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
                
                {selectedTask.status !== 'cancelled' && (
                  <Button 
                    variant="outline"
                    className="text-red-600"
                    onClick={() => {
                      handleUpdateTaskStatus(selectedTask._id, 'cancelled');
                      setIsDialogOpen(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Task
                  </Button>
                )}
              </div>
            )}
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TasksManagement;
