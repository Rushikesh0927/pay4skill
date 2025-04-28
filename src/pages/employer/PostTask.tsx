import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

interface TaskForm {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  category: string;
  skills: string[];
  experience: string;
  isRemote: boolean;
  location: string;
}

export default function PostTask() {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState<TaskForm>({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: '',
    skills: [],
    experience: '',
    isRemote: false,
    location: '',
  });
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to post a task.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format the data for the API
      const taskData = {
        title: form.title,
        description: form.description,
        budget: {
          amount: parseFloat(form.budget),
          currency: 'USD'
        },
        deadline: new Date(form.deadline).toISOString(),
        category: form.category,
        skills: form.skills,
        employer: user._id,
        isRemote: form.isRemote,
        location: form.location,
      };
      
      // Call the API to create a new task
      const response = await api.tasks.create(taskData);
      
      toast({
        title: 'Task posted successfully',
        description: 'Your task has been posted and is now visible to students.',
      });
      
      // Navigate to tasks page
      navigate('/employer/tasks');
      
    } catch (error: any) {
      toast({
        title: 'Failed to post task',
        description: error.message || 'There was an error posting your task. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm({
        ...form,
        skills: [...form.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setForm({
      ...form,
      skills: form.skills.filter(skill => skill !== skillToRemove),
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout role="employer" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Post a New Task</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter a clear and descriptive title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Provide detailed information about the task"
                  rows={6}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="Enter your budget"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="ui-design">UI Design</SelectItem>
                    <SelectItem value="content-writing">Content Writing</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Required Experience</Label>
                <Select
                  value={form.experience}
                  onValueChange={(value) => setForm({ ...form, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select required experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="isRemote">Remote Work</Label>
                  <Select
                    value={form.isRemote ? "yes" : "no"}
                    onValueChange={(value) => setForm({ ...form, isRemote: value === "yes" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Can this be done remotely?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, can be done remotely</SelectItem>
                      <SelectItem value="no">No, requires in-person presence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="City, Country"
                    disabled={form.isRemote}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Task'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
